import express from 'express';
import mongoose from 'mongoose';
import { createServer } from 'http';
import cors from 'cors';
import axios from 'axios';

const app = express();
const http = createServer(app);

app.use(express.json());
app.use(cors()); 

mongoose.connect('mongodb+srv://lahirumadhushan80:zLQR31o42WHS5YYH@codesec.1e0o3xd.mongodb.net/?retryWrites=true&w=majority')

const recipeSchema = new mongoose.Schema({
    idCategory: {
        type: Number,
        required: true
    },
    strCategory: {
        type: String,
        required: true
    },
    strCategoryThumb: {
        type: String,
        required: true
    },
    strCategoryDescription: {
        type: String,
        required: true
    }
});







async function getItems() {
    try {
        const food = await axios.get("https://www.themealdb.com/api/json/v1/1/categories.php");
        const response = food.data.categories;
        for (let i = 0; i < response.length; i++) {
            const recipe = new recipe({
                idCategory: response[i]['idCategory'],
                strCategory: response[i]['strCategory'],
                strCategoryThumb: response[i]['strCategoryThumb'],
                strCategoryDescription: response[i]['strCategoryDescription'],
            });
            await recipe.save();
        }
        console.log('Meals saved to database successfully!');
    } catch (error) {
        console.error('Error saving recipe:', error);
    }
}
getItems();













app.get('/api/cook-web/GetRecipe/:strCategory', (request, response) => {
    const strCategory = request.params.strCategory;

    Recipe.findOne({ strCategory: strCategory })
        .then(recipe => {
            if (!recipe) {
                response.status(404).json({ error: 'Recipe not found' });
            } else {
                response.json(recipe);
            }
        })
        .catch(error => {
            console.error('Error fetching Recipe category:', error);
            response.status(500).json({ error: 'Internal server error' });
        });
});




app.get('/api/cook-web/GetRecipeCategories', async (req, res) => {
  try {
  
    const categories = await Recipe('strCategory');
    res.json(categories);
  } catch (error) {
    console.error('Error fetching recipe categories:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});






app.get('/api/cook-web/GetAllRecipes', (req, res) => {
   
    Recipe.find()
        .then(recipes => {
            res.json(recipes); 
        })
        .catch(error => {
            console.error('Error fetching recipes:', error);
            res.status(500).json({ error: 'Internal server error' });
        });
});



const fetchMeals = async () => {
  try {
    const response = await axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s');
    const mealsData = response.data.meals;
    console.log(mealsData);
 
  } catch (error) {
    console.error('Error fetching meals:', error);
  }
};

fetchMeals();




async function fetchRecipeMeals() {
    try {
      const response = await axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s');
      const mealsData = response.data.meals;
      console.log(mealsData);
    
    } catch (error) {
      console.error('Error fetching meals:', error);
    }
  }
  
fetchRecipeMeals();
  











const mealSchema = new mongoose.Schema({
    idMeal: String,
    strMeal: String,
    strCategory: String,
    strArea: String,
    strInstructions: String,
    strMealThumb: String,
 
  });
  

  const Meal = mongoose.model('Meal', mealSchema);
  
  async function fetchMealsAndSaveToDB() {
    try {
      const response = await axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s');
      const mealsData = response.data.meals;
  
    
      for (const mealData of mealsData) {
        const meal = new Meal({
          idMeal: mealData.idMeal,
          strMeal: mealData.strMeal,
          strCategory: mealData.strCategory,
          strArea: mealData.strArea,
          strInstructions: mealData.strInstructions,
          strMealThumb: mealData.strMealThumb,
      
        });
        await meal.save(); 
      }
  
      console.log('Meals saved to database successfully!');
    } catch (error) {
      console.error('Error fetching and saving meals:', error);
    }
  }
  
fetchMealsAndSaveToDB();
  



  app.get('/api/meals/:category', async (req, res) => {
    const category = req.params.category;
  
    try {

      const meals = await Meal.find({ strCategory: category });
  
      if (meals.length === 0) {
        return res.status(404).json({ message: 'No meals found for this category.' });
      }
  
      res.json(meals);
    } catch (error) {
      console.error('Error fetching meals:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
 







const favRecipeSchema = new mongoose.Schema({
    idMeal: String,
    strMeal: String,
    strCategory: String,
    strArea: String,
    strInstructions: String,
    strMealThumb: String,
   
});

const FavRecipe = mongoose.model('FavRecipe', favRecipeSchema);


app.post('/api/add-selected-recipe/:idMeal', async (req, res) => {
    try {
        const { idMeal } = req.params; 
        const recipeData = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
        const recipe = recipeData.data.meals[0]; 
        if (!recipe) {
            return res.status(404).json({ error: 'Recipe not found' });
        }
        const newFavRecipe = new FavRecipe({
            idMeal: recipe.idMeal,
            strMeal: recipe.strMeal,
            strCategory: recipe.strCategory,
            strArea: recipe.strArea,
            strInstructions: recipe.strInstructions,
            strMealThumb: recipe.strMealThumb,
       
        });
        await newFavRecipe.save(); 
        res.status(201).json({ message: 'Recipe added to favorites successfully' });
    } catch (error) {
        console.error('Error adding recipe to favorites:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.get('/api/get-all-fav-recipes', async (req, res) => {
    try {
        const allFavRecipes = await FavRecipe.find(); 
        res.status(200).json(allFavRecipes); 
    } catch (error) {
        console.error('Error fetching all favorite recipes:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});




const PORT = process.env.PORT || 3006;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

