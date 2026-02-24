import { useRef } from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import UndoIcon from '@mui/icons-material/Undo';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import StatusChip from '../components/StatusChip';
import { PERSONAS, phaseGate } from '../data/data';
import { useApp } from '../context/AppContext';

const NEXT_PHASE = { actuarial: 'act_ok', compliance: 'comp_ok' };
const PREREQ     = { actuarial: 'qa_done', compliance: 'act_ok' };
const NEXT_ROLE  = { actuarial: 'Compliance Officer', compliance: 'Change Advisory Board' };

export default function ApproverDecide() {
  const { state, dispatch } = useApp();
  const role = state.persona;
  const commentRef = useRef();

  if (state.approvals[role]) {
    return (
      <Alert severity="success" icon={<CheckCircleIcon />} sx={{ fontSize: 13 }}>
        {PERSONAS[role].role} approved. Switch to {NEXT_ROLE[role]}.
      </Alert>
    );
  }

  if (!phaseGate(state.phase, PREREQ[role])) {
    return (
      <Alert severity="warning" icon={<HourglassEmptyIcon />} sx={{ fontSize: 13 }}>
        Prior approval required.
      </Alert>
    );
  }

  const p = PERSONAS[role];

  const handleApprove = () => {
    const comment = commentRef.current?.value || 'Approved.';
    const data = { status: 'Approved', ts: new Date().toISOString().slice(0, 16).replace('T', ' '), comment };
    dispatch({ type: 'SET_APPROVAL', role, data });
    dispatch({ type: 'SET_PHASE', payload: NEXT_PHASE[role] });
    dispatch({ type: 'ADD_AUDIT', persona: role, personas: PERSONAS, action: `${p.role} Approved`, obj: 'RF-2026-0041', det: comment });
    dispatch({ type: 'SHOW_SNACKBAR', message: `${p.role} approved` });
  };

  const handleReject = () => {
    dispatch({ type: 'ADD_AUDIT', persona: role, personas: PERSONAS, action: `${p.role} Rejected`, obj: 'RF-2026-0041', det: 'Returned for revision' });
    dispatch({ type: 'SHOW_SNACKBAR', message: 'Rejected — returned' });
  };

  return (
    <Paper variant="outlined" sx={{ p: 3, borderRadius: 2, maxWidth: 600 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <HowToRegIcon sx={{ fontSize: 19, color: '#1B75BB' }} />
          <Typography sx={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.6px', color: '#808285' }}>
            {p.role} Decision
          </Typography>
        </Box>
        <StatusChip label="Pending" />
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Reviewer: {p.name}
      </Typography>

      <TextField
        inputRef={commentRef}
        label="Decision Comments"
        multiline
        rows={3}
        placeholder="Review comments…"
        fullWidth
        size="small"
        sx={{ mb: 2, '& .MuiInputBase-input': { fontSize: 13 } }}
      />

      <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
        <Button variant="contained" color="success" startIcon={<CheckIcon />} onClick={handleApprove}>Approve</Button>
        <Button variant="contained" color="error"   startIcon={<CloseIcon />} onClick={handleReject}>Reject</Button>
        <Button variant="outlined" color="inherit" size="small" startIcon={<UndoIcon />} sx={{ borderColor: '#e0e5e4', color: '#1a1a1a' }}
          onClick={() => dispatch({ type: 'SHOW_SNACKBAR', message: 'Returned for revision' })}>
          Request Revision
        </Button>
      </Box>
    </Paper>
  );
}
