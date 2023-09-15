import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { isLoggedIn, token } from "../Services/Auth";

import { BASE_URL } from '../utils/constants';

import Layout from '../components/common/Layout';

const NewOrder = () => {
    let { id } = useParams();

    const [branches, setBranches] = useState([]);
    const [items, setItems] = useState([]);

    const [itemsSelect, setItemsSelect] = useState([]);
    const [branch, setBranch] = useState(null);

    const [alert, setAlert] = useState(false);
    const [message, setMessage] = useState('');

    const [loading, setLoading] = useState(false);

    useEffect(async () => {
        if (!isLoggedIn()) {
            return window.location.replace('/auth/login');
        }

        const responseBranches = await fetch(BASE_URL + '/branches', {
            method: 'GET',
            headers: {
                'X-Token': token()
            }
        });

        const responseItems = await fetch(BASE_URL + '/items', {
            method: 'GET',
            headers: {
                'X-Token': token()
            }
        });

        const branches = await responseBranches.json();
        const items = await responseItems.json();

        setBranches(branches);
        setItems(items);

        if (branches[0]) {
            setBranch(branches[0]['id']);
        }
    }, []);

    const handleCheck = (event) => {
        var updatedList = [...itemsSelect];
        if (event.target.checked) {
          updatedList = [...itemsSelect, event.target.value];
        } else {
          updatedList.splice(itemsSelect.indexOf(event.target.value), 1);
        }
        setItemsSelect(updatedList);
    };

    const attemptOrder = async (e) => {
        e.preventDefault();

        if(!loading) {
            setLoading(true);

            try {
                const response = await fetch(BASE_URL + '/orders/create/' + branch + "/" + itemsSelect.join(','), {
                    method: 'POST',
                    headers: {
                        'X-Token': token()
                    }
                });

                if(response.status == 200) {

                    const data = await response.json();

                    return window.location.replace('/orders/' + data.id);
                } else {
                    const text = await response.text();
                    setMessage(text);
                    setAlert(true);
                }
            } catch(e) {
                setAlert(true);
            }

            setLoading(false);
        }
    }

    return (
        <Layout title="Your Orders">
            {branches.length && items.length != null ? (
                <>
                    <div className="breadcrumbs flex items-center justify-between">
                        <div>
                            <a href="/orders" className="font-semibold text-amber-600 hover:text-amber-500 mt-5 inline-block">
                                &raquo; Home
                            </a>
                            <a href="/orders/new" className="font-semibold text-amber-600 hover:text-amber-500 mt-5 ml-2 inline-block">
                                &raquo; New Order
                            </a>
                        </div>

                        <div>
                            <a href="/orders/new" className="font-semibold bg-amber-600 text-white px-4 py-2 rounded-md mt-5 inline-block mr-2">
                                New Order
                            </a>
                            <a href="/auth/logout" className="font-semibold bg-amber-600 text-white px-4 py-2 rounded-md mt-5 inline-block">
                                Logout
                            </a>
                        </div>
                    </div>
                    <div class="mt-5">
                        <form onSubmit={(e) => attemptOrder(e)} className="space-y-6">
                            {alert ? <>
                                <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-300" role="alert">
                                    <span className="font-medium">Error!</span> {message}
                                </div>
                            </> : <></>}

                            <div>
                                <label htmlFor="branch" className="block text-sm font-medium leading-6 text-gray-900">
                                    Location - Closest Locations are Shown Only
                                </label>
                                <div className="mt-2">
                                    <select
                                        onChange={(e) => setBranch(e.target.value)}
                                        value={branch}
                                        name="branch"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
                                    >
                                        {branches.map(branch => <option value={branch.id}>{branch.name}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <fieldset>
                                    <legend className="text-base font-semibold leading-6 text-gray-900">Items</legend>
                                    <div className="mt-4 divide-y divide-gray-200 border-b border-t border-gray-200">
                                        {items.map(item => (
                                            <div key={item.id} className="relative flex items-start py-4">
                                                <div className="ml-3 flex h-6 items-center">
                                                    <input
                                                        id={`item-${item.id}`}
                                                        name={`item-${item.id}`}
                                                        type="checkbox"
                                                        value={item.id}
                                                        onChange={handleCheck}
                                                        className="h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-600"
                                                    />
                                                </div>
                                                <div className="min-w-0 flex-1 text-sm leading-6 ml-3">
                                                    <label className="select-none font-medium text-gray-900">
                                                        {item.name}
                                                        <span className="flex-shrink-0 text-gray-400 ml-2">+${item.price.toFixed(1)}</span>
                                                    </label>
                                                </div>
                                                
                                            </div>
                                        ))}
                                    </div>
                                </fieldset>
                            </div>

                            <div>
                                {loading ? <>
                                    <button onClick={(e) => e.preventDefault()}
                                        className="flex w-full justify-center rounded-md bg-amber-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm"
                                    >
                                        Pacing Order...
                                    </button>
                                </> : <>
                                    <button
                                        className="flex w-full justify-center rounded-md bg-amber-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                                    >
                                        Place Order
                                    </button>
                                </>}
                            </div>
                        </form>
                    </div>
                </>
            ) : (
                <>There are no locations available for your area.</>
            )}
        </Layout>
    )
};

export default NewOrder;
