import { useRef } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import CheckIcon from '@mui/icons-material/Check';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LockIcon from '@mui/icons-material/Lock';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import ChecklistIcon from '@mui/icons-material/Checklist';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import StatusChip from '../components/StatusChip';
import { PERSONAS, phaseGate } from '../data/data';
import { useApp } from '../context/AppContext';

const SMOKE_CHECKS = [
  'Rate tables loaded in all 4 systems',
  'Effective date matches filing',
  'Sample premium calcs validated per system',
  'Rollback packages verified',
  'Monitoring alerts configured',
];

export default function Deploy() {
  const { state, dispatch } = useApp();
  const cabRef = useRef();

  if (!phaseGate(state.phase, 'comp_ok')) {
    return (
      <Alert severity="warning" icon={<LockIcon />} sx={{ fontSize: 13 }}>
        All prior approvals required before deployment.
      </Alert>
    );
  }

  const deployed = state.phase === 'deployed';

  const handleCABApprove = () => {
    const comment = cabRef.current?.value || 'Approved.';
    const data = { status: 'Approved', ts: new Date().toISOString().slice(0, 16).replace('T', ' '), comment };
    dispatch({ type: 'SET_APPROVAL', role: 'cab', data });
    dispatch({ type: 'SET_PHASE', payload: 'cab_ok' });
    dispatch({ type: 'ADD_AUDIT', persona: 'cab', personas: PERSONAS, action: 'CAB Approved', obj: 'RF-2026-0041', det: 'Deployment confirmed.' });
    dispatch({ type: 'SHOW_SNACKBAR', message: 'CAB approved' });
  };

  const handleDeploy = () => {
    dispatch({ type: 'SET_PHASE', payload: 'deployed' });
    dispatch({ type: 'ADD_AUDIT', persona: 'cab', personas: PERSONAS, action: 'Deployed', obj: 'RF-2026-0041', det: `Promoted to Factor 1, Factor 2, Factor 3, Factor 4 — ${state.records.length} classes` });
    dispatch({ type: 'SHOW_SNACKBAR', message: '✓ Promoted to Production' });
  };

  return (
    <Box>
      {deployed && (
        <Alert severity="success" icon={<RocketLaunchIcon />} sx={{ mb: 2 }}>
          <strong>Successfully Deployed</strong>
          <Typography variant="body2" sx={{ mt: 0.5, fontWeight: 400 }}>
            Rates promoted to 4 admin systems. Effective 2026-03-01.
          </Typography>
        </Alert>
      )}

      {/* Approval status */}
      <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
          <HowToRegIcon sx={{ fontSize: 17, color: '#1B75BB' }} />
          <Typography sx={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.6px', color: '#808285' }}>Approval Status</Typography>
        </Box>
        {[['actuarial','Actuarial'], ['compliance','Compliance'], ['cab','CAB']].map(([key, label]) => (
          <Box key={key} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1, borderBottom: '1px solid #e0e5e4' }}>
            <Typography sx={{ fontWeight: 600, fontSize: 13 }}>{label}</Typography>
            {state.approvals[key] ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <StatusChip label="Approved" />
                <Typography sx={{ fontSize: 10, color: '#a8aaad' }}>{state.approvals[key].ts}</Typography>
              </Box>
            ) : (
              <StatusChip label="Pending" />
            )}
          </Box>
        ))}
      </Paper>

      {/* Deployment config */}
      <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
          <RocketLaunchIcon sx={{ fontSize: 17, color: '#1B75BB' }} />
          <Typography sx={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.6px', color: '#808285' }}>Deployment Configuration</Typography>
        </Box>
        {[
          ['Target Systems',  'Factor 1, Factor 2, Factor 3, Factor 4'],
          ['Method',          'Governed Integration Promotion'],
          ['Filing',          'RF-2026-0041 — Ed. 2026.1'],
          ['State',           'Nevada'],
          ['Records',         `${state.records.length} classes × 4 systems = ${state.records.length * 4} rate records`],
          ['Rollback',        'Auto-generated per system'],
        ].map(([label, value]) => (
          <Box key={label} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, py: 1, borderBottom: '1px solid #e0e5e4' }}>
            <Typography sx={{ width: 180, fontWeight: 600, color: '#808285', flexShrink: 0, fontSize: 12 }}>{label}</Typography>
            <Typography sx={{ fontSize: 13 }}>{value}</Typography>
          </Box>
        ))}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, py: 1, borderBottom: '1px solid #e0e5e4' }}>
          <Typography sx={{ width: 180, fontWeight: 600, color: '#808285', flexShrink: 0, fontSize: 12 }}>Scheduled</Typography>
          <input type="datetime-local" defaultValue="2026-03-01T06:00"
            style={{ padding: '8px 14px', border: '1px solid #e0e5e4', borderRadius: 6, fontSize: 13, background: '#F2F7F6' }} />
        </Box>

        {!deployed && (
          <>
            <Divider sx={{ my: 1.5 }} />
            {!state.approvals.cab ? (
              <>
                <TextField inputRef={cabRef} label="CAB Comments" multiline rows={2} placeholder="Deployment window confirmed…" fullWidth size="small"
                  sx={{ mb: 1.5, '& .MuiInputBase-input': { fontSize: 13 } }} />
                <Button variant="contained" color="success" startIcon={<CheckIcon />} onClick={handleCABApprove}>
                  Approve Deployment
                </Button>
              </>
            ) : (
              <Button variant="contained" color="success" size="large" startIcon={<RocketLaunchIcon />} onClick={handleDeploy}
                sx={{ fontSize: 14, py: 1.5, px: 2.5 }}>
                Promote to Production
              </Button>
            )}
          </>
        )}
      </Paper>

      {/* Smoke test */}
      <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
          <ChecklistIcon sx={{ fontSize: 17, color: '#1B75BB' }} />
          <Typography sx={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.6px', color: '#808285' }}>Post-Deploy Smoke Test</Typography>
        </Box>
        {SMOKE_CHECKS.map((text, i) => (
          <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1, py: 0.75 }}>
            {deployed
              ? <CheckCircleIcon sx={{ fontSize: 19, color: '#37A526' }} />
              : <RadioButtonUncheckedIcon sx={{ fontSize: 19, color: '#e0e5e4' }} />
            }
            <Typography sx={{ fontSize: 13 }}>{text}</Typography>
          </Box>
        ))}
      </Paper>
    </Box>
  );
}
