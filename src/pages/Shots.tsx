import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Shot } from '../types';
import { Plus, Clock, Scale, Thermometer } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import Slider from '../components/Slider';
import FlavorBar from '../components/FlavorBar';

const Shots: React.FC = () => {
  const { state, dispatch } = useApp();
  const [searchParams] = useSearchParams();
  const [showForm, setShowForm] = useState(false);

  const [shotForm, setShotForm] = useState({
    beanId: searchParams.get('bean') || '',
    grinderId: '',
    machineId: '',
    grindSize: 5.0,
    shotTime: 25,
    yieldOut: 36,
    doseIn: 18,
    temperature: 93,
    acidity: 5,
    bitterness: 5,
    sweetness: 5,
    fruitiness: 5,
  });

  useEffect(() => {
    if (searchParams.get('bean')) {
      setShotForm(prev => ({ ...prev, beanId: searchParams.get('bean') || '' }));
      setShowForm(true);
    }
  }, [searchParams]);

  const handleAddShot = (e: React.FormEvent) => {
    e.preventDefault();
    const newShot: Shot = {
      id: Date.now().toString(),
      ...shotForm,
      timestamp: new Date(),
    };
    dispatch({ type: 'ADD_SHOT', payload: newShot });
    setShotForm({
      beanId: '',
      grinderId: '',
      machineId: '',
      grindSize: 5.0,
      shotTime: 25,
      yieldOut: 36,
      doseIn: 18,
      temperature: 93,
      acidity: 5,
      bitterness: 5,
      sweetness: 5,
      fruitiness: 5,
    });
    setShowForm(false);
  };

  const getSelectedGrinder = () => {
    return state.grinders.find(g => g.id === shotForm.grinderId);
  };

  const getBean = (beanId: string) => {
    return state.beans.find(b => b.id === beanId);
  };

  const getGrinder = (grinderId: string) => {
    return state.grinders.find(g => g.id === grinderId);
  };

  const getMachine = (machineId: string) => {
    return state.machines.find(m => m.id === machineId);
  };

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

  return (
    <div className="container" style={{ padding: '2rem 20px' }}>
      <div className="card-header">
        <h1 className="card-title">Espresso Shots</h1>
        <button
          className="btn btn-primary"
          onClick={() => setShowForm(true)}
        >
          <Plus size={20} />
          Record Shot
        </button>
      </div>

      {showForm && (
        <div className="card" style={{ marginBottom: '2rem' }}>
          <form onSubmit={handleAddShot}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Record New Shot</h3>
            
            <div className="grid grid-3">
              <div className="form-group">
                <label className="form-label">Beans</label>
                <select
                  className="form-select"
                  value={shotForm.beanId}
                  onChange={(e) => setShotForm({ ...shotForm, beanId: e.target.value })}
                  required
                >
                  <option value="">Select beans</option>
                  {state.beans.map(bean => (
                    <option key={bean.id} value={bean.id}>
                      {bean.roaster} - {bean.origin}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label className="form-label">Grinder</label>
                <select
                  className="form-select"
                  value={shotForm.grinderId}
                  onChange={(e) => setShotForm({ ...shotForm, grinderId: e.target.value })}
                  required
                >
                  <option value="">Select grinder</option>
                  {state.grinders.map(grinder => (
                    <option key={grinder.id} value={grinder.id}>
                      {grinder.name} ({grinder.brand})
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label className="form-label">Machine</label>
                <select
                  className="form-select"
                  value={shotForm.machineId}
                  onChange={(e) => setShotForm({ ...shotForm, machineId: e.target.value })}
                  required
                >
                  <option value="">Select machine</option>
                  {state.machines.map(machine => (
                    <option key={machine.id} value={machine.id}>
                      {machine.name} ({machine.brand})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {getSelectedGrinder() && (
              <Slider
                label="Grind Size"
                value={shotForm.grindSize}
                min={getSelectedGrinder()!.minGrindSetting}
                max={getSelectedGrinder()!.maxGrindSetting}
                step={0.1}
                onChange={(value) => setShotForm({ ...shotForm, grindSize: value })}
              />
            )}

            <div className="grid grid-2">
              <div className="form-group">
                <label className="form-label">Shot Time (seconds)</label>
                <input
                  type="number"
                  className="form-input"
                  value={shotForm.shotTime}
                  onChange={(e) => setShotForm({ ...shotForm, shotTime: Number(e.target.value) })}
                  step="0.1"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Temperature (°C)</label>
                <input
                  type="number"
                  className="form-input"
                  value={shotForm.temperature}
                  onChange={(e) => setShotForm({ ...shotForm, temperature: Number(e.target.value) })}
                  step="0.1"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Dose In (grams)</label>
                <input
                  type="number"
                  className="form-input"
                  value={shotForm.doseIn}
                  onChange={(e) => setShotForm({ ...shotForm, doseIn: Number(e.target.value) })}
                  step="0.1"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Yield Out (grams)</label>
                <input
                  type="number"
                  className="form-input"
                  value={shotForm.yieldOut}
                  onChange={(e) => setShotForm({ ...shotForm, yieldOut: Number(e.target.value) })}
                  step="0.1"
                  required
                />
              </div>
            </div>

            <div style={{ marginTop: '1rem' }}>
              <h4 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>Taste Profile</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <FlavorBar
                  label="Acidity"
                  value={shotForm.acidity}
                  color="var(--gold)"
                  max={10}
                  onChange={(v) => setShotForm({ ...shotForm, acidity: v })}
                />
                <FlavorBar
                  label="Bitterness"
                  value={shotForm.bitterness}
                  color="var(--gold)"
                  max={10}
                  onChange={(v) => setShotForm({ ...shotForm, bitterness: v })}
                />
                <FlavorBar
                  label="Sweetness"
                  value={shotForm.sweetness}
                  color="var(--gold)"
                  max={10}
                  onChange={(v) => setShotForm({ ...shotForm, sweetness: v })}
                />
                <FlavorBar
                  label="Fruitiness"
                  value={shotForm.fruitiness}
                  color="var(--gold)"
                  max={10}
                  onChange={(v) => setShotForm({ ...shotForm, fruitiness: v })}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              <button type="submit" className="btn btn-primary">
                Record Shot
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
        {state.shots.map((shot) => {
          const bean = getBean(shot.beanId);
          const grinder = getGrinder(shot.grinderId);
          const machine = getMachine(shot.machineId);
          
          return (
            <div key={shot.id} className="card">
              <div className="card-header">
                <h3 className="card-title">
                  {bean?.roaster} - {bean?.origin}
                </h3>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  {formatDate(shot.timestamp)}
                </span>
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                  <strong>Equipment:</strong> {grinder?.name} + {machine?.name}
                </p>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                  <strong>Grind:</strong> {shot.grindSize.toFixed(1)}
                </p>
              </div>

              <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', margin: '1rem 0' }}>
                <div className="stat-card" style={{ padding: '1rem' }}>
                  <div className="stat-value" style={{ fontSize: '1.5rem' }}>
                    <Clock size={16} style={{ marginRight: '0.5rem' }} />
                    {shot.shotTime}s
                  </div>
                  <div className="stat-label">Time</div>
                </div>
                
                <div className="stat-card" style={{ padding: '1rem' }}>
                  <div className="stat-value" style={{ fontSize: '1.5rem' }}>
                    <Scale size={16} style={{ marginRight: '0.5rem' }} />
                    {getRatio(shot.doseIn, shot.yieldOut)}
                  </div>
                  <div className="stat-label">Ratio</div>
                </div>
                
                {shot.temperature && (
                  <div className="stat-card" style={{ padding: '1rem' }}>
                    <div className="stat-value" style={{ fontSize: '1.5rem' }}>
                      <Thermometer size={16} style={{ marginRight: '0.5rem' }} />
                      {shot.temperature}°C
                    </div>
                    <div className="stat-label">Temp</div>
                  </div>
                )}
              </div>

              <div style={{ marginTop: '1rem' }}>
                <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem', fontSize: '1rem' }}>
                  Taste Profile
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Acidity:</span>
                    <span style={{ color: 'var(--primary-coffee)' }}>{shot.acidity}/10</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Bitterness:</span>
                    <span style={{ color: 'var(--primary-coffee)' }}>{shot.bitterness}/10</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Sweetness:</span>
                    <span style={{ color: 'var(--primary-coffee)' }}>{shot.sweetness}/10</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Fruitiness:</span>
                    <span style={{ color: 'var(--primary-coffee)' }}>{shot.fruitiness}/10</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {state.shots.length === 0 && !showForm && (
        <div className="empty-state">
          <Plus size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
          <h3>No shots recorded</h3>
          <p>Record your first espresso shot to start tracking your brewing progress.</p>
        </div>
      )}
    </div>
  );
};

export default Shots; 