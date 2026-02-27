'use client';

import { useEffect, useState } from 'react';
import css from './HeaderClient.module.css';
import { BurgerMenu } from '../BurgerMenu/BurgerMenu';
import ModalBurger from '../ModalBurger/ModalBurger';
import Modal from '@/components/Modal/Modal';
import LoginForm from '@/components/Auth/LoginForm';
import RegisterForm from '@/components/Auth/RegisterForm';
import { Navigation } from '../Navigation/Navigation';
import { useAuthStore } from '@/lib/stores/authStore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export const HeaderClient = () => {
  const [isOpen, setIsOpen] = useState(false); 
  const [activeModal, setActiveModal] = useState<'login' | 'register' | null>(null); 
  const { setUser, clearIsAuthenticated } = useAuthStore();
  
const [currentTheme, setCurrentTheme] = useState(() => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('app-theme') || 'green';
  }
  return 'green';
});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          username: firebaseUser.displayName || 'User',
        });
      } else {
        clearIsAuthenticated();
      }
    });

    return () => unsubscribe();
  }, [setUser, clearIsAuthenticated]);
  
  const openBurger = () => setIsOpen(true);
  const closeAll = () => {
    setIsOpen(false);
    setActiveModal(null);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('app-theme') || 'green';
    setCurrentTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const handleThemeChange = (theme: string) => {
    setCurrentTheme(theme);
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('app-theme', theme);
  };

  return (
   <div className={css.clientWrapper}>
      
      <div className={css.themeSwitcher}>
        {['green', 'blue', 'orange'].map((theme) => (
          <button
            key={theme}
            type="button"
            className={`${css.themeBtn} ${css[theme]} ${currentTheme === theme ? css.active : ''} button-reset`}
            onClick={() => handleThemeChange(theme)}
            title={`Switch to ${theme} theme`}
          />
        ))}
      </div>
      
      <div className={css.navWrapper}>
        
        <div className={css.navDesktop}>
          <Navigation 
            variant="header" 
            onLoginClick={() => setActiveModal('login')}
            onRegisterClick={() => setActiveModal('register')}
          />
        </div>

        <div className={css.navTabMob}>
          <button
            type="button"
            className={css.burgerButton}
            onClick={openBurger}
            aria-label="Open menu"
            aria-expanded={isOpen}
          >
            <svg width="32" height="32">
              <use href="/symbol-defs.svg#icon-menu"></use>
            </svg>
          </button>
        </div>
      </div>

      
      {isOpen && (
        <ModalBurger onClose={() => setIsOpen(false)}>
          <BurgerMenu 
            onClose={() => setIsOpen(false)} 
            onLoginClick={() => {
              setIsOpen(false);
              setActiveModal('login');
            }}
            onRegisterClick={() => {
              setIsOpen(false);
              setActiveModal('register');
            }}
          />
        </ModalBurger>
      )}

      
      {activeModal === 'login' && (
        <Modal onClose={closeAll}>
          <LoginForm onSuccess={closeAll} />
        </Modal>
      )}

      
      {activeModal === 'register' && (
        <Modal onClose={closeAll}>
          <RegisterForm onSuccess={closeAll} />
        </Modal>
      )}
    </div>
  );
};