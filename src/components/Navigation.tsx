import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Coffee, Home, Settings, Droplet, BarChart3 } from 'lucide-react';
import { coffeeBean } from '@lucide/lab';
import { Icon } from 'lucide-react';

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
            <Coffee size={24} style={{ marginRight: 8 }} />
            Espresso Dialer
          </Link>
          <ul className="nav-links">
            <li>
              <Link to="/" className={isActive('/')}> 
                <Home size={20} />
              </Link>
            </li>
            <li>
              <Link to="/beans" className={isActive('/beans')}>
                <Icon iconNode={coffeeBean} size={20} />
              </Link>
            </li>
            <li>
              <Link to="/equipment" className={isActive('/equipment')}>
                <Settings size={20} />
              </Link>
            </li>
            <li>
              <Link to="/shots" className={isActive('/shots')}>
                <Coffee size={20} />
              </Link>
            </li>
            <li>
              <Link to="/stats" className={isActive('/stats')}>
                <BarChart3 size={20} />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 