import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Favourite.css'; // Import your CSS file

function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    const fetchFavoriteRecipes = async () => {
      try {
        const response = await axios.get('http://localhost:3006/api/get-all-fav-recipes');
        setFavoriteRecipes(response.data || []);
      } catch (error) {
        console.error('Error fetching favorite recipes:', error);
      }
    };

    fetchFavoriteRecipes();
  }, []);

  return (
    <div className="home-container">

      <div className="cards">
        {favoriteRecipes.map((recipe, index) => (
          <div key={index} className="full-card">
          <div className=''><img src={recipe.strMealThumb} alt={recipe.strMeal} className="card-image" /></div>
            
            <div><p className='meal-name'>{recipe.strMeal}</p></div>
          </div>
         
          
        ))}
      </div>
    </div>
  );
}

export default FavoriteRecipes;
