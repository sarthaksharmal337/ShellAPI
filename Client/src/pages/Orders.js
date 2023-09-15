import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import { isLoggedIn, token } from "../Services/Auth";

import { BASE_URL } from '../utils/constants';

import Layout from '../components/common/Layout';
import OrderItem from '../components/common/OrderItem';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(async () => {
        if (!isLoggedIn()) {
            return window.location.replace('/auth/login');
        }

        const response = await fetch(BASE_URL + '/orders/get', {
            method: 'GET',
            headers: {
                'X-Token': token()
            }
        });

        const data = await response.json();

        setOrders(data);
    }, []);

    return (
        <Layout title="Your Orders">
            {orders && orders.length ? (
                <>
                    <div className="breadcrumbs flex items-center justify-between">
                        <div>
                            <a href="/orders" className="font-semibold text-amber-600 hover:text-amber-500 mt-5 inline-block">
                                &raquo; Home
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
                        <div className="grid grid-cols-1 gap-2">
                            { orders.map(order => <OrderItem id={order.id} key={order.id} subtitle={order.items.map(item => item.name).join(', ')} title={"Order #" + order.id + " at " + order.branch.name} price={"$" + order.price.toFixed(1)} />) }
                        </div>
                    </div>  
                </>
            ) : (
				<>
					<div className="breadcrumbs flex items-center justify-between">
                        <div>
                            <a href="/orders" className="font-semibold text-amber-600 hover:text-amber-500 mt-5 inline-block">
                                &raquo; Home
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
					
					<div className="mt-5">You currently don't have any orders</div>
				</>
			)}
        </Layout>
    )
};

export default Orders;
