import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { isLoggedIn, token } from "../Services/Auth";

import { BASE_URL } from '../utils/constants';

import Layout from '../components/common/Layout';

const SingleOrder = () => {
    let { id } = useParams();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(async () => {
        if (!isLoggedIn()) {
            return window.location.replace('/auth/login');
        }

        const response = await fetch(BASE_URL + '/orders/single/' + id, {
            method: 'GET',
            headers: {
                'X-Token': token()
            }
        });

        const data = await response.json();

        if(response.status == 200) {
            setOrder(data);
        } else {
            return window.location.replace('/orders');
        }

    }, []);

    return (
        <Layout title={"View Order #" + id}>
            {order != null && (
                <>
                <div className="breadcrumbs flex items-center justify-between">
                    <div>
                        <a href="/orders" className="font-semibold text-amber-600 hover:text-amber-500 mt-5 inline-block">
                            &raquo; Home
                        </a>
                        <a href={"/orders/" + id} className="font-semibold text-amber-600 hover:text-amber-500 mt-5 ml-2 inline-block">
                            &raquo; View Order #{order.id}
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



                <div className="mt-5">
                    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
                        <div className="px-4 py-6 sm:px-6">
                            <h3 className="text-base font-semibold leading-7 text-gray-900">Order Information</h3>
                            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">View your Order Details</p>
                        </div>
                        <div className="border-t border-gray-100">
                            <dl className="divide-y divide-gray-100">
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-900">Order Number</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{order.id}</dd>
                                </div>
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-900">Location</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{order.branch.name}</dd>
                                </div>
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-900">Total Price</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">${order.price.toFixed(1)}</dd>
                                </div>
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">Items</dt>
                                    <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                        <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                                            {order.items.map(item => (
                                                <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                                                    <div className="flex w-0 flex-1 items-center">
                                                        <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                                            <span className="truncate font-medium">{item.name}</span>
                                                            <span className="flex-shrink-0 text-gray-400">${item.price.toFixed(1)}</span>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </dd>
                                </div>
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-900">Status</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Confirmed. Payable at Location in-person.</dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>
                </> 
            )}
        </Layout>
    )
};

export default SingleOrder;
