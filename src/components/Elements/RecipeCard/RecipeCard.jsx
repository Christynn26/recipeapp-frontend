import { useContext, useEffect, useState } from "react";
import FavButton from "../FavButton/FavButton";
import AuthContext from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function RecipeCard({ recipe, onClick, ...props }) {
  const name = recipe.recipeName || recipe.strMeal;
  const imgUrl = recipe.recipeImgUrl || recipe.strMealThumb;
  const id = recipe.idMeal || recipe.id;
  const navigate = useNavigate();

  const { auth } = useContext(AuthContext);

  const userId = auth && auth?.id;

  const [isFavourite, setIsFavourite] = useState(false);

  const handleFavouriteAction = async (e) => {
    e.stopPropagation();
    if (!auth) navigate('/auth/login');
    let action = '';

    if (isFavourite) action = '/remove'; 
    try {
      const response = await fetch(`http://localhost:8088/api/recipe/${id}/user/${userId}${action}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to ${action === '/remove' ? 'remove' : 'add'} recipe to favourites`);
      }

      if (props && props.refreshRecipes) {
        props.refreshRecipes();
        return;
      }
      setIsFavourite(action !== '/remove');
    } catch (error) {
      console.error(`Error ${action === '/remove' ? 'removing' : 'adding'} recipe to favourites:`, error.message);
    }
  };


  useEffect(() => {
    if (props?.isFavourite) {
      setIsFavourite(true);
    }
  }, []);

  return (
    <>
      <div
        onClick={onClick}
        className="relative flex flex-col rounded-lg p-3 hover:bg-black hover:cursor-pointer hover:underline"
      >
        <img src={imgUrl} alt={name} className="rounded-md" />
        <div className="absolute top-0 right-0 inline-flex mt-4 mr-4 w-9">
          <FavButton status={isFavourite} handleClick={handleFavouriteAction} />
        </div>
        <div className="py-3">
          <h3 className="text-lg font-semibold w-full line-clamp-2">{name}</h3>
          <span className="text-base font-normal inline-block">Description</span>
        </div>
      </div>
    </>
  )
}