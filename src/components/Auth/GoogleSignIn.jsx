import React, { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { API_URL } from '../../config/api';

const GoogleSignIn = ({ onSuccess, onError, disabled = false }) => {
  const { login } = useAuth();

  useEffect(() => {
    // Carregar script do Google Sign-In
    const loadGoogleScript = () => {
      if (window.google) return;

      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = initializeGoogleSignIn;
      document.body.appendChild(script);
    };

    const initializeGoogleSignIn = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          callback: handleGoogleResponse,
          auto_select: false,
          cancel_on_tap_outside: true
        });

        // Renderizar o botão
        window.google.accounts.id.renderButton(
          document.getElementById('google-signin-button'),
          {
            theme: 'outline',
            size: 'large',
            width: '100%',
            text: 'signin_with',
            locale: 'pt-BR'
          }
        );
      }
    };

    const handleGoogleResponse = async (response) => {
      try {
        console.log('🔍 Google response received:', response);
        
        // Enviar credential para o backend
        const res = await fetch(`${API_URL}/api/auth/google`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            credential: response.credential
          })
        });

        const data = await res.json();
        console.log('🔍 Backend response:', data);

        if (res.ok) {
          // Salvar token e dados do usuário
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          
          // Atualizar contexto de auth
          login(data.user);
          
          if (onSuccess) onSuccess(data);
        } else {
          console.error('❌ Erro do backend:', data);
          if (onError) onError(data.error || 'Erro na autenticação');
        }
      } catch (error) {
        console.error('❌ Erro na autenticação Google:', error);
        if (onError) onError('Erro de conexão');
      }
    };

    loadGoogleScript();
  }, []);

  return (
    <div className="w-full">
      <div 
        id="google-signin-button" 
        className={`w-full ${disabled ? 'opacity-50 pointer-events-none' : ''}`}
      />
      
      {/* Fallback se o script não carregar */}
      <noscript>
        <div className="text-center text-gray-500 text-sm mt-2">
          JavaScript é necessário para login com Google
        </div>
      </noscript>
    </div>
  );
};

export default GoogleSignIn;