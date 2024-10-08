import { useEffect, useState } from "react";
import Layout from "../components/Layouts/Layout";
import Heading from "../components/Elements/Heading/Heading";

export default function User() {
  const [user, setUser] = useState(null);
  const [savedRecipes, setSavedRecipes] = useState([]);

  const userId = "13a6741e-62ec-4e41-9df1-010c1b7f4728";

  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const response = await fetch(`http://localhost:8088/api/user/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user information');
        }

        const userData = await response.json();
        console.log(response);
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user information:', error);
      }
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
        setSavedRecipes(data);
        console.log(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchSavedRecipes();
    fetchUserInfo();

  }, []);

  return (
    <>
      <Layout>
        <Heading title="User Page" />
        <div className="grid grid-cols-3 gap-8 mt-16">
          <div className="col-span-1">
            <img src="" className="w-64 h-64 rounded-full ring-1 ring-zinc-500" alt="" />
          </div>
          <div className="col-span-2">
            <div className="grid grid-cols-1 gap-6 max-w-md mx-auto">
              <label className="block">
                <span className="text-zinc-300">Username</span>
                <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-indigo-200 text-gray-900" placeholder="" />
              </label>
              <label className="block">
                <span className="text-zinc-300">Email</span>
                <input type="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-indigo-200 text-gray-900" placeholder="" />
              </label>
              <label className="block">
                <span className="text-zinc-300">Password</span>
                <input type="password" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-indigo-200 text-gray-900" placeholder="" />
              </label>
            </div>
          </div>
        </div>
        {user && (
          <ul>
            <div>
              <h2>User Information</h2>
              <p>Username: {user.username}</p>
              <p>Email: {user.email}</p>
            </div>
            <ul>
              {savedRecipes && savedRecipes.map(savedRecipe => (
                <li key={savedRecipe.id}>
                  Recipe ID: {savedRecipe.recipe.id}, Recipe Name: {savedRecipe.recipe.recipeName}
                </li>
              ))}

            </ul>
          </ul>
        )}



      </Layout>
    </>
  )
}