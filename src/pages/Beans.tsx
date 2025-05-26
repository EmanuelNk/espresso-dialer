import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Bean } from '../types';
import { Plus, Coffee, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Slider from '../components/Slider';

const Beans: React.FC = () => {
  const { state, dispatch } = useApp();
  const [showForm, setShowForm] = useState(false);


  const [beanForm, setBeanForm] = useState({
    roaster: '',
    origin: '',
    processType: '',
    roastDate: '',
    roastLevel: '',
    notes: '',
  });

  const handleAddBean = (e: React.FormEvent) => {
    e.preventDefault();
    const newBean: Bean = {
      id: Date.now().toString(),
      ...beanForm,
    };
    dispatch({ type: 'ADD_BEAN', payload: newBean });
    setBeanForm({ roaster: '', origin: '', processType: '', roastDate: '', roastLevel: '', notes: '' });
    setShowForm(false);
  };

  const handleGrindSettingChange = (beanId: string, grinderId: string, grindSetting: number) => {
    const bean = state.beans.find(b => b.id === beanId);
    if (bean) {
      const updatedBean = { ...bean, grindSetting };
      dispatch({ type: 'UPDATE_BEAN', payload: updatedBean });
    }
  };

  const getGrinderForBean = (beanId: string) => {
    // For simplicity, we'll use the first grinder if available
    return state.grinders[0] || null;
  };

  const getDaysFromRoast = (roastDate: string) => {
    const roast = new Date(roastDate);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - roast.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="container" style={{ padding: '2rem 20px' }}>
      <div className="card-header">
        <h1 className="card-title">Coffee Beans</h1>
        <button
          className="btn btn-primary"
          onClick={() => setShowForm(true)}
        >
          <Plus size={20} />
          Add Beans
        </button>
      </div>

      {showForm && (
        <div className="card" style={{ marginBottom: '2rem' }}>
          <form onSubmit={handleAddBean}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Add New Beans</h3>
            <div className="grid grid-3">
              <div className="form-group">
                <label className="form-label">Roaster</label>
                <input
                  type="text"
                  className="form-input"
                  value={beanForm.roaster}
                  onChange={(e) => setBeanForm({ ...beanForm, roaster: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Origin</label>
                <input
                  type="text"
                  className="form-input"
                  value={beanForm.origin}
                  onChange={(e) => setBeanForm({ ...beanForm, origin: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Process Type</label>
                <select
                  className="form-select"
                  value={beanForm.processType}
                  onChange={(e) => setBeanForm({ ...beanForm, processType: e.target.value })}
                  required
                >
                  <option value="">Select process type</option>
                  <option value="Washed">Washed</option>
                  <option value="Natural">Natural</option>
                  <option value="Honey">Honey</option>
                  <option value="Anaerobic">Anaerobic</option>
                  <option value="Semi-washed">Semi-washed</option>
                  <option value="Wet-hulled">Wet-hulled</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Roast Date</label>
                <input
                  type="date"
                  className="form-input"
                  value={beanForm.roastDate}
                  onChange={(e) => setBeanForm({ ...beanForm, roastDate: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Roast Level</label>
                <select
                  className="form-select"
                  value={beanForm.roastLevel}
                  onChange={(e) => setBeanForm({ ...beanForm, roastLevel: e.target.value })}
                  required
                >
                  <option value="">Select roast level</option>
                  <option value="Light">Light</option>
                  <option value="Medium-Light">Medium-Light</option>
                  <option value="Medium">Medium</option>
                  <option value="Medium-Dark">Medium-Dark</option>
                  <option value="Dark">Dark</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Notes</label>
              <textarea
                className="form-textarea"
                value={beanForm.notes}
                onChange={(e) => setBeanForm({ ...beanForm, notes: e.target.value })}
                placeholder="Tasting notes, processing method, etc."
              />
            </div>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <button type="submit" className="btn btn-primary">
                Add Beans
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Group beans by roaster */}
      {Object.entries(
        state.beans.reduce((acc, bean) => {
          if (!acc[bean.roaster]) {
            acc[bean.roaster] = [];
          }
          acc[bean.roaster].push(bean);
          return acc;
        }, {} as Record<string, typeof state.beans>)
      ).map(([roaster, beans]) => (
        <div key={roaster} style={{ marginBottom: '2rem' }}>
          <h2 style={{ 
            color: 'var(--primary-coffee)', 
            marginBottom: '1rem',
            fontSize: '1.5rem',
            borderBottom: '2px solid var(--border-color)',
            paddingBottom: '0.5rem'
          }}>
            {roaster}
          </h2>
          <div className="grid grid-2">
            {beans.map((bean) => {
          const grinder = getGrinderForBean(bean.id);
          return (
            <div key={bean.id} className="card">
              <div className="card-header">
                <h3 className="card-title">{bean.roaster} - {bean.origin}</h3>
                <button
                  className="btn btn-danger"
                  onClick={() => dispatch({ type: 'DELETE_BEAN', payload: bean.id })}
                  style={{ padding: '0.5rem' }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                  <strong>Process:</strong> {bean.processType}
                </p>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                  <strong>Roast Date:</strong> {new Date(bean.roastDate).toLocaleDateString()} 
                  <span style={{ 
                    marginLeft: '0.5rem', 
                    padding: '0.25rem 0.5rem', 
                    backgroundColor: getDaysFromRoast(bean.roastDate) <= 14 ? 'var(--success)' : getDaysFromRoast(bean.roastDate) <= 30 ? 'var(--warning)' : 'var(--error)',
                    color: 'white',
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                    fontWeight: 'bold'
                  }}>
                    {getDaysFromRoast(bean.roastDate)} days
                  </span>
                </p>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                  <strong>Roast Level:</strong> {bean.roastLevel}
                </p>
                {bean.notes && (
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                    <strong>Notes:</strong> {bean.notes}
                  </p>
                )}
              </div>

              {grinder && (
                <div style={{ marginBottom: '1rem' }}>
                  <Slider
                    label={`Grind Setting (${grinder.name})`}
                    value={bean.grindSetting || grinder.minGrindSetting}
                    min={grinder.minGrindSetting}
                    max={grinder.maxGrindSetting}
                    step={0.1}
                    onChange={(value) => handleGrindSettingChange(bean.id, grinder.id, value)}
                  />
                </div>
              )}

              <div style={{ marginTop: '1rem' }}>
                <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  Registered Equipment
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {state.grinders.length > 0 && (
                    <div>
                      <strong style={{ color: 'var(--text-secondary)' }}>Grinders:</strong>
                      <ul style={{ margin: '0.5rem 0', paddingLeft: '1rem' }}>
                        {state.grinders.map(grinder => (
                          <li key={grinder.id} style={{ color: 'var(--text-secondary)' }}>
                            {grinder.name} ({grinder.brand})
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {state.machines.length > 0 && (
                    <div>
                      <strong style={{ color: 'var(--text-secondary)' }}>Machines:</strong>
                      <ul style={{ margin: '0.5rem 0', paddingLeft: '1rem' }}>
                        {state.machines.map(machine => (
                          <li key={machine.id} style={{ color: 'var(--text-secondary)' }}>
                            {machine.name} ({machine.brand})
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                
                {(state.grinders.length === 0 || state.machines.length === 0) && (
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                    <Link to="/equipment" style={{ color: 'var(--primary-coffee)' }}>
                      Register equipment
                    </Link> to start tracking shots with these beans.
                  </p>
                )}
              </div>

              <Link
                to={`/shots?bean=${bean.id}`}
                className="btn btn-primary"
                style={{ marginTop: '1rem', width: '100%', justifyContent: 'center' }}
              >
                <Coffee size={16} />
                Record Shot
              </Link>
            </div>
          );
        })}
          </div>
        </div>
      ))}

      {state.beans.length === 0 && !showForm && (
        <div className="empty-state">
          <Coffee size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
          <h3>No beans registered</h3>
          <p>Add your first bag of coffee beans to start dialing in your espresso.</p>
        </div>
      )}
    </div>
  );
};

export default Beans; 