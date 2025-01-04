async function searchFood() {
    const query = document.getElementById('search-bar').value.trim();
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = '';

    if (query.length === 0) {
        return;
    }

    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const data = await response.json();

    if (data.meals) {
        data.meals.forEach(meal => {
            const mealCard = document.createElement('div');
            mealCard.className = 'result-item';

            mealCard.innerHTML = `
                <h3>${meal.strMeal}</h3>
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <p>${meal.strCategory} | ${meal.strArea}</p>
            `;

            // Add click event to open the modal with details
            mealCard.addEventListener('click', () => showMealDetails(meal));
            resultsContainer.appendChild(mealCard);
        });
    }
}

// Function to show meal details in a modal
function showMealDetails(meal) {
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modal-content');

    modalContent.innerHTML = `
        <h2>${meal.strMeal}</h2>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" style="width: 100%; border-radius: 8px;">
        <p><strong>Category:</strong> ${meal.strCategory}</p>
        <p><strong>Area:</strong> ${meal.strArea}</p>
        <h3>Ingredients:</h3>
        <ul>
            ${getIngredients(meal).map(ing => `<li>${ing}</li>`).join('')}
        </ul>
    `;
    modal.style.display = 'block';
}

// Function to extract ingredients and measures
function getIngredients(meal) {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim()) {
            ingredients.push(`${measure || ''} ${ingredient}`.trim());
        }
    }
    return ingredients;
}

// Close modal when clicked outside or on the close button
document.getElementById('modal').addEventListener('click', (e) => {
    if (e.target.id === 'modal' || e.target.id === 'close-modal') {
        document.getElementById('modal').style.display = 'none';
    }
});
