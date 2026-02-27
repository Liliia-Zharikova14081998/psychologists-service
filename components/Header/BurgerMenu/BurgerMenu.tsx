'use client';

import css from './BurgerMenu.module.css';
import { Navigation } from '../Navigation/Navigation';
import Link from 'next/link';

type Props = {
  onClose: () => void;
  onLoginClick?: () => void;
  onRegisterClick?: () => void;
};

export const BurgerMenu = ({ onClose, onLoginClick, onRegisterClick }: Props) => {
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

      <Navigation
        variant="burger"
        onItemClick={onClose}
        onLoginClick={onLoginClick}
        onRegisterClick={onRegisterClick}
      />
    </div>
  );
};