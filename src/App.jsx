import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import pages
import Home from "./pages/home";
import User from "./pages/user";
import Login from "./pages/login";
import Register from "./pages/register";
import RecipeDetail from "./pages/recipedetail";
import FavRecipes from "./pages/favrecipes";
import { AuthContextProvider } from "./context/AuthContext";

// Routes defined here - can move to different file after refactoring
function App() {
  // wrap context/providers
  return (
    <>
      <AuthContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user" element={<User />} />
            <Route path="/recipe/:id" element={<RecipeDetail />} />
            <Route path="/user/recipes" element={<FavRecipes />} />

            <Route path="/auth">
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>
          </Routes>
        </Router>
      </AuthContextProvider>
    </>
  )
}

export default App
