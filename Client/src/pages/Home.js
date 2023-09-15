import React from 'react';
import { Navigate } from 'react-router-dom';

import { isLoggedIn } from "../Services/Auth";

const Home = () => {
    if(isLoggedIn()) {
        return <Navigate to="/orders" />
    } else {
        return <Navigate to="/auth/login" />
    }
};

export default Home;
