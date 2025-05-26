import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Grinder, Machine, Bean, Shot } from '../types';

interface AppState {
  grinders: Grinder[];
  machines: Machine[];
  beans: Bean[];
  shots: Shot[];
}

type AppAction =
  | { type: 'ADD_GRINDER'; payload: Grinder }
  | { type: 'ADD_MACHINE'; payload: Machine }
  | { type: 'ADD_BEAN'; payload: Bean }
  | { type: 'ADD_SHOT'; payload: Shot }
  | { type: 'UPDATE_BEAN'; payload: Bean }
  | { type: 'DELETE_GRINDER'; payload: string }
  | { type: 'DELETE_MACHINE'; payload: string }
  | { type: 'DELETE_BEAN'; payload: string };

const initialState: AppState = {
  grinders: [],
  machines: [],
  beans: [],
  shots: [],
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'ADD_GRINDER':
      return { ...state, grinders: [...state.grinders, action.payload] };
    case 'ADD_MACHINE':
      return { ...state, machines: [...state.machines, action.payload] };
    case 'ADD_BEAN':
      return { ...state, beans: [...state.beans, action.payload] };
    case 'ADD_SHOT':
      return { ...state, shots: [...state.shots, action.payload] };
    case 'UPDATE_BEAN':
      return {
        ...state,
        beans: state.beans.map(bean =>
          bean.id === action.payload.id ? action.payload : bean
        ),
      };
    case 'DELETE_GRINDER':
      return {
        ...state,
        grinders: state.grinders.filter(g => g.id !== action.payload),
      };
    case 'DELETE_MACHINE':
      return {
        ...state,
        machines: state.machines.filter(m => m.id !== action.payload),
      };
    case 'DELETE_BEAN':
      return {
        ...state,
        beans: state.beans.filter(b => b.id !== action.payload),
      };
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
} 