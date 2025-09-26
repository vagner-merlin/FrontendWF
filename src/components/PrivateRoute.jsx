import React from 'react';
import { useAuth } from '../context/AuthContext';
import AuthFormNew from './AuthFormNew';
import Loading from './Loading';

const PrivateRoute = ({ children }) => {
    const { token, loading } = useAuth();

    if (loading) {
        return <Loading />;
    }

    return token ? children : <AuthFormNew />;
};

export default PrivateRoute;