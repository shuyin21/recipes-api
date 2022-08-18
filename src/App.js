import React, { useEffect, useState } from 'react';
import './App.css';
import Recipe from './components/Recipe';
import axios from 'axios';

function App() {


  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');



  useEffect(() => {

    const options = {
      method: 'GET',
      url: 'http://localhost:8000/recipes',
      params: {
        q: query
      }
    }
    axios.request(options).then((response) => {

      setRecipes(response.data.hits)

    }).catch((err) => {
      console.error(err)
    })


    // getRecipes();
  }, [query])
  // const getRecipes = async () => {
  //   const response = await fetch(`http://localhost:8000/recipes`)
  //   const data = await response.json()
  //   setRecipes(data.hits);


  // }



  const updateSearch = e => {
    e.preventDefault();
    setSearch(e.target.value)
    console.log(search);

  }
  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch('')

  }
  return (
    <div className='App'>
      <form action="" className='search-form' onSubmit={getSearch}>
        <input type="text" className='search-bar' value={search} onChange={updateSearch} />
        <button type='submit' className='search-button' >Search</button>
      </form>
      <div className='recipes'>
        {recipes.map(recipe => (
          <Recipe key={recipe.recipe.title} title={recipe.recipe.label} calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>

    </div>
  );
}

export default App;
