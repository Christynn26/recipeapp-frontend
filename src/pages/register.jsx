/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import AuthLayout from "../components/Layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail, validatePassword } from "../util/validate";

export default function Register() {
  const err = {};
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const [data, setData] = useState({ email: '', username: '', password: '', confirmPassowrd: '' });

  const checkEmail = (email) => {
    if (email.length === 0) {
      err['email'] = 'Email address must not be empty';
    }
    else if (!validateEmail(email)) {
      err['email'] = 'Enter a valid email address';
    }
  };

  const checkPassword = (password, confirmPassword) => {
    if (password.length === 0) {
      err['password'] = 'Password must not be empty';
    }
    else if (password.length < 8 || password.length > 24) {
      err['password'] = 'Password must be 8-24 characters';
    }
    else if (!validatePassword(data['password'])) {
      err['password'] = 'Password must contain at least one uppercase, lowercase, number and special character';
    }
    else if (password !== confirmPassword) {
      err['confirmPassword'] = 'Passwords do not match';
    }
  };

  const checkUsername = (username) => {
    if (username.length === 0) {
      err['username'] = 'User Name must not be empty';
    }
    else if (username.length < 4 || username.length > 16) {
      err['username'] = 'User Name must be 4-16 characters';
    }
  };

  const checkData = () => {
    checkEmail(data['email']);
    checkPassword(data['password'], data['confirmPassword']);
    checkUsername(data['username']);

    if (Object.keys(err).length !== 0) {
      setError(err);
      return false;
    } else {
      setError({});
      delete data['confirmPassword'];
      return true;
    }
  }

  const register = () => {
    const api = `http://localhost:8088/api/auth/register`;
    if (checkData()) {
      fetch(api, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(response => {
          if (response.status === 201) {
            alert('Successfully registered! Login using your email and password now.');
            navigate('/auth/login');
          }
        })
        .catch(err => {
          alert(err.message);
        })
    }
  }

  return (
    <>
      <AuthLayout>
        <div className="flex min-h-full flex-col justify-center items-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <span className="text-base font-medium eading-9 tracking-tight text-gray-50 underline">
              Register at
            </span>
            <h1 className="text-3xl font-bold">
              Christine's <br />
              Recipes 📖
            </h1>
            <div className="mt-4">
              {/* {error && <span className="text-sm text-red-500">{error}</span>} */}
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
                    onKeyDown={(e) => e.key === 'Enter' && register()}
                    className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                  />
                </div>
                <span className="text-sm text-red-500">{'email' in error && error['email']}</span>
              </div>
              <div>
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-50">Username</label>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    value={data['username']}
                    onChange={(e) => setData({ ...data, username: e.target.value })}
                    onKeyDown={(e) => e.key === 'Enter' && register()}
                    className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                  />
                  <span className="text-sm text-red-500">{'username' in error && error['username']}</span>
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
                    value={data['password']}
                    onChange={(e) => setData({ ...data, password: e.target.value })}
                    onKeyDown={(e) => e.key === 'Enter' && register()}
                    className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                  />
                  <span className="text-sm text-red-500">{'password' in error && error['password']}</span>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-50">Confirm Password</label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={data['confirmPassword']}
                    onChange={(e) => setData({ ...data, confirmPassword: e.target.value })}
                    onKeyDown={(e) => e.key === 'Enter' && register()}
                    className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                  />
                  <span className="text-sm text-red-500">{'confirmPassword' in error && error['confirmPassword']}</span>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  onClick={register}
                  className="flex w-full justify-center rounded-md bg-purple-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Register
                </button>
              </div>

              <p className="mt-10 text-center text-sm text-gray-500">
                Already have account?
                <Link to="/auth/login" className="ml-2 font-semibold leading-6 text-purple-500 hover:text-purple-400 hover:underline">Login</Link>
              </p>
            </div>
          </div>
        </div>
      </AuthLayout>
    </>
  )
}