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
    roastType: '',
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
    setBeanForm({ roaster: '', origin: '', roastType: '', roastLevel: '', notes: '' });
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
            <div className="grid grid-2">
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
                <label className="form-label">Roast Type</label>
                <select
                  className="form-select"
                  value={beanForm.roastType}
                  onChange={(e) => setBeanForm({ ...beanForm, roastType: e.target.value })}
                  required
                >
                  <option value="">Select roast type</option>
                  <option value="Single Origin">Single Origin</option>
                  <option value="Blend">Blend</option>
                  <option value="Decaf">Decaf</option>
                </select>
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

      <div className="grid grid-2">
        {state.beans.map((bean) => {
          const grinder = getGrinderForBean(bean.id);
          return (
            <div key={bean.id} className="card">
              <div className="card-header">
                <h3 className="card-title">{bean.roaster}</h3>
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
                  <strong>Origin:</strong> {bean.origin}
                </p>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                  <strong>Type:</strong> {bean.roastType}
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