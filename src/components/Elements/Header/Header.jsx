/**
 * can use `Link` too.
 * `NavLink` knows the active page, `Link` doesn't
 */
import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";

export default function Header() {

  const { auth, setAuth } = useContext(AuthContext);

  const logout = () => {
    sessionStorage.removeItem('auth');
    setAuth(null);
  };
  return (
    <>
      <header>
        <nav className="py-4 mb-8 border-b border-zinc-600">
          <div className="flex justify-between items-center">
            <ul className="flex gap-4">
              <li><NavLink to="/" className="hover:underline">Home</NavLink></li>
              {auth && (
                <>
                  {/* <li><NavLink to="/user" className="hover:underline">Me</NavLink></li> */}
                  <li><NavLink to="/user/recipes" className="hover:underline">My Recipes</NavLink></li>
                </>
              )}
            </ul>
            <div>
              {!auth ? (
                <Link
                  to="/auth/login"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Log in
                </Link>
              ) : (
                <div className="flex gap-3 items-center">
                  <div>
                    Hi,
                    <span className="mx-1">{auth?.username}!</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => logout()}
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}