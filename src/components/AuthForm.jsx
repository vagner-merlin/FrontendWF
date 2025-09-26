import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/auth.css';

const AuthForm = () => {
    const { login, register } = useAuth();
    const [isToggled, setIsToggled] = useState(false);
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
        setIsToggled(!isToggled);
        setMessage({ text: '', type: '' });
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                {/* Formulario de Login */}
                {!isToggled && (
                <div className="form-container">
                    <form className="auth-form sign-in" onSubmit={handleLogin}>
                        <h2 style={{color: '#4CAF50', marginBottom: '30px'}}>Iniciar Sesión</h2>
                        
                        <span style={{marginBottom: '20px', color: '#666'}}>Ingrese sus credenciales</span>
                        
                        {message.text && message.type && (
                            <div className={`message ${message.type}`}>
                                {message.text}
                            </div>
                        )}
                        
                        <div className="input-container">
                            <span>📧</span>
                            <input
                                type="email"
                                name="email"
                                placeholder="Tu correo"
                                value={loginData.email}
                                onChange={handleLoginChange}
                                required
                            />
                        </div>
                        
                        <div className="input-container">
                            <span>🔒</span>
                            <input
                                type="password"
                                name="password"
                                placeholder="Tu contraseña"
                                value={loginData.password}
                                onChange={handleLoginChange}
                                required
                            />
                        </div>
                        
                        <a href="#" className="forgot-password">¿Olvidaste tu contraseña?</a>
                        
                        <button 
                            type="submit" 
                            className="auth-button"
                            disabled={loading}
                        >
                            {loading ? 'Cargando...' : 'Iniciar Sesión'}
                        </button>
                        
                        <p style={{marginTop: '20px', color: '#666', fontSize: '14px'}}>
                            ¿No tienes cuenta? 
                            <span 
                                onClick={toggleForm}
                                style={{
                                    color: '#4CAF50',
                                    cursor: 'pointer',
                                    fontWeight: '600',
                                    marginLeft: '5px'
                                }}
                            >
                                Regístrate aquí
                            </span>
                        </p>
                    </form>
                </div>
                )}

                {/* Formulario de Registro */}
                {isToggled && (
                <div className="form-container">
                    <form className="auth-form sign-up" onSubmit={handleRegister}>
                        <h2 style={{color: '#4CAF50', marginBottom: '20px'}}>Registrarse</h2>
                        
                        <span style={{marginBottom: '15px', color: '#666'}}>Complete todos los campos</span>
                        
                        {message.text && message.type && (
                            <div className={`message ${message.type}`}>
                                {message.text}
                            </div>
                        )}
                        
                        <div className="input-container">
                            <span>👤</span>
                            <input
                                type="text"
                                name="username"
                                placeholder="Nombre de usuario"
                                value={registerData.username}
                                onChange={handleRegisterChange}
                                required
                            />
                        </div>
                        
                        <div className="input-container">
                            <span>📧</span>
                            <input
                                type="email"
                                name="email"
                                placeholder="Tu correo"
                                value={registerData.email}
                                onChange={handleRegisterChange}
                                required
                            />
                        </div>
                        
                        <div className="input-container">
                            <span>🔒</span>
                            <input
                                type="password"
                                name="password"
                                placeholder="Tu contraseña"
                                value={registerData.password}
                                onChange={handleRegisterChange}
                                required
                            />
                        </div>
                        
                        <div className="input-container">
                            <span>🏢</span>
                            <input
                                type="text"
                                name="name"
                                placeholder="Nombre de la empresa"
                                value={registerData.name}
                                onChange={handleRegisterChange}
                                required
                            />
                        </div>
                        
                        <div className="input-container">
                            <span>📞</span>
                            <input
                                type="tel"
                                name="telefono_ref"
                                placeholder="Teléfono de referencia"
                                value={registerData.telefono_ref}
                                onChange={handleRegisterChange}
                                required
                            />
                        </div>
                        
                        <div className="input-container">
                            <span>💼</span>
                            <input
                                type="email"
                                name="email_empresarial"
                                placeholder="Email empresarial"
                                value={registerData.email_empresarial}
                                onChange={handleRegisterChange}
                                required
                            />
                        </div>
                        
                        <div className="input-container">
                            <span>👨‍💼</span>
                            <input
                                type="text"
                                name="nombre_completo"
                                placeholder="Nombre completo"
                                value={registerData.nombre_completo}
                                onChange={handleRegisterChange}
                                required
                            />
                        </div>
                        
                        <div className="input-container">
                            <span>🏠</span>
                            <input
                                type="text"
                                name="direccion"
                                placeholder="Dirección"
                                value={registerData.direccion}
                                onChange={handleRegisterChange}
                                required
                            />
                        </div>
                        
                        <div className="input-container">
                            <span>📱</span>
                            <input
                                type="tel"
                                name="telefono"
                                placeholder="Teléfono personal"
                                value={registerData.telefono}
                                onChange={handleRegisterChange}
                                required
                            />
                        </div>
                        
                        <button 
                            type="submit" 
                            className="auth-button"
                            disabled={loading}
                        >
                            {loading ? 'Cargando...' : 'Registrarse'}
                        </button>
                        
                        <p style={{marginTop: '20px', color: '#666', fontSize: '14px'}}>
                            ¿Ya tienes cuenta? 
                            <span 
                                onClick={toggleForm}
                                style={{
                                    color: '#4CAF50',
                                    cursor: 'pointer',
                                    fontWeight: '600',
                                    marginLeft: '5px'
                                }}
                            >
                                Inicia sesión aquí
                            </span>
                        </p>
                    </form>
                </div>
                )}
            </div>
        </div>
    );
};

export default AuthForm;