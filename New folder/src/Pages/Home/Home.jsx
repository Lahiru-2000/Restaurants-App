import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css';
import heart from '../Assets/HEART.jpeg';
import heartfill from '../Assets/heart-fill.jpeg';

function Home() {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryDetails, setSelectedCategoryDetails] = useState([]);
  const [heartStates, setHeartStates] = useState({});

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
        // Slice the array to get only the first 5 categories
        const categoriesSlice = response.data.meals.slice(0, 5);
        setCategories(categoriesSlice || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
        // Handle error fetching categories
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = async (selectedCategory) => {
    try {
      const response = await axios.get(`http://localhost:3006/api/meals/${selectedCategory}`);
      setSelectedCategoryDetails(response.data || []);
    } catch (error) {
      console.error('Error fetching category details:', error);
      // Handle error fetching category details
    }
  };

  const toggleHeart = async (idMeal) => {
    try {
      // Toggle heart icon state
      setHeartStates(prevState => ({
        ...prevState,
        [idMeal]: !prevState[idMeal]
      }));

      // Send request to add selected recipe to favorite DB
      await axios.post('http://localhost:3006/api/add-selected-recipe/', { idMeal });
      console.log('Recipe added to favorites successfully');
    } catch (error) {
      console.error('Error adding recipe to favorites:', error);
      // Handle error adding recipe to favorites
    }
  };

  return (
    <div className='container-fluid home-container'>
   
      <div className='home-buttons-all'>
        {categories.map((category, index) => (
          <button key={index} className='home-buttons' onClick={() => handleCategoryClick(category.strCategory)}>
            {category.strCategory}
          </button>
        ))}
      </div>
      <div className='all-images-1'>
        {[...new Set(selectedCategoryDetails.map(item => item.idMeal))].map(idMeal => {
          const uniqueItem = selectedCategoryDetails.find(item => item.idMeal === idMeal);
          return (
            <div key={uniqueItem.idMeal} className='full-card'>
            <div className='home-cards'>
              <img src={uniqueItem.strMealThumb} alt={uniqueItem.strMeal} className='card-image' />
            </div>

              <div className='heart_name'>
              <p className='meal-name'>{uniqueItem.strMeal}</p>
                <img
                  src={heartStates[uniqueItem.idMeal] ? heartfill : heart}
                  alt='heart'
                  className='heart'
                  onClick={() => toggleHeart(uniqueItem.idMeal)}
                />
                
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
