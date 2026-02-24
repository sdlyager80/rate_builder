import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import RateReviewIcon from '@mui/icons-material/RateReview';
import TuneIcon from '@mui/icons-material/Tune';
import ChecklistIcon from '@mui/icons-material/Checklist';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { SYSTEMS, SYS_LABELS, PERSONAS, fmt, phaseGate } from '../data/data';
import { useApp } from '../context/AppContext';

const PREREQ = { actuarial: 'qa_done', compliance: 'act_ok' };

const COMPLIANCE_CHECKS = [
  'Class codes match NCCI reference table',
  'Effective date aligns with Nevada DOI',
  'LCM factors within acceptable bounds per system',
  'Cat & terrorism loads match approved schedule',
  'Expense constants and premium multipliers verified',
  'All 4 admin systems factor-complete',
  'Audit trail shows chain of custody',
];

function StatCard({ label, value, sub, color }) {
  return (
    <Paper variant="outlined" sx={{ p: 1.25, textAlign: 'center', borderRadius: 2 }}>
      <Typography sx={{ fontSize: 20, fontWeight: 700, color: color || '#1a1a1a', lineHeight: 1.1 }}>{value}</Typography>
      <Typography sx={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.4px', color: '#808285', mt: 0.25 }}>{label}</Typography>
      {sub && <Typography sx={{ fontSize: 10, color: '#a8aaad', mt: 0.25 }}>{sub}</Typography>}
    </Paper>
  );
}

export default function ApproverReview() {
  const { state } = useApp();
  const role = state.persona;
  const prereq = PREREQ[role];
  const modCount = state.records.filter(r => r.modified).length;

  if (!phaseGate(state.phase, prereq)) {
    return (
      <Alert severity="warning" icon={<HourglassEmptyIcon />} sx={{ fontSize: 13 }}>
        Waiting for prior steps.
      </Alert>
    );
  }

  const p = PERSONAS[role];

  return (
    <Box>
      <Alert severity="info" icon={<RateReviewIcon />} sx={{ mb: 2 }}>
        <strong>Package Review — {p.role}</strong>
        <Typography variant="body2" sx={{ mt: 0.5, fontWeight: 400 }}>
          Review rate changes, system factors, and QA outcomes.
        </Typography>
      </Alert>

      <Grid container spacing={1.5} sx={{ mb: 2 }}>
        <Grid item xs={6} sm={4} md={2.4}><StatCard label="Total Records"  value={state.records.length} sub="Nevada"                              color="#1B75BB" /></Grid>
        <Grid item xs={6} sm={4} md={2.4}><StatCard label="Admin Systems"  value="4"                    sub="F1 · F2 · F3 · F4"                  color="#1B75BB" /></Grid>
        <Grid item xs={6} sm={4} md={2.4}><StatCard label="Validation"     value="0 err / 2 warn"       sub="All clear"                          color="#37A526" /></Grid>
        <Grid item xs={6} sm={4} md={2.4}><StatCard label="QA Result"      value="6/6 pass"             sub="All scenarios"                      color="#37A526" /></Grid>
        <Grid item xs={6} sm={4} md={2.4}><StatCard label="Modified"       value={modCount}             sub="Analyst edits"                      color="#946b0e" /></Grid>
      </Grid>

      {/* Factor summary */}
      <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
          <TuneIcon sx={{ fontSize: 17, color: '#1B75BB' }} />
          <Typography sx={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.6px', color: '#808285' }}>System Factor Summary</Typography>
        </Box>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Factor</TableCell>
                {SYSTEMS.map(sys => <TableCell key={sys} align="right">{SYS_LABELS[sys]}</TableCell>)}
              </TableRow>
            </TableHead>
            <TableBody>
              {[
                ['LCM',        sys => fmt(state.factors[sys].lcm, 2)],
                ['Catastrophe',sys => fmt(state.factors[sys].cat, 4)],
                ['Terrorism',  sys => fmt(state.factors[sys].terr, 4)],
                ['Disc Table', sys => String(state.factors[sys].disc)],
                ['EC',         sys => `$${state.factors[sys].ec}`],
                ['MPM',        sys => `$${state.factors[sys].mpm}`],
                ['MMP',        sys => `$${state.factors[sys].mmp}`],
                ['Sched %',    sys => `${state.factors[sys].sched}%`],
              ].map(([label, fn]) => (
                <TableRow key={label} hover>
                  <TableCell sx={{ fontWeight: 600, fontSize: 12 }}>{label}</TableCell>
                  {SYSTEMS.map(sys => (
                    <TableCell key={sys} align="right" sx={{ fontFamily: 'monospace', fontSize: 12 }}>{fn(sys)}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Compliance checklist */}
      {role === 'compliance' && (
        <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
            <ChecklistIcon sx={{ fontSize: 17, color: '#1B75BB' }} />
            <Typography sx={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.6px', color: '#808285' }}>Compliance Checklist</Typography>
          </Box>
          {COMPLIANCE_CHECKS.map((text, i) => (
            <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1, py: 0.75, fontSize: 13 }}>
              <CheckCircleIcon sx={{ fontSize: 19, color: '#37A526' }} />
              <Typography sx={{ fontSize: 13 }}>{text}</Typography>
            </Box>
          ))}
        </Paper>
      )}
    </Box>
  );
}
