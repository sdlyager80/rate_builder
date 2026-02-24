import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import ScienceIcon from '@mui/icons-material/Science';
import StatusChip from '../components/StatusChip';
import { QA_SCENARIOS, phaseGate } from '../data/data';
import { useApp } from '../context/AppContext';

export default function ParallelRating() {
  const { state } = useApp();

  if (!phaseGate(state.phase, 'submitted')) {
    return (
      <Alert severity="warning" icon={<HourglassEmptyIcon />} sx={{ fontSize: 13 }}>
        Package not submitted yet.
      </Alert>
    );
  }

  return (
    <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
        <ScienceIcon sx={{ fontSize: 17, color: '#1B75BB' }} />
        <Typography sx={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.6px', color: '#808285' }}>
          Parallel Rating Scenarios
        </Typography>
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Side-by-side premium comparison using proposed rates vs baseline.
      </Typography>

      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Scenario</TableCell>
              <TableCell>State</TableCell>
              <TableCell>Class</TableCell>
              <TableCell align="right">Exposure</TableCell>
              <TableCell align="right">Baseline</TableCell>
              <TableCell align="right">New Premium</TableCell>
              <TableCell align="right">Delta</TableCell>
              <TableCell align="right">Δ %</TableCell>
              <TableCell>Result</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {QA_SCENARIOS.map((s, i) => (
              <TableRow key={i} hover sx={{ bgcolor: s.ok ? undefined : '#fee2e2' }}>
                <TableCell sx={{ fontWeight: 600, fontSize: 12 }}>{s.name}</TableCell>
                <TableCell sx={{ fontSize: 12 }}>{s.st}</TableCell>
                <TableCell sx={{ fontFamily: 'monospace', fontSize: 12 }}>{s.cc}</TableCell>
                <TableCell align="right" sx={{ fontSize: 12 }}>{s.exp}</TableCell>
                <TableCell align="right" sx={{ fontFamily: 'monospace', fontSize: 12 }}>{s.base}</TableCell>
                <TableCell align="right" sx={{ fontFamily: 'monospace', fontWeight: 600, fontSize: 12 }}>{s.newP}</TableCell>
                <TableCell align="right" sx={{ fontFamily: 'monospace', fontSize: 12 }}>{s.d}</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700, fontSize: 12 }}>{s.dp}</TableCell>
                <TableCell><StatusChip label={s.ok ? 'Pass' : 'Flag'} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
