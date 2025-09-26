import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/auth.css';

const AuthForm = () => {
    const { login, register } = useAuth();
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });

    // Estados para el formulario de login
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    // Estados para el formulario de registro
    const [registerData, setRegisterData] = useState({
        username: '',
        email: '',
        password: '',
        name: '',
        telefono_ref: '',
        email_empresarial: '',
        nombre_completo: '',
        direccion: '',
        telefono: ''
    });

    const handleLoginChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        });
    };

    const handleRegisterChange = (e) => {
        setRegisterData({
            ...registerData,
            [e.target.name]: e.target.value
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ text: '', type: '' });

        const result = await login(loginData.email, loginData.password);
        
        setMessage({
            text: result.message,
            type: result.success ? 'success' : 'error'
        });
        
        setLoading(false);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ text: '', type: '' });

        const result = await register(registerData);
        
        setMessage({
            text: result.message,
            type: result.success ? 'success' : 'error'
        });
        
        setLoading(false);
    };

    const toggleForm = () => {
        setIsLogin(!isLogin);
        setMessage({ text: '', type: '' });
    };

    return (
        <div className="auth-container">
            <div className="auth-box-modern">
                {/* Lado izquierdo con imagen */}
                <div className="auth-left">
                    <div className="auth-image"></div>
                </div>
                
                {/* Lado derecho con formulario */}
                <div className="auth-right">
                    {isLogin ? (
                        // FORMULARIO DE LOGIN
                        <form className="auth-form-modern" onSubmit={handleLogin}>
                            <h2>Iniciar Sesión</h2>
                            <p>Ingrese sus credenciales</p>
                            
                            {message.text && (
                                <div className={`message ${message.type}`}>
                                    {message.text}
                                </div>
                            )}
                            
                            <div className="input-group">
                                <span className="input-icon">📧</span>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="vagner@gmail.com"
                                    value={loginData.email}
                                    onChange={handleLoginChange}
                                    required
                                />
                            </div>
                            
                            <div className="input-group">
                                <span className="input-icon">🔒</span>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="......"
                                    value={loginData.password}
                                    onChange={handleLoginChange}
                                    required
                                />
                            </div>
                            
                            <a href="#" className="forgot-password">¿Olvidaste tu contraseña?</a>
                            
                            <button 
                                type="submit" 
                                className="auth-button-modern"
                                disabled={loading}
                            >
                                {loading ? 'Cargando...' : 'Iniciar Sesión'}
                            </button>
                            
                            <p className="register-link">
                                ¿No tienes cuenta? <a href="#" onClick={(e) => {e.preventDefault(); toggleForm();}}>Regístrate aquí</a>
                            </p>
                        </form>
                    ) : (
                        // FORMULARIO DE REGISTRO
                        <form className="auth-form-modern register-form" onSubmit={handleRegister}>
                            <h2>Registrarse</h2>
                            <p>Complete todos los campos</p>
                            
                            {message.text && (
                                <div className={`message ${message.type}`}>
                                    {message.text}
                                </div>
                            )}
                            
                            <div className="register-grid">
                                <div className="input-group">
                                    <span className="input-icon">👤</span>
                                    <input
                                        type="text"
                                        name="username"
                                        placeholder="Nombre de usuario"
                                        value={registerData.username}
                                        onChange={handleRegisterChange}
                                        required
                                    />
                                </div>
                                
                                <div className="input-group">
                                    <span className="input-icon">📧</span>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Tu correo"
                                        value={registerData.email}
                                        onChange={handleRegisterChange}
                                        required
                                    />
                                </div>
                                
                                <div className="input-group">
                                    <span className="input-icon">🔒</span>
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Tu contraseña"
                                        value={registerData.password}
                                        onChange={handleRegisterChange}
                                        required
                                    />
                                </div>
                                
                                <div className="input-group">
                                    <span className="input-icon">🏢</span>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Nombre de la empresa"
                                        value={registerData.name}
                                        onChange={handleRegisterChange}
                                        required
                                    />
                                </div>
                                
                                <div className="input-group">
                                    <span className="input-icon">📞</span>
                                    <input
                                        type="tel"
                                        name="telefono_ref"
                                        placeholder="Teléfono de referencia"
                                        value={registerData.telefono_ref}
                                        onChange={handleRegisterChange}
                                        required
                                    />
                                </div>
                                
                                <div className="input-group">
                                    <span className="input-icon">💼</span>
                                    <input
                                        type="email"
                                        name="email_empresarial"
                                        placeholder="Email empresarial"
                                        value={registerData.email_empresarial}
                                        onChange={handleRegisterChange}
                                        required
                                    />
                                </div>
                                
                                <div className="input-group">
                                    <span className="input-icon">👨‍💼</span>
                                    <input
                                        type="text"
                                        name="nombre_completo"
                                        placeholder="Nombre completo"
                                        value={registerData.nombre_completo}
                                        onChange={handleRegisterChange}
                                        required
                                    />
                                </div>
                                
                                <div className="input-group">
                                    <span className="input-icon">🏠</span>
                                    <input
                                        type="text"
                                        name="direccion"
                                        placeholder="Dirección"
                                        value={registerData.direccion}
                                        onChange={handleRegisterChange}
                                        required
                                    />
                                </div>
                                
                                <div className="input-group">
                                    <span className="input-icon">📱</span>
                                    <input
                                        type="tel"
                                        name="telefono"
                                        placeholder="Teléfono personal"
                                        value={registerData.telefono}
                                        onChange={handleRegisterChange}
                                        required
                                    />
                                </div>
                            </div>
                            
                            <button 
                                type="submit" 
                                className="auth-button-modern"
                                disabled={loading}
                            >
                                {loading ? 'Cargando...' : 'Registrarse'}
                            </button>
                            
                            <p className="register-link">
                                ¿Ya tienes cuenta? <a href="#" onClick={(e) => {e.preventDefault(); toggleForm();}}>Inicia sesión aquí</a>
                            </p>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AuthForm;