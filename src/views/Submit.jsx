import { useRef } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { PERSONAS } from '../data/data';
import { useApp } from '../context/AppContext';

export default function Submit() {
  const { state, dispatch } = useApp();
  const notesRef = useRef();

  if (state.phase !== 'workspace') {
    return (
      <Alert severity="success" icon={<CheckCircleIcon />} sx={{ fontSize: 13 }}>
        Package submitted. Switch persona to continue reviewing.
      </Alert>
    );
  }

  const handleSubmit = () => {
    const notes = notesRef.current?.value || 'No notes';
    dispatch({ type: 'SET_PHASE', payload: 'submitted' });
    dispatch({
      type: 'ADD_AUDIT', persona: state.persona, personas: PERSONAS,
      action: 'Submitted', obj: 'RF-2026-0041',
      det: `${notes} — ${state.records.length} records, 4 systems`,
    });
    dispatch({ type: 'SHOW_SNACKBAR', message: 'Submitted — switch to QA persona' });
  };

  const modCount = state.records.filter(r => r.modified).length;

  return (
    <Paper variant="outlined" sx={{ p: 3, borderRadius: 2, maxWidth: 600 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
        <SendIcon sx={{ fontSize: 17, color: '#1B75BB' }} />
        <Typography sx={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.6px', color: '#808285' }}>
          Submit for QA Review
        </Typography>
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Lock proposed rates and system factors, then route to QA. {state.records.length} records across 4 admin systems. {modCount} modified.
      </Typography>
      <TextField
        inputRef={notesRef}
        label="Submission Notes"
        multiline
        rows={3}
        placeholder="Context for QA…"
        fullWidth
        size="small"
        sx={{ mb: 2, '& .MuiInputBase-input': { fontSize: 13 } }}
      />
      <Button variant="contained" startIcon={<SendIcon />} onClick={handleSubmit}>
        Submit for Review
      </Button>
    </Paper>
  );
}
