import React from 'react';
import { Navigate } from 'react-router-dom';

import { invalidate } from "../../Services/Auth";

const Logout = () => {
    invalidate();

    return <Navigate to="/auth/login" />
};

export default Logout;
