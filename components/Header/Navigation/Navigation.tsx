'use client';

import { useAuthStore } from '@/lib/stores/authStore';
import css from './Navigation.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { logOut } from '@/lib/auth'; 
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';


type NavVariant = 'header' | 'burger';

type NavigationProps = {
  variant?: NavVariant;
  onItemClick?: () => void;
  onLoginClick?: () => void;
  onRegisterClick?: () => void;
};

export const Navigation = ({ variant = 'header', onItemClick, onLoginClick, onRegisterClick }: NavigationProps) => {
  const { user, isAuthenticated } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success("See you later! You have successfully logged out.", {
        className: 'custom-toast',
        icon: '👋',
      });
      router.push('/'); 
      if (onItemClick) onItemClick(); 
    } catch (error) {
      console.error("Error logging out: ", error);
      toast.error("Something went wrong during logout.", {
        className: 'custom-toast',
      });
    }
  };

  return (
    <nav className={css[variant]} aria-label="Main navigation">
      <ul className={css.navigationList}>
        <li>
          <Link href="/" className={`${css.navigationLink} ${pathname === '/' ? css.active : ''}`} onClick={onItemClick}>
            Home
          </Link>
        </li>
        <li>
          <Link href="/psychologists" className={`${css.navigationLink} ${pathname === '/psychologists' ? css.active : ''}`} onClick={onItemClick}>
            Psychologists
          </Link>
        </li>
        
        {isAuthenticated && (
          <li className={css.navigationItem}>
            <Link href="/favorites" className={`${css.navigationLink} ${pathname === '/favorites' ? css.active : ''}`} onClick={onItemClick}>
              Favorites
            </Link>
          </li>
        )}
      </ul>

      <div className={css.authBox}>
        {!isAuthenticated ? (
          <>
            <button
              type='button'
              className={`${css.loginBtn} button`}
              onClick={() => {
                onLoginClick?.();
                onItemClick?.();
              } 
                }
            >
              Log In
            </button>
        
            <button
              type='button'
              className={`${css.registerBtn} button`}
              onClick={() => {
              onRegisterClick?.();
                onItemClick?.();
              }}
            >Registration</button>
          </>
        ) : (
            <div className={css.userMenu}>
              <div className={css.userWrapper}>
                <div className={css.userAvatar}>
                  <svg width="24" height="24">
                    <use href="/symbol-defs.svg#icon-mdi_user" />
                  </svg>
                </div>
                <span className={css.userName}>{user?.username || 'User Name'}</span>
                </div>
              <button
                type='button'
                className={`${css.logoutBtn} button`}
                onClick={handleLogout}>Log Out</button>
          </div>
        )}
      </div>
    </nav>
  );
};