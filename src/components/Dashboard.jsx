import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { API_CONFIG } from '../config/api';
import '../styles/auth.css';

const Dashboard = () => {
    const { user, profile, logout } = useAuth();
    const [activeTab, setActiveTab] = useState('home');

    const handleLogout = () => {
        logout();
    };

    const handleAdminAccess = () => {
        if (user?.is_superuser) {
            window.open(`${API_CONFIG.ADMIN_URL}/`, '_blank');
        } else {
            alert('Usted no puede entrar. No tiene permisos de administrador.');
        }
    };

    if (!profile) {
        return (
            <div className="loading">
                <div className="spinner"></div>
            </div>
        );
    }

    const renderContent = () => {
        switch (activeTab) {
            case 'home':
                return (
                    <div className="home-section">
                        <div className="hero-banner">
                            <div className="hero-content">
                                <h1>Bienvenido, {profile.profile?.nombre_completo || user?.username} 🎉</h1>
                                <p>Workflow de Gestión Financiera</p>
                                <button className="admin-button" onClick={handleAdminAccess}>
                                    Administrar Software
                                </button>
                            </div>
                        </div>
                    </div>
                );
            case 'personal':
                return (
                    <div className="info-section">
                        <h2>Información Personal</h2>
                        <div className="info-card">
                            <p><strong>Nombre:</strong> {profile.profile?.nombre_completo}</p>
                            <p><strong>Email:</strong> {user?.email}</p>
                            <p><strong>Usuario:</strong> {user?.username}</p>
                            <p><strong>Teléfono:</strong> {profile.profile?.telefono}</p>
                            <p><strong>Dirección:</strong> {profile.profile?.direccion}</p>
                            <p><strong>Fecha de registro:</strong> {new Date(user?.date_joined).toLocaleDateString()}</p>
                            <p><strong>Último login:</strong> {user?.last_login ? new Date(user.last_login).toLocaleString() : 'Primer inicio de sesión'}</p>
                        </div>
                    </div>
                );
            case 'empresa':
                return (
                    <div className="info-section">
                        <h2>Información de la Empresa</h2>
                        <div className="info-card">
                            <p><strong>Empresa:</strong> {profile.empresa?.name}</p>
                            <p><strong>Email empresarial:</strong> {profile.empresa?.email_empresarial}</p>
                            <p><strong>Teléfono de referencia:</strong> {profile.empresa?.telefono_ref}</p>
                            <p><strong>Es administrador:</strong> {profile.empresa?.is_admin ? 'Sí' : 'No'}</p>
                        </div>
                    </div>
                );
            case 'dashboard':
                return (
                    <div className="info-section">
                        <h2>Ver Dashboard</h2>
                        <div className="info-card">
                            <p><strong>Estado:</strong> <span style={{color: '#4CAF50'}}>{profile.status === 'authenticated' ? 'Autenticado' : 'No autenticado'}</span></p>
                            <p><strong>Superusuario:</strong> {user?.is_superuser ? 'Sí' : 'No'}</p>
                            <p><strong>Staff:</strong> {user?.is_staff ? 'Sí' : 'No'}</p>
                            <p><strong>Activo:</strong> {user?.is_active ? 'Sí' : 'No'}</p>
                            {profile.permissions && (
                                <>
                                    <p><strong>Admin de empresa:</strong> {profile.permissions.is_company_admin ? 'Sí' : 'No'}</p>
                                    <p><strong>Gestionar usuarios:</strong> {profile.permissions.can_manage_users ? 'Sí' : 'No'}</p>
                                    <p><strong>Acceso admin:</strong> {profile.permissions.can_access_admin ? 'Sí' : 'No'}</p>
                                </>
                            )}
                            <p><strong>Grupos:</strong> {profile.groups?.length || 0} grupos asignados</p>
                        </div>
                    </div>
                );
            case 'creditos':
                return (
                    <div className="info-section">
                        <h2>Estado de Créditos</h2>
                        <div className="info-card">
                            <p><strong>Estado del sistema:</strong> <span style={{color: '#4CAF50'}}>Activo</span></p>
                            <p><strong>Permisos de crédito:</strong> {profile.permissions?.can_manage_users ? 'Habilitado' : 'Limitado'}</p>
                            <p><strong>Límite disponible:</strong> Sin límite establecido</p>
                            <p><strong>Créditos utilizados:</strong> 0</p>
                            <div style={{marginTop: '20px', padding: '15px', backgroundColor: '#e8f5e8', borderRadius: '8px', border: '1px solid #4CAF50'}}>
                                <p style={{margin: 0, color: '#2e7d32'}}><strong>Sistema de créditos en desarrollo</strong></p>
                                <p style={{margin: '5px 0 0 0', fontSize: '14px', color: '#388e3c'}}>Próximamente disponible para gestión financiera</p>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="new-dashboard">
            <header className="new-dashboard-header">
                <div className="dashboard-title">
                    🏦 WF Finanza
                </div>
                <button className="logout-button" onClick={handleLogout}>
                    Cerrar Sesión
                </button>
            </header>

            <div className="dashboard-layout">
                <nav className="dashboard-nav">
                    <button 
                        className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
                        onClick={() => setActiveTab('home')}
                    >
                        🏠 Home
                    </button>
                    <button 
                        className={`nav-item ${activeTab === 'personal' ? 'active' : ''}`}
                        onClick={() => setActiveTab('personal')}
                    >
                        👤 Información Personal
                    </button>
                    <button 
                        className={`nav-item ${activeTab === 'empresa' ? 'active' : ''}`}
                        onClick={() => setActiveTab('empresa')}
                    >
                        🏢 Información de la Empresa
                    </button>
                    <button 
                        className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
                        onClick={() => setActiveTab('dashboard')}
                    >
                        📊 Ver Dashboard
                    </button>
                    <button 
                        className={`nav-item ${activeTab === 'creditos' ? 'active' : ''}`}
                        onClick={() => setActiveTab('creditos')}
                    >
                        💳 Estado de Créditos
                    </button>
                </nav>

                <main className="dashboard-main">
                    {renderContent()}
                </main>
            </div>
        </div>
    );
};

export default Dashboard;