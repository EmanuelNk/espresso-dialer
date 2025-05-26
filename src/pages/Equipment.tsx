import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Grinder, Machine } from '../types';
import { Plus, Settings, Trash2 } from 'lucide-react';

const Equipment: React.FC = () => {
  const { state, dispatch } = useApp();
  const [showGrinderForm, setShowGrinderForm] = useState(false);
  const [showMachineForm, setShowMachineForm] = useState(false);

  const [grinderForm, setGrinderForm] = useState({
    name: '',
    brand: '',
    minGrindSetting: 1.0,
    maxGrindSetting: 10.0,
  });

  const [machineForm, setMachineForm] = useState({
    name: '',
    brand: '',
    type: '',
  });

  const handleAddGrinder = (e: React.FormEvent) => {
    e.preventDefault();
    const newGrinder: Grinder = {
      id: Date.now().toString(),
      ...grinderForm,
    };
    dispatch({ type: 'ADD_GRINDER', payload: newGrinder });
    setGrinderForm({ name: '', brand: '', minGrindSetting: 1.0, maxGrindSetting: 10.0 });
    setShowGrinderForm(false);
  };

  const handleAddMachine = (e: React.FormEvent) => {
    e.preventDefault();
    const newMachine: Machine = {
      id: Date.now().toString(),
      ...machineForm,
    };
    dispatch({ type: 'ADD_MACHINE', payload: newMachine });
    setMachineForm({ name: '', brand: '', type: '' });
    setShowMachineForm(false);
  };

  return (
    <div className="container" style={{ padding: '2rem 20px' }}>
      <h1 style={{ marginBottom: '2rem', color: 'var(--text-primary)' }}>Equipment</h1>
      
      {/* Grinders Section */}
      <section style={{ marginBottom: '3rem' }}>
        <div className="card-header">
          <h2 className="card-title">Grinders</h2>
          <button
            className="btn btn-primary"
            onClick={() => setShowGrinderForm(true)}
          >
            <Plus size={20} />
            Add Grinder
          </button>
        </div>

        {showGrinderForm && (
          <div className="card" style={{ marginBottom: '1rem' }}>
            <form onSubmit={handleAddGrinder}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Add New Grinder</h3>
              <div className="grid grid-2">
                <div className="form-group">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-input"
                    value={grinderForm.name}
                    onChange={(e) => setGrinderForm({ ...grinderForm, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Brand</label>
                  <input
                    type="text"
                    className="form-input"
                    value={grinderForm.brand}
                    onChange={(e) => setGrinderForm({ ...grinderForm, brand: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Minimum Grind Setting</label>
                  <input
                    type="number"
                    className="form-input"
                    value={grinderForm.minGrindSetting}
                    onChange={(e) => setGrinderForm({ ...grinderForm, minGrindSetting: Number(e.target.value) })}
                    step="0.1"
                    min="0"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Maximum Grind Setting</label>
                  <input
                    type="number"
                    className="form-input"
                    value={grinderForm.maxGrindSetting}
                    onChange={(e) => setGrinderForm({ ...grinderForm, maxGrindSetting: Number(e.target.value) })}
                    step="0.1"
                    min="0"
                    required
                  />
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="submit" className="btn btn-primary">
                  Add Grinder
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowGrinderForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="grid grid-3">
          {state.grinders.map((grinder) => (
            <div key={grinder.id} className="card">
              <div className="card-header">
                <h3 className="card-title">{grinder.name}</h3>
                <button
                  className="btn btn-danger"
                  onClick={() => dispatch({ type: 'DELETE_GRINDER', payload: grinder.id })}
                  style={{ padding: '0.5rem' }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                Brand: {grinder.brand}
              </p>
                              <p style={{ color: 'var(--text-secondary)' }}>
                  Grind Range: {grinder.minGrindSetting.toFixed(1)} - {grinder.maxGrindSetting.toFixed(1)}
                </p>
            </div>
          ))}
        </div>

        {state.grinders.length === 0 && !showGrinderForm && (
          <div className="empty-state">
            <Settings size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
            <h3>No grinders registered</h3>
            <p>Add your first grinder to start tracking your espresso shots.</p>
          </div>
        )}
      </section>

      {/* Machines Section */}
      <section>
        <div className="card-header">
          <h2 className="card-title">Espresso Machines</h2>
          <button
            className="btn btn-primary"
            onClick={() => setShowMachineForm(true)}
          >
            <Plus size={20} />
            Add Machine
          </button>
        </div>

        {showMachineForm && (
          <div className="card" style={{ marginBottom: '1rem' }}>
            <form onSubmit={handleAddMachine}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Add New Machine</h3>
              <div className="grid grid-3">
                <div className="form-group">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-input"
                    value={machineForm.name}
                    onChange={(e) => setMachineForm({ ...machineForm, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Brand</label>
                  <input
                    type="text"
                    className="form-input"
                    value={machineForm.brand}
                    onChange={(e) => setMachineForm({ ...machineForm, brand: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Type</label>
                  <select
                    className="form-select"
                    value={machineForm.type}
                    onChange={(e) => setMachineForm({ ...machineForm, type: e.target.value })}
                    required
                  >
                    <option value="">Select type</option>
                    <option value="Manual">Manual</option>
                    <option value="Semi-automatic">Semi-automatic</option>
                    <option value="Automatic">Automatic</option>
                    <option value="Super-automatic">Super-automatic</option>
                  </select>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="submit" className="btn btn-primary">
                  Add Machine
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowMachineForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="grid grid-3">
          {state.machines.map((machine) => (
            <div key={machine.id} className="card">
              <div className="card-header">
                <h3 className="card-title">{machine.name}</h3>
                <button
                  className="btn btn-danger"
                  onClick={() => dispatch({ type: 'DELETE_MACHINE', payload: machine.id })}
                  style={{ padding: '0.5rem' }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                Brand: {machine.brand}
              </p>
              <p style={{ color: 'var(--text-secondary)' }}>
                Type: {machine.type}
              </p>
            </div>
          ))}
        </div>

        {state.machines.length === 0 && !showMachineForm && (
          <div className="empty-state">
            <Settings size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
            <h3>No machines registered</h3>
            <p>Add your first espresso machine to start tracking your shots.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Equipment; 