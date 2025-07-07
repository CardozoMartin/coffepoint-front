import React, { useState } from 'react';
import '../Css/register.css'; // Importar estilos CSS
import { Coffee } from 'lucide-react';

const RegisterPage = ({ onSwitchToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!name || !email || !password || !confirmPassword) {
      alert('Por favor completa todos los campos');
      return;
    }

    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    if (password.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setIsLoading(true);
    // Simular llamada a API
    setTimeout(() => {
      setIsLoading(false);
      alert('¡Cuenta creada exitosamente!');
    }, 1000);
  };

  return (
    <>

      
      

      <div className="register-container d-flex align-items-center justify-content-center">
        <div className="w-100">
          <div className="register-card">
            {/* Logo y título */}
            <div className="text-center mb-4">
              <div className="d-flex align-items-center justify-content-center mb-3">
                <i className="bi bi-cup-hot coffee-logo"></i>
                <div className='d-flex align-items-center '>
                    <Coffee className='icon-coffe'></Coffee>
                <h1 className="brand-title ms-2">COFFEEPOINT</h1>
                </div>
              </div>
              <p className="subtitle mb-0">Únete a nuestra comunidad cafetera</p>
            </div>

            {/* Formulario */}
            <div onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Nombre completo
                </label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tu nombre"
                  disabled={isLoading}
                />
              </div>

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

              <div className="mb-3">
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
                    style={{ paddingRight: '3rem' }}
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

              <div className="mb-4">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirmar contraseña
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="form-control"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  disabled={isLoading}
                />
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
                    Creando cuenta...
                  </>
                ) : (
                  'Crear Cuenta'
                )}
              </button>
            </div>

            {/* Switch to login */}
            <div className="text-center mt-4">
              <p className="text-coffee-medium mb-0">
                ¿Ya tienes cuenta?{' '}
                <button
                  type="button"
                  className="btn btn-link p-0 login-link"
                  onClick={onSwitchToLogin}
                >
                  Inicia sesión aquí
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;