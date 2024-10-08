import React, { useEffect, useState, useMemo, useContext } from "react"
import Layout from "../components/Layouts/Layout"
import { useNavigate } from "react-router-dom";
import RecipeCard from "../components/Elements/RecipeCard/RecipeCard";
import Heading from "../components/Elements/Heading/Heading";
import Spinner from "../components/Elements/Spinner/Spinner";
import AuthContext from "../context/AuthContext";

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recipeCount, setRecipeCount] = useState(10);
  // const [userSavedRecipes, setUserSavedRecipes] = useState([]);
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  // const userId = auth && auth?.id;

  const handleRecipeClick = (recipeId) => {
    navigate(`/recipe/${recipeId}`);
  }

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      let fetchedRecipes = [];
      let remainingCount = recipeCount;

      // const userSavedResponse = await fetch(`http://localhost:8088/api/user/${userId}/saved-recipes`);
      // const userData = await userSavedResponse.json();
      // setUserSavedRecipes(userData);
      // console.log(userData);
      while (remainingCount > 0) {
        const response = await fetch(`http://localhost:8088/api/recipe/fetch?count=${remainingCount}`);
        if (!response.ok) {
          throw new Error('Failed to fetch recipes');
        }
        const data = await response.json();

        const uniqueRecipes = removeDuplicates([...fetchedRecipes, ...data.meals], 'idMeal');

        fetchedRecipes = uniqueRecipes;
        console.log(uniqueRecipes);
        remainingCount -= data.meals.length;
      }

      setRecipes(fetchedRecipes);
      setLoading(false);
    } catch (error) {
      console.error(error.message);
      setLoading(false);
    }
  };

  const removeDuplicates = (arr, key) => {
    return arr.filter((obj, index, self) =>
      index === self.findIndex((o) => o[key] === obj[key])
    );
  };

  const memoizedRecipes = useMemo(() => recipes, [recipes]);

  useEffect(() => {
    fetchRecipes();
  }, [recipeCount]);

  return (
    <>
      <Layout>
        <div className="flex justify-between">
          <Heading title="Home Page" />
          <div className="w-36 max-w-sm">
            <label htmlFor="recipeCount" className="text-sm font-medium text-gray-900 dark:text-white">Number of Recipes</label>
            <select
              id="recipeCount"
              value={recipeCount}
              onChange={(e) => setRecipeCount(parseInt(e.target.value))}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
              <option value={35}>35</option>
              <option value={40}>40</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 my-14 -mx-2">
          {memoizedRecipes && memoizedRecipes.map((recipe, index) => (
            <RecipeCard
              key={index}
              recipe={recipe}
              onClick={() => handleRecipeClick(recipe.idMeal)}
              isFavourite={recipe.isSaved}
            />
          ))}
          {loading && (
            <Spinner />
          )}
        </div>
      </Layout>
    </>
  )
}