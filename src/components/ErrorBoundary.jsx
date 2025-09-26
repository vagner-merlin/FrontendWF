import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                    backgroundColor: '#f0f4f3',
                    color: '#333',
                    fontFamily: 'Montserrat, sans-serif'
                }}>
                    <h1>¡Oops! Algo salió mal</h1>
                    <p>Ha ocurrido un error inesperado. Por favor, recarga la página.</p>
                    <button
                        onClick={() => window.location.reload()}
                        style={{
                            marginTop: '20px',
                            padding: '10px 20px',
                            backgroundColor: '#3ab397',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                    >
                        Recargar Página
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;