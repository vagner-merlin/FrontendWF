import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { API_CONFIG } from '../config/api';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    // Configurar axios para incluir el token en todas las peticiones
    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Token ${token}`;
            fetchProfile();
        } else {
            delete axios.defaults.headers.common['Authorization'];
            setLoading(false);
        }
    }, [token]);

    const login = async (email, password) => {
        try {
            const response = await axios.post(`${API_CONFIG.API_URL}/login/`, {
                email,
                password
            });

            const { token: newToken, user: userData } = response.data;
            
            setToken(newToken);
            setUser(userData);
            localStorage.setItem('token', newToken);
            axios.defaults.headers.common['Authorization'] = `Token ${newToken}`;
            
            await fetchProfile();
            
            return { success: true, message: response.data.message };
        } catch (error) {
            console.error('Login error:', error);
            return { 
                success: false, 
                message: error.response?.data?.message || 'Error al iniciar sesión' 
            };
        }
    };

    const register = async (userData) => {
        try {
            const response = await axios.post(`${API_CONFIG.API_URL}/register/`, userData);
            
            const { token: newToken, user: userInfo } = response.data;
            
            setToken(newToken);
            setUser(userInfo);
            localStorage.setItem('token', newToken);
            axios.defaults.headers.common['Authorization'] = `Token ${newToken}`;
            
            await fetchProfile();
            
            return { success: true, message: response.data.message };
        } catch (error) {
            console.error('Register error:', error);
            return { 
                success: false, 
                message: error.response?.data?.message || 'Error al registrarse' 
            };
        }
    };

    const fetchProfile = async () => {
        try {
            const response = await axios.get(`${API_CONFIG.API_URL}/profile/`);
            setProfile(response.data);
            setUser(response.data.user);
            setLoading(false);
        } catch (error) {
            console.error('Profile fetch error:', error);
            logout();
        }
    };

    const logout = async () => {
        try {
            await axios.post(`${API_CONFIG.API_URL}/logout/`);
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            setToken(null);
            setUser(null);
            setProfile(null);
            localStorage.removeItem('token');
            delete axios.defaults.headers.common['Authorization'];
        }
    };

    const value = {
        user,
        token,
        profile,
        loading,
        login,
        register,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};