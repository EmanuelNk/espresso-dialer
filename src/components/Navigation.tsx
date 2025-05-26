import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Coffee } from 'lucide-react';

const Navigation: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? 'nav-link active' : 'nav-link';
  };

  return (
    <nav className="nav">
      <div className="container">
        <div className="nav-content">
          <Link to="/" className="nav-brand">
            <Coffee size={24} />
            Espresso Dialer
          </Link>
          <ul className="nav-links">
            <li>
              <Link to="/" className={isActive('/')}>
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/beans" className={isActive('/beans')}>
                Beans
              </Link>
            </li>
            <li>
              <Link to="/equipment" className={isActive('/equipment')}>
                Equipment
              </Link>
            </li>
            <li>
              <Link to="/shots" className={isActive('/shots')}>
                Shots
              </Link>
            </li>
            <li>
              <Link to="/stats" className={isActive('/stats')}>
                Stats
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 