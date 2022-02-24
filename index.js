const searchFood = () => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  searchField.value = "";
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => displayMeals(data.meals));
};
const displayMeals = (data) => {
  const searchResult = document.getElementById("search-result");
  //   remove previous result
  searchResult.textContent = "";

  data.forEach((meal) => {
    // console.log(meal);
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
    <div onclick="loadMealDetail(${meal.idMeal})" class="card h-100 " >
    <img src="${meal.strMealThumb}" class="card-img-top" alt="..." />
    <div class="card-body">
      <h5 class="card-title">${meal.strMeal}</h5>
      <p class="card-text">
        ${meal.strInstructions.slice(0, 250)}
      </p>
    </div>
  </div> 
    
    `;

    searchResult.appendChild(div);
  });
};

const loadMealDetail = (id) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => displayMealDetail(data.meals[0]));
};

const displayMealDetail = (meal) => {
  const mealDetails = document.getElementById("meal-details");
  mealDetails.textContent = "";
  const div = document.createElement("div");
  div.classList.add("card");
  div.innerHTML = `<img src="${
    meal.strMealThumb
  }" class="card-img-top" alt="...">
  <div class="card-body">
     <h5 class="card-title">${meal.strMeal}</h5>
     <p class="card-text">
        ${meal.strInstructions.slice(0, 150)}
      </p>
    <a href="${meal.strYoutube}" class="btn btn-primary">Youtube</a>
   
 </div>`;
  mealDetails.appendChild(div);
};
