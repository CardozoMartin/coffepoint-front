import React, { useState } from 'react';
import '../Css/login.css'; // Importar estilos CSS
import { Coffee } from 'lucide-react';
import { Link } from 'react-router-dom';
const LoginPage = ({ onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      alert('Por favor completa todos los campos');
      return;
    }
    
    setIsLoading(true);
    // Simular llamada a API
    setTimeout(() => {
      setIsLoading(false);
      alert('¡Bienvenido a CoffeePoint!');
    }, 1000);
  };

  return (
    <>
      {/* Bootstrap CSS */}
      
      
     

      <div className="login-container d-flex align-items-center justify-content-center">
        <div className="w-100">
          <div className="login-card">
            {/* Logo y título */}
            <div className="text-center mb-4">
              <div className="d-flex align-items-center justify-content-center mb-3">
                <i className="bi bi-cup-hot coffee-logo"></i>
                <div className='d-flex align-items-center '>
                    <Coffee className='icon-coffe'></Coffee>
                    <h1 className="brand-title ms-2">COFFEEPOINT</h1>
                    </div>
              </div>
              <p className="subtitle mb-0">Inicia sesión para continuar</p>
            </div>

            {/* Formulario */}
            <div onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  disabled={isLoading}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="form-label">
                  Contraseña
                </label>
                <div className="position-relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    disabled={isLoading}
                    style={{ paddingRight: '2.5rem' }}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-coffee"
                disabled={isLoading}
                onClick={handleSubmit}
              >
                {isLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Iniciando sesión...
                  </>
                ) : (
                  'Iniciar Sesión'
                )}
              </button>
            </div>

            {/* Switch to register */}
            <div className="text-center mt-4">
              <p className="text-coffee-medium mb-0">
                ¿No tienes cuenta?{' '}
                <Link to={'/register'}
                  type="button"
                  className="btn btn-link p-0 register-link"
                  onClick={onSwitchToRegister}
                >
                  Regístrate aquí
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;