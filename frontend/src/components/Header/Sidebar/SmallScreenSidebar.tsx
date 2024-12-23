import React from 'react';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';
import { arrHeaderMainLinks } from '../../../assets/SecondHeader/HeaderDropDownLinks';
import HeaderAuth from '../AuthBtns/HeaderAuth';
import HeaderUser from '../UserBtns/HeaderUser';

interface SmallScreenSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const SmallScreenSidebar: React.FC<SmallScreenSidebarProps> = ({ isOpen, onClose }) => {
  const userToken = localStorage.getItem("token");

  return (
    <>
      <div 
        className={`${styles.sidebar} ${isOpen ? styles.active : ''}`}
      >
        <div className={styles.sidebarHeader}>
          <button onClick={onClose} className={styles.closeButton}>
            <svg viewBox="0 0 24 24" className="h-8 w-8">
              <path
                fill="currentColor"
                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
              />
            </svg>
          </button>
          {userToken ? <HeaderUser /> : <HeaderAuth />}
        </div>
        <nav className={styles.sidebarNav}>
          {arrHeaderMainLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className={styles.sidebarLink}
              onClick={onClose}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};

export default SmallScreenSidebar;
