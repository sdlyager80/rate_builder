import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
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
import { SYSTEMS, SYS_LABELS, SYS_COLORS, calcRate, fmt, phaseGate } from '../data/data';
import { useApp } from '../context/AppContext';

export default function QAReview() {
  const { state } = useApp();

  if (!phaseGate(state.phase, 'submitted')) {
    return (
      <Alert severity="warning" icon={<HourglassEmptyIcon />} sx={{ fontSize: 13 }}>
        Waiting for analyst submission.
      </Alert>
    );
  }

  return (
    <Box>
      <Alert severity="info" icon={<ScienceIcon />} sx={{ mb: 2, fontSize: 13 }}>
        Read-only view of proposed rates across all 4 admin systems.
      </Alert>

      <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2, maxHeight: 560 }}>
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell colSpan={4} sx={{ bgcolor: '#F2F7F6', border: 0 }} />
              {SYSTEMS.map(sys => (
                <TableCell key={sys} colSpan={2} align="center"
                  sx={{ bgcolor: SYS_COLORS[sys], color: 'white', fontWeight: 700, fontSize: 9, textTransform: 'uppercase', py: '5px' }}>
                  {SYS_LABELS[sys]}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell align="center">#</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Class</TableCell>
              <TableCell align="right">NCCI LC</TableCell>
              {SYSTEMS.map(sys => ['Rate', 'Min P'].map((h, j) => (
                <TableCell key={`${sys}_${j}`} align="right">{h}</TableCell>
              )))}
            </TableRow>
          </TableHead>
          <TableBody>
            {state.records.map(r => (
              <TableRow key={r.lk} hover
                sx={{ bgcolor: r.modified ? '#fef9c3' : undefined }}>
                <TableCell align="center" sx={{ fontSize: 10, color: '#808285' }}>{r.it}</TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: 11, whiteSpace: 'nowrap' }}>{r.desc}</TableCell>
                <TableCell sx={{ fontFamily: 'monospace', fontWeight: 700, fontSize: 12 }}>{r.cc}</TableCell>
                <TableCell align="right" sx={{ fontFamily: 'monospace', fontSize: 12 }}>{fmt(r.ncci, 3)}</TableCell>
                {SYSTEMS.map(sys => [
                  <TableCell key={`${sys}_r`} align="right" sx={{ fontFamily: 'monospace', fontWeight: 600, fontSize: 12 }}>
                    {fmt(calcRate(r.ncci, sys, state.factors), 3)}
                  </TableCell>,
                  <TableCell key={`${sys}_m`} align="right" sx={{ fontFamily: 'monospace', fontSize: 11 }}>
                    {r[sys.toLowerCase()].mp}
                  </TableCell>,
                ])}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
