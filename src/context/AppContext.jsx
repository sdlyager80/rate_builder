import { createContext, useContext, useReducer } from 'react';
import { RECORDS, INITIAL_FACTORS, INITIAL_AUDIT } from '../data/data';

const AppContext = createContext(null);

const initialState = {
  useCase:   'wc',
  persona:   'analyst',
  step:      0,
  phase:     'workspace',
  search:    '',
  records:   RECORDS.map(r => ({ ...r, modified: false })),
  factors:   JSON.parse(JSON.stringify(INITIAL_FACTORS)),
  audit:     [...INITIAL_AUDIT],
  approvals: { actuarial: null, compliance: null, cab: null },
  snackbar:  null,
};

function ts() {
  return new Date().toISOString().slice(0, 16).replace('T', ' ');
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_USE_CASE':
      return {
        ...state,
        useCase: action.payload,
        persona: action.payload === 'la' ? 'la_analyst' : 'analyst',
        step: 0,
      };

    case 'SET_PERSONA':
      return { ...state, persona: action.payload, step: 0 };

    case 'SET_STEP':
      return { ...state, step: action.payload };

    case 'SET_PHASE':
      return { ...state, phase: action.payload };

    case 'SET_SEARCH':
      return { ...state, search: action.payload };

    case 'MODIFY_RECORD': {
      const records = state.records.map((r, i) =>
        i === action.index ? { ...r, ...action.patch, modified: true } : r
      );
      return { ...state, records };
    }

    case 'MARK_ALL_MODIFIED': {
      const records = state.records.map(r => ({ ...r, modified: true }));
      return { ...state, records };
    }

    case 'UPDATE_FACTOR': {
      const factors = { ...state.factors };
      factors[action.sys] = { ...factors[action.sys], [action.key]: action.value };
      return { ...state, factors };
    }

    case 'RESET_FACTORS': {
      const factors = JSON.parse(JSON.stringify(INITIAL_FACTORS));
      const records = state.records.map(r => ({ ...r, modified: false }));
      return { ...state, factors, records };
    }

    case 'ADD_AUDIT': {
      const { persona, personas } = action;
      const p = personas[persona || state.persona];
      const entry = {
        ts: ts(),
        user: p.name,
        role: p.role,
        action: action.action,
        obj: action.obj,
        det: action.det,
      };
      return { ...state, audit: [entry, ...state.audit] };
    }

    case 'SET_APPROVAL': {
      return {
        ...state,
        approvals: { ...state.approvals, [action.role]: action.data },
      };
    }

    case 'SHOW_SNACKBAR':
      return { ...state, snackbar: action.message };

    case 'HIDE_SNACKBAR':
      return { ...state, snackbar: null };

    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
