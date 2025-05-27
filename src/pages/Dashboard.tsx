import React from 'react';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { Coffee, Settings, Plus, BarChart3, Clock, Scale } from 'lucide-react';
import { coffeeBean } from '@lucide/lab';
import { Icon } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { state } = useApp();

  const recentShots = state.shots.slice(-5).reverse();
  
  const getBean = (beanId: string) => state.beans.find(b => b.id === beanId);
  const getGrinder = (grinderId: string) => state.grinders.find(g => g.id === grinderId);
  const getMachine = (machineId: string) => state.machines.find(m => m.id === machineId);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const getRatio = (doseIn: number, yieldOut: number) => {
    return `1:${(yieldOut / doseIn).toFixed(1)}`;
  };

  const getAverageStats = () => {
    if (state.shots.length === 0) return null;
    
    const avgTime = state.shots.reduce((sum, shot) => sum + shot.shotTime, 0) / state.shots.length;
    const avgRatio = state.shots.reduce((sum, shot) => sum + (shot.yieldOut / shot.doseIn), 0) / state.shots.length;
    const avgGrind = state.shots.reduce((sum, shot) => sum + shot.grindSize, 0) / state.shots.length;
    
    return { avgTime, avgRatio, avgGrind };
  };

  const stats = getAverageStats();

  return (
    <div className="container" style={{ padding: '2rem 20px' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          Welcome to Espresso Dialer
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Track your espresso journey and dial in the perfect shot.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="stats-grid" style={{ marginBottom: '2rem' }}>
        <div className="stat-card" style={{ background: 'var(--gold)', color: '#fff' }}>
          <div className="stat-value" style={{ color: '#fff' }}>{state.shots.length}</div>
          <div className="stat-label">Total Shots</div>
        </div>
        <div className="stat-card" style={{ background: 'var(--primary)', color: '#fff' }}>
          <div className="stat-value" style={{ color: '#fff' }}>{state.beans.length}</div>
          <div className="stat-label">Beans Registered</div>
        </div>
        <div className="stat-card" style={{ background: 'var(--secondary)', color: '#fff' }}>
          <div className="stat-value" style={{ color: '#fff' }}>{state.grinders.length}</div>
          <div className="stat-label">Grinders</div>
        </div>
        <div className="stat-card" style={{ background: 'var(--secondary)', color: '#fff' }}>
          <div className="stat-value" style={{ color: '#fff' }}>{state.machines.length}</div>
          <div className="stat-label">Machines</div>
        </div>
      </div>

      {stats && (
        <div className="card" style={{ marginBottom: '2rem' }}>
          <h2 className="card-title" style={{ marginBottom: '1rem' }}>Average Performance</h2>
          <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            <div className="stat-card">
              <div className="stat-value">
                <Clock size={20} style={{ marginRight: '0.5rem' }} />
                {stats.avgTime.toFixed(1)}s
              </div>
              <div className="stat-label">Avg Time</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">
                <Scale size={20} style={{ marginRight: '0.5rem' }} />
                1:{stats.avgRatio.toFixed(1)}
              </div>
              <div className="stat-label">Avg Ratio</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{stats.avgGrind.toFixed(1)}</div>
              <div className="stat-label">Avg Grind</div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-2" style={{ marginBottom: '2rem' }}>
        <div className="card">
          <h2 className="card-title" style={{ marginBottom: '1rem' }}>Quick Actions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Link to="/shots" className="btn btn-primary">
              <Plus size={20} />
              Record New Shot
            </Link>
            <Link to="/beans" className="btn btn-action">
              <Icon iconNode={coffeeBean} size={18} />
              Add Beans
            </Link>
            <Link to="/equipment" className="btn btn-action">
              <Settings size={20} />
              Manage Equipment
            </Link>
            <Link to="/stats" className="btn btn-action">
              <BarChart3 size={20} />
              View Statistics
            </Link>
          </div>
        </div>

        <div className="card">
          <h2 className="card-title" style={{ marginBottom: '1rem' }}>Getting Started</h2>
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            {state.grinders.length === 0 && state.machines.length === 0 && (
              <div>
                <p style={{ marginBottom: '1rem' }}>
                  1. <Link to="/equipment" style={{ color: 'var(--primary-coffee)' }}>
                    Register your equipment
                  </Link> (grinders and machines)
                </p>
                <p style={{ marginBottom: '1rem' }}>
                  2. <Link to="/beans" style={{ color: 'var(--primary-coffee)' }}>
                    Add your coffee beans
                  </Link> with details
                </p>
                <p>
                  3. <Link to="/shots" style={{ color: 'var(--primary-coffee)' }}>
                    Start recording shots
                  </Link> to dial in your espresso
                </p>
              </div>
            )}
            {state.grinders.length > 0 && state.machines.length > 0 && state.beans.length === 0 && (
              <div>
                <p style={{ marginBottom: '1rem' }}>✅ Equipment registered!</p>
                <p style={{ marginBottom: '1rem' }}>
                  Next: <Link to="/beans" style={{ color: 'var(--primary-coffee)' }}>
                    Add your coffee beans
                  </Link>
                </p>
              </div>
            )}
            {state.grinders.length > 0 && state.machines.length > 0 && state.beans.length > 0 && state.shots.length === 0 && (
              <div>
                <p style={{ marginBottom: '1rem' }}>✅ Equipment and beans ready!</p>
                <p>
                  Start: <Link to="/shots" style={{ color: 'var(--primary-coffee)' }}>
                    Record your first shot
                  </Link>
                </p>
              </div>
            )}
            {state.shots.length > 0 && (
              <div>
                <p style={{ marginBottom: '1rem' }}>✅ You're all set!</p>
                <p style={{ marginBottom: '1rem' }}>
                  Keep recording shots and check your{' '}
                  <Link to="/stats" style={{ color: 'var(--primary-coffee)' }}>
                    statistics
                  </Link> to improve your espresso.
                </p>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  Tip: Look for patterns in your time vs grind size charts to find your sweet spot!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      {recentShots.length > 0 && (
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Recent Shots</h2>
            <Link to="/shots" className="btn" style={{ background: 'var(--card-bg-secondary)', color: 'var(--text-primary)', border: 'none' }}>
              View All
            </Link>
          </div>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {recentShots.map((shot) => {
              const bean = getBean(shot.beanId);
              const grinder = getGrinder(shot.grinderId);
              const machine = getMachine(shot.machineId);
              
              return (
                <div key={shot.id} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1rem',
                  backgroundColor: 'var(--card-bg-secondary)',
                  borderRadius: '16px',
                  border: 'none',
                  boxShadow: '0 2px 8px 0 rgba(0,0,0,0.08)'
                }}>
                  <div>
                    <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                      {bean?.roaster} - {bean?.origin}
                    </h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                      {grinder?.name} + {machine?.name} • {formatDate(shot.timestamp)}
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-primary)', fontSize: '0.9rem' }}>
                    <span>Grind: {shot.grindSize.toFixed(1)}</span>
                    <span>Time: {shot.shotTime}s</span>
                    <span>Ratio: {getRatio(shot.doseIn, shot.yieldOut)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Empty State */}
      {state.shots.length === 0 && (
        <div className="empty-state">
          <Coffee size={64} style={{ marginBottom: '1rem', opacity: 0.3 }} />
          <h3>Ready to start your espresso journey?</h3>
          <p>Set up your equipment and beans, then start recording shots to dial in the perfect espresso.</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard; 