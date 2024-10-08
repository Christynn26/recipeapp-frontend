/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from "react"
import AuthContext from "../context/AuthContext"
import AuthLayout from "../components/Layouts/AuthLayout";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Login() {
  const { setAuth } = useContext(AuthContext);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const [data, setData] = useState({ email: '', password: '' });

  const checkData = () => {
    return true;
  }

  const login = () => {
    const api = `http://localhost:8088/api/auth/login/`;
    if (checkData()) {
      fetch(api, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          return response.json();
        })
        .then(data => {
          const userData = { ...data };
          setAuth(userData);
          sessionStorage.setItem('auth', JSON.stringify(userData));
          navigate('/');
          alert('Logged In');
        })
        .catch(error => {
          if (error.message === 'Not Found') {
            console.log('404 Error:', error);
            setError('User not found');
          } else {
            setError("That didn't look right. Mind trying again?");
          }
        });
    }
  };


  return (
    <>
      <AuthLayout>
        <div className="flex min-h-full flex-col justify-center items-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <span className="text-base font-medium eading-9 tracking-tight text-gray-50 underline">
              Login to
            </span>
            <h1 className="text-3xl font-bold">
              Christine's <br />
              Recipes 📖
            </h1>
            <div className="mt-4">
              {error && <span className="text-sm text-red-500">{error}</span>}
            </div>
          </div>
          <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-50">Email address</label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={data['email'] ? data['email'] : ''}
                    onChange={(e) => setData({ ...data, email: (e.target.value).toLowerCase() })}
                    onKeyDown={(e) => e.key === 'Enter' && login()}
                    className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${error && 'ring-inset ring-red-500'}`}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-50">Password</label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    onChange={(e) => setData({ ...data, password: e.target.value })}
                    onKeyDown={(e) => e.key === 'Enter' && login()}
                    className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${error && 'ring-inset ring-red-500'}`} />
                </div>
              </div>
              <div>
                <button 
                  type="submit" 
                  onClick={login}
                  className="flex w-full justify-center rounded-md bg-purple-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </div>

            <p className="mt-10 text-center text-sm text-gray-500">
              <Link to="/auth/register" className="font-semibold leading-6 text-purple-500 hover:text-purple-400 hover:underline">Create an account</Link>
            </p>
          </div>
        </div>

      </AuthLayout>
    </>
  )
}