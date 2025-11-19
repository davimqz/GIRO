import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { API_URL } from '../../config/api';
import GoogleSignIn from './GoogleSignIn';

const LoginModal = ({ isOpen, onClose, onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  // Reset form when modal opens/closes
  React.useEffect(() => {
    if (isOpen) {
      console.log('🔍 Modal aberto - isOpen:', isOpen);
      setFormData({ name: '', email: '', password: '', confirmPassword: '' });
      setError('');
      setLoading(false);
      // Force scroll to top on mobile
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!isLogin && formData.password !== formData.confirmPassword) {
        throw new Error('As senhas não coincidem');
      }

      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro na autenticação');
      }

      // Salva token no localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Atualizar contexto de autenticação
      login(data.user);
      
      // Executar callback de login (redirecionamento)
      if (onLogin) {
        onLogin(data.user);
      }
      
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const modalContent = (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center p-4"
        style={{ 
          zIndex: 999999,
          position: 'fixed',
          width: '100vw',
          height: '100vh',
          top: 0,
          left: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.75)'
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 50 }}
          className="bg-white rounded-2xl w-full shadow-2xl relative"
          onClick={(e) => e.stopPropagation()}
          style={{ 
            maxWidth: '400px',
            width: '90%',
            maxHeight: '85vh', 
            overflowY: 'auto',
            margin: 'auto',
            padding: '24px',
            position: 'relative',
            transform: 'translateY(0)'
          }}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              🚀 {isLogin ? 'Entrar' : 'Criar Conta'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              style={{ fontSize: '24px', fontWeight: 'bold' }}
            >
              ❌
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  name="name"
                  placeholder="Nome completo"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent outline-none"
                  onFocus={(e) => {
                    e.target.style.borderColor = '#8fbc8f';
                    e.target.style.boxShadow = '0 0 0 2px rgba(143, 188, 143, 0.25)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.boxShadow = 'none';
                  }}
                  required={!isLogin}
                />
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent outline-none"
                onFocus={(e) => {
                  e.target.style.borderColor = '#8fbc8f';
                  e.target.style.boxShadow = '0 0 0 2px rgba(143, 188, 143, 0.25)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d1d5db';
                  e.target.style.boxShadow = 'none';
                }}
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Senha"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent outline-none"
                onFocus={(e) => {
                  e.target.style.borderColor = '#8fbc8f';
                  e.target.style.boxShadow = '0 0 0 2px rgba(143, 188, 143, 0.25)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d1d5db';
                  e.target.style.boxShadow = 'none';
                }}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {!isLogin && (
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirmar senha"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent outline-none"
                  onFocus={(e) => {
                    e.target.style.borderColor = '#8fbc8f';
                    e.target.style.boxShadow = '0 0 0 2px rgba(143, 188, 143, 0.25)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.boxShadow = 'none';
                  }}
                  required={!isLogin}
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full text-white py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ 
                backgroundColor: loading ? '#9ca3af' : '#8fbc8f',
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
              onMouseEnter={(e) => {
                if (!loading) e.target.style.backgroundColor = '#6b9b6b'
              }}
              onMouseLeave={(e) => {
                if (!loading) e.target.style.backgroundColor = '#8fbc8f'
              }}
            >
              {loading ? 'Carregando...' : (isLogin ? 'Entrar' : 'Criar Conta')}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-gray-500 text-sm">ou</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Google Login */}
          <GoogleSignIn 
            onSuccess={(data) => {
              console.log('✅ Login Google bem-sucedido:', data);
              onClose(); // Fechar modal após login
              if (onLogin) onLogin(data.user);
            }}
            onError={(error) => {
              console.error('❌ Erro no login Google:', error);
              setError(error || 'Erro na autenticação com Google');
            }}
            disabled={loading}
          />

          {/* Switch Mode */}
          <div className="mt-6 text-center">
            <span className="text-gray-600">
              {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}
            </span>
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 font-semibold transition-colors"
              style={{ color: '#8fbc8f' }}
              onMouseEnter={(e) => e.target.style.color = '#6b9b6b'}
              onMouseLeave={(e) => e.target.style.color = '#8fbc8f'}
            >
              {isLogin ? 'Criar conta' : 'Entrar'}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  // Renderizar usando portal no body
  return createPortal(modalContent, document.body);
};

export default LoginModal;