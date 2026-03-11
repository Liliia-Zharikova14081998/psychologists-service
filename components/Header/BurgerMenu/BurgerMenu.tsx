'use client';

import css from './BurgerMenu.module.css';
import { Navigation } from '../Navigation/Navigation';
import Link from 'next/link';

type Props = {
  onClose: () => void;
  onLoginClick?: () => void;
  onRegisterClick?: () => void;
  currentTheme: string; 
  onThemeChange: (theme: string) => void;
};

export const BurgerMenu = ({ onClose, onLoginClick, onRegisterClick, currentTheme, onThemeChange }: Props) => {
  return (
    <div className={`${css.menu} container`}>
      <div className={css.top}>
        <Link href="/" className={css.logo} onClick={onClose}>
          psychologists<span className={css.logoDot} onClick={onClose}>.</span><span className={css.logoServices}>services</span>
        </Link>
        <button onClick={onClose} className={`${css.closeMenuBurger} button`}>
          <svg className={css.closeIcon} width="32" height="32" aria-hidden="true">
            <use href="/symbol-defs.svg#icon-x" />
          </svg>
        </button>
      </div>

        <div className={css.themeSwitcher}>
        {['green', 'blue', 'orange'].map((theme) => (
          <button
            key={theme}
            type="button"
            className={`${css.themeBtn} ${css[theme]} ${currentTheme === theme ? css.active : ''} button-reset`}
            onClick={() => onThemeChange(theme)}
            title={`Switch to ${theme} theme`}
          />
        ))}
      </div>

      <Navigation
        variant="burger"
        onItemClick={onClose}
        onLoginClick={onLoginClick}
        onRegisterClick={onRegisterClick}
      />

    
    </div>
  );
};