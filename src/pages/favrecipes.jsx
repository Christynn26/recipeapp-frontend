import { useContext, useEffect, useState } from "react";
import Layout from "../components/Layouts/Layout";
import RecipeCard from "../components/Elements/RecipeCard/RecipeCard";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Spinner from "../components/Elements/Spinner/Spinner";

export default function FavRecipes() {
  const { auth } = useContext(AuthContext);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const userId = auth && auth.id;

  const handleRecipeClick = (recipeId) => {
    navigate(`/recipe/${recipeId}`);
  }

  const fetchSavedRecipes = async () => {
    try {
      const response = await fetch(`http://localhost:8088/api/user/${userId}/saved-recipes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch saved recipes');
      }
      const data = await response.json();
      console.log(data);
      setRecipes(data);
      setLoading(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  const refreshRecipes = () => {
    fetchSavedRecipes();
  };

  useEffect(() => {
    if (!auth) {
      navigate('/');
    } else {
      fetchSavedRecipes();
    }
  }, [auth]);

  return (
    <>
      <Layout>
        <h1 className="text-3xl font-bold mb-6">My Recipes</h1>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <div className="grid grid-cols-4 gap-2 my-14 -mx-2">
              {recipes && recipes.map((recipe, index) => (
                <RecipeCard
                  key={index}
                  recipe={recipe.recipe}
                  onClick={() => handleRecipeClick(recipe.recipe.id)}
                  isFavourite
                  refreshRecipes={refreshRecipes}
                />
              ))}
            </div>
          </>
        )}
      </Layout>
    </>
  )
}