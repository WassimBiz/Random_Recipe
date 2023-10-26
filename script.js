document.addEventListener("DOMContentLoaded", function () {
  const recipeContainer = document.getElementById("recipeContainer");
  const recipeName = document.getElementById("recipeName");
  const recipeCountry = document.getElementById("recipeCountry");
  const recipeImage = document.getElementById("recipeImage");
  const recipeIngredients = document.getElementById("recipeIngredients");
  const recipeInstructions = document.getElementById("recipeInstructions");
  const recipeVideoLink = document.getElementById("recipeVideoLink");
  const getRandomRecipeButton = document.getElementById("getRandomRecipe");

  /* La fonction pour obtenir une recette aléatoire depuis l'API */
  function getRandomRecipe() {
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
      .then((response) => response.json())
      .then((data) => {
        const randomRecipe = data.meals[0];
        recipeName.textContent = "Nom de la recette : " + randomRecipe.strMeal;
        recipeCountry.textContent = "Pays d'origine : " + randomRecipe.strArea;
        recipeImage.src = randomRecipe.strMealThumb;

        /* Afficher les ingrédients */
        recipeIngredients.innerHTML = "";
        for (let i = 1; i <= 20; i++) {
          const ingredient = randomRecipe["strIngredient" + i];
          if (ingredient) {
            const measure = randomRecipe["strMeasure" + i];
            const ingredientItem = document.createElement("li");
            ingredientItem.textContent = `${
              measure ? measure + " " : ""
            }${ingredient}`;
            recipeIngredients.appendChild(ingredientItem);
          }
        }
        /* Affiche les instructions de la recette */
        recipeInstructions.textContent =
          "Instructions : " + randomRecipe.strInstructions;

        /*     Ici on affiche le lien youtube  */
        if (randomRecipe.strYoutube) {
          const youtubeLink = document.querySelector(".lien");
          youtubeLink.textContent = "Lien Youtube";
          youtubeLink.addEventListener("click", () => {
            youtubeLink.href = randomRecipe.strYoutube;
          });
        } else {
          recipeVideoLink.textContent = "Aucune vidéo disponible.";
        }

        /* Affiche le conteneur de la recette */
        recipeContainer.classList.remove("hidden");
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération des données :", error)
      );
  }
  getRandomRecipeButton.addEventListener("click", getRandomRecipe);
});
document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".container");
  const getRandomRecipeButton = document.getElementById("getRandomRecipe");

  /* Fonction pour obtenir une recette aléatoire depuis l'Api */
  function getRandomRecipe() {
    /* Ajouter la classe "active" pour modifier l'arrière-plan et masquer le titre */
    container.classList.add("active");
  }
  getRandomRecipeButton.addEventListener("click", getRandomRecipe);
});
