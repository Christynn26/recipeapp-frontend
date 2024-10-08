import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Layout from "../components/Layouts/Layout";
import Spinner from "../components/Elements/Spinner/Spinner";


const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipeDetail = async () => {
      try {
        const response = await fetch(`http://localhost:8088/api/recipe/fetch/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch recipe detail');
        }
        const data = await response.json();
        setRecipe(data.meals[0]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecipeDetail();
  }, [id]);

  return (
    <>
      <Layout>
        {!recipe && (
          <Spinner />
        )}

        {recipe && (
          <>
            <div>
              <img src={recipe.strMealThumb} alt={recipe.strMeal} className="rounded-md max-w-80" />
              <div className="py-4">
                <h3 className="text-3xl font-semibold mb-8">{recipe.strMeal}</h3>
                <p>{recipe.strInstructions}</p>
              </div>
            </div>
            <ul>
              {Object.entries(recipe).map(([key, value]) => (
                <li key={key}>
                  <strong>{key}</strong>: {value}
                </li>
              ))}
            </ul>
          </>
        )}
      </Layout>
    </>
  );
};

export default RecipeDetail;
