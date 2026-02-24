import { useRef } from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import UndoIcon from '@mui/icons-material/Undo';
import { PERSONAS, phaseGate } from '../data/data';
import { useApp } from '../context/AppContext';

export default function QASubmit() {
  const { state, dispatch } = useApp();
  const notesRef = useRef();

  if (phaseGate(state.phase, 'qa_done')) {
    return (
      <Alert severity="success" icon={<CheckCircleIcon />} sx={{ fontSize: 13 }}>
        QA complete. Switch to Actuarial Reviewer persona.
      </Alert>
    );
  }

  if (!phaseGate(state.phase, 'submitted')) {
    return (
      <Alert severity="warning" sx={{ fontSize: 13 }}>Package not submitted.</Alert>
    );
  }

  const handleComplete = () => {
    const notes = notesRef.current?.value || 'QA approved.';
    dispatch({ type: 'SET_PHASE', payload: 'qa_done' });
    dispatch({
      type: 'ADD_AUDIT', persona: state.persona, personas: PERSONAS,
      action: 'QA Complete', obj: 'RF-2026-0041', det: notes,
    });
    dispatch({ type: 'SHOW_SNACKBAR', message: 'QA complete — switch to Actuarial' });
  };

  return (
    <Paper variant="outlined" sx={{ p: 3, borderRadius: 2, maxWidth: 600 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
        <TaskAltIcon sx={{ fontSize: 17, color: '#1B75BB' }} />
        <Typography sx={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.6px', color: '#808285' }}>
          Complete QA Review
        </Typography>
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        6/6 scenarios pass. All system rates validated.
      </Typography>
      <TextField
        inputRef={notesRef}
        label="QA Summary"
        multiline
        rows={3}
        defaultValue="6 parallel scenarios across Factor 1/Factor 2/Factor 3/Factor 4. All pass. Recommend approval."
        fullWidth
        size="small"
        sx={{ mb: 2, '& .MuiInputBase-input': { fontSize: 13 } }}
      />
      <Box sx={{ display: 'flex', gap: 1.5 }}>
        <Button variant="contained" color="success" startIcon={<CheckCircleIcon />} onClick={handleComplete}>
          Mark QA Complete
        </Button>
        <Button variant="contained" color="error" size="small" startIcon={<UndoIcon />}
          onClick={() => dispatch({ type: 'SHOW_SNACKBAR', message: 'Returned to analyst' })}>
          Return to Analyst
        </Button>
      </Box>
    </Paper>
  );
}
