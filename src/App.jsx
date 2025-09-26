import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './components/Dashboard';
import './styles/auth.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
