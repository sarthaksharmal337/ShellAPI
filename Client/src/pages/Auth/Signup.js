import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

import { isLoggedIn, setToken, setName } from "../../Services/Auth";

import { BASE_URL } from '../../utils/constants';

import AuthLayout from '../../components/common/AuthLayout';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [country,  setCountry]  = useState('India');
    const [alert,    setAlert]    = useState(false);
    const [message,  setMessage]  = useState('User already exists.');
    const [loading,  setLoading]  = useState(false);

    const attemptSignup = async function(e) {
        e.preventDefault();

        if(!loading) {
            setLoading(true);

            const fd = new FormData();
            
            fd.append('username', username);
            fd.append('password', password);
            fd.append('country', country);

            try {
                const response = await fetch(BASE_URL + '/auth/signup', {
                    method: 'POST',
                    body: fd
                });

                if(response.status == 200) {

                    const data = await response.json();
    
                    setName(data.username);
                    setToken(data.token);

                    return window.location.replace('/orders');

                } else {
                    const newMsg = await response.text();
                    setMessage(newMsg);
                    setAlert(true);
                }
            } catch(e) {
                setMessage("Unexpected Error.");
                setAlert(true);
            }

            setLoading(false);
        }
    }
    
    if (isLoggedIn()) {
        return <Navigate to="/orders" />
    }

    return (
        <AuthLayout title="Sign Up">
            <form onSubmit={(e) => attemptSignup(e)} className="space-y-6">
                {alert ? <>
                    <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-300" role="alert">
                        <span className="font-medium">Error!</span> {message}
                    </div>
                </> : <></>}

                <div>
                    <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                        Username
                    </label>
                    <div className="mt-2">
                        <input
                            onInput={(e) => setUsername(e.target.value)}
                            value={username}
                            id="username"
                            name="username"
                            type="text"
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                        Password
                    </label>
                    <div className="mt-2">
                        <input
                            onInput={(e) => setPassword(e.target.value)}
                            value={password}
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                        Country
                    </label>
                    <div className="mt-2">
                        <select
                            onChange={(e) => setCountry(e.target.value)}
                            id="country"
                            value={country}
                            name="country"
                            type="country"
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
                        >
                            <option value="India">India</option>
                            <option value="Pakistan">Pakistan</option>
                            <option value="Netherlands">Netherlands</option>
                            <option value="USA">USA</option>
                            <option value="UK">UK</option>
                        </select>
                    </div>
                </div>
                <div>
                    {loading ? <>
                        <button onClick={(e) => e.preventDefault()}
                            className="flex w-full justify-center rounded-md bg-amber-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm"
                        >
                            Creating Account...
                        </button>
                    </> : <>
                        <button
                            className="flex w-full justify-center rounded-md bg-amber-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                        >
                            Sign Up
                        </button>
                    </>}

                    <a href="/auth/login" className="font-semibold text-amber-600 hover:text-amber-500 mt-5 inline-block">
                        Already have an account?
                    </a>
                </div>
            </form>
        </AuthLayout>
    )
};

export default Signup;
