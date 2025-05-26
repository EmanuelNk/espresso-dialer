import React, { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Shot } from '../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter } from 'recharts';
import { BarChart3, TrendingUp, Coffee, Clock } from 'lucide-react';

const Stats: React.FC = () => {
  const { state } = useApp();

  const getBean = (beanId: string) => state.beans.find(b => b.id === beanId);
  const getGrinder = (grinderId: string) => state.grinders.find(g => g.id === grinderId);
  const getMachine = (machineId: string) => state.machines.find(m => m.id === machineId);

  const equipmentCombinations = useMemo(() => {
    const combinations = new Map<string, {
      grinderId: string;
      machineId: string;
      grinderName: string;
      machineName: string;
      shots: Shot[];
    }>();
    
    state.shots.forEach(shot => {
      const key = `${shot.grinderId}-${shot.machineId}`;
      const grinder = getGrinder(shot.grinderId);
      const machine = getMachine(shot.machineId);
      
      if (!combinations.has(key)) {
        combinations.set(key, {
          grinderId: shot.grinderId,
          machineId: shot.machineId,
          grinderName: grinder?.name || 'Unknown',
          machineName: machine?.name || 'Unknown',
          shots: [],
        });
      }
      
      combinations.get(key)!.shots.push(shot);
    });
    
    return Array.from(combinations.values());
  }, [state.shots, state.grinders, state.machines]);

  const getStatsForCombination = (shots: Shot[]) => {
    if (shots.length === 0) return null;
    
    const totalRatio = shots.reduce((sum, shot) => sum + (shot.yieldOut / shot.doseIn), 0);
    const avgTime = shots.reduce((sum, shot) => sum + shot.shotTime, 0) / shots.length;
    const avgGrindSize = shots.reduce((sum, shot) => sum + shot.grindSize, 0) / shots.length;
    const avgYield = shots.reduce((sum, shot) => sum + shot.yieldOut, 0) / shots.length;
    const avgDose = shots.reduce((sum, shot) => sum + shot.doseIn, 0) / shots.length;
    
    return {
      avgRatio: totalRatio / shots.length,
      avgTime,
      avgGrindSize,
      avgYield,
      avgDose,
      shotCount: shots.length,
    };
  };

  const getTimeGrindData = (shots: Shot[]) => {
    return shots.map((shot, index) => ({
      shotNumber: index + 1,
      time: shot.shotTime,
      grindSize: shot.grindSize,
      ratio: shot.yieldOut / shot.doseIn,
    }));
  };

  const getTasteProfileData = (shots: Shot[]) => {
    if (shots.length === 0) return [];
    
    const avgAcidity = shots.reduce((sum, shot) => sum + shot.acidity, 0) / shots.length;
    const avgBitterness = shots.reduce((sum, shot) => sum + shot.bitterness, 0) / shots.length;
    const avgSweetness = shots.reduce((sum, shot) => sum + shot.sweetness, 0) / shots.length;
    const avgFruitiness = shots.reduce((sum, shot) => sum + shot.fruitiness, 0) / shots.length;
    
    return [
      { taste: 'Acidity', value: avgAcidity },
      { taste: 'Bitterness', value: avgBitterness },
      { taste: 'Sweetness', value: avgSweetness },
      { taste: 'Fruitiness', value: avgFruitiness },
    ];
  };

  return (
    <div className="container" style={{ padding: '2rem 20px' }}>
      <h1 style={{ marginBottom: '2rem', color: 'var(--text-primary)' }}>Statistics</h1>

      {equipmentCombinations.length === 0 && (
        <div className="empty-state">
          <BarChart3 size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
          <h3>No data available</h3>
          <p>Record some shots to see statistics and charts.</p>
        </div>
      )}

      {equipmentCombinations.map((combo) => {
        const stats = getStatsForCombination(combo.shots);
        const timeGrindData = getTimeGrindData(combo.shots);
        const tasteData = getTasteProfileData(combo.shots);
        
        if (!stats) return null;

        return (
          <div key={`${combo.grinderId}-${combo.machineId}`} className="card" style={{ marginBottom: '2rem' }}>
            <div className="card-header">
              <h2 className="card-title">
                {combo.grinderName} + {combo.machineName}
              </h2>
              <span style={{ color: 'var(--text-secondary)' }}>
                {stats.shotCount} shots
              </span>
            </div>

            {/* Summary Stats */}
            <div className="stats-grid" style={{ margin: '1rem 0' }}>
              <div className="stat-card">
                <div className="stat-value">1:{stats.avgRatio.toFixed(1)}</div>
                <div className="stat-label">Avg Ratio</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{stats.avgTime.toFixed(1)}s</div>
                <div className="stat-label">Avg Time</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{stats.avgGrindSize.toFixed(1)}</div>
                <div className="stat-label">Avg Grind</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{stats.avgYield.toFixed(1)}g</div>
                <div className="stat-label">Avg Yield</div>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-2" style={{ marginTop: '2rem' }}>
              {/* Time vs Grind Size Chart */}
              <div className="card" style={{ padding: '1rem' }}>
                <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)', fontSize: '1.1rem' }}>
                  <Clock size={20} style={{ marginRight: '0.5rem' }} />
                  Time vs Grind Size
                </h3>
                <ResponsiveContainer width="100%" height={200}>
                  <ScatterChart data={timeGrindData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                    <XAxis 
                      dataKey="grindSize" 
                      stroke="var(--text-secondary)"
                      label={{ value: 'Grind Size', position: 'insideBottom', offset: -5 }}
                    />
                    <YAxis 
                      dataKey="time" 
                      stroke="var(--text-secondary)"
                      label={{ value: 'Time (s)', angle: -90, position: 'insideLeft' }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'var(--card-bg)', 
                        border: '1px solid var(--border-color)',
                        borderRadius: '8px'
                      }}
                    />
                    <Scatter dataKey="time" fill="var(--primary-coffee)" />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>

              {/* Shot Progression */}
              <div className="card" style={{ padding: '1rem' }}>
                <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)', fontSize: '1.1rem' }}>
                  <TrendingUp size={20} style={{ marginRight: '0.5rem' }} />
                  Shot Progression
                </h3>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={timeGrindData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                    <XAxis 
                      dataKey="shotNumber" 
                      stroke="var(--text-secondary)"
                      label={{ value: 'Shot #', position: 'insideBottom', offset: -5 }}
                    />
                    <YAxis stroke="var(--text-secondary)" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'var(--card-bg)', 
                        border: '1px solid var(--border-color)',
                        borderRadius: '8px'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="time" 
                      stroke="var(--primary-coffee)" 
                      strokeWidth={2}
                      name="Time (s)"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="ratio" 
                      stroke="var(--accent-orange)" 
                      strokeWidth={2}
                      name="Ratio"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Taste Profile */}
            <div className="card" style={{ padding: '1rem', marginTop: '1rem' }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)', fontSize: '1.1rem' }}>
                <Coffee size={20} style={{ marginRight: '0.5rem' }} />
                Average Taste Profile
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                {tasteData.map((item) => (
                  <div key={item.taste} style={{ textAlign: 'center' }}>
                    <div style={{ 
                      height: '100px', 
                      display: 'flex', 
                      alignItems: 'end', 
                      justifyContent: 'center',
                      marginBottom: '0.5rem'
                    }}>
                      <div style={{
                        width: '40px',
                        height: `${item.value * 10}%`,
                        backgroundColor: 'var(--primary-coffee)',
                        borderRadius: '4px 4px 0 0',
                        display: 'flex',
                        alignItems: 'start',
                        justifyContent: 'center',
                        paddingTop: '0.25rem',
                        color: 'var(--dark-bg)',
                        fontSize: '0.8rem',
                        fontWeight: 'bold'
                      }}>
                        {item.value.toFixed(1)}
                      </div>
                    </div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                      {item.taste}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Shots */}
            <div style={{ marginTop: '1rem' }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)', fontSize: '1.1rem' }}>
                Recent Shots
              </h3>
              <div style={{ display: 'grid', gap: '0.5rem' }}>
                {combo.shots.slice(-5).reverse().map((shot, index) => {
                  const bean = getBean(shot.beanId);
                  return (
                    <div key={shot.id} style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      padding: '0.5rem',
                      backgroundColor: 'var(--dark-bg)',
                      borderRadius: '8px',
                      fontSize: '0.9rem'
                    }}>
                      <span style={{ color: 'var(--text-secondary)' }}>
                        {bean?.roaster} - {bean?.origin}
                      </span>
                                             <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-primary)' }}>
                         <span>Grind: {shot.grindSize.toFixed(1)}</span>
                         <span>Time: {shot.shotTime}s</span>
                         <span>Ratio: 1:{(shot.yieldOut / shot.doseIn).toFixed(1)}</span>
                       </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Stats; 