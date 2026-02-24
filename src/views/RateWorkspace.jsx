import { useState } from 'react';
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
import TextField from '@mui/material/TextField';
import TableChartIcon from '@mui/icons-material/TableChart';
import { SYSTEMS, SYS_LABELS, SYS_COLORS, calcRate, fmt } from '../data/data';
import { useApp } from '../context/AppContext';

const SX_MONO = { fontFamily: 'monospace', fontSize: 12 };

function StatCard({ label, value, sub, color }) {
  return (
    <Paper variant="outlined" sx={{ p: 1.25, textAlign: 'center', borderRadius: 2 }}>
      <Typography sx={{ fontSize: 20, fontWeight: 700, color: color || '#1a1a1a', lineHeight: 1.1 }}>{value}</Typography>
      <Typography sx={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.4px', color: '#808285', mt: 0.25 }}>{label}</Typography>
      {sub && <Typography sx={{ fontSize: 10, color: '#a8aaad', mt: 0.25 }}>{sub}</Typography>}
    </Paper>
  );
}

export default function RateWorkspace() {
  const { state, dispatch } = useApp();
  const [localRates, setLocalRates] = useState({});

  const filtered = state.records.filter(r => {
    if (!state.search) return true;
    const q = state.search.toLowerCase();
    return r.cc.includes(q) || r.desc.toLowerCase().includes(q);
  });

  const modCount = state.records.filter(r => r.modified).length;

  const handleRateChange = (idx, sys, value) => {
    const key = `${idx}_${sys}`;
    setLocalRates(prev => ({ ...prev, [key]: value }));
  };

  const handleRateBlur = (idx, sys, value) => {
    const parsed = parseFloat(value);
    if (!isNaN(parsed)) {
      dispatch({ type: 'MODIFY_RECORD', index: idx, patch: { [`${sys.toLowerCase()}_rate`]: parsed } });
    }
  };

  return (
    <Box>
      <Alert severity="info" icon={<TableChartIcon />} sx={{ mb: 2 }}>
        <strong>Nevada — 4 Rating Factors: Factor 1, Factor 2, Factor 3, Factor 4</strong>
        <Typography variant="body2" sx={{ mt: 0.5, fontWeight: 400 }}>
          System rates = NCCI LC × System LCM. Edit proposed rates directly. Scroll right for all systems.
        </Typography>
      </Alert>

      {/* Search + mod count */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
        <TextField
          size="small"
          placeholder="Search class code or description…"
          value={state.search}
          onChange={e => dispatch({ type: 'SET_SEARCH', payload: e.target.value })}
          sx={{ flex: 1, maxWidth: 360, '& .MuiInputBase-input': { fontSize: 13 } }}
        />
        {modCount > 0 && (
          <Typography sx={{ fontSize: 12, color: '#808285', ml: 'auto' }}>{modCount} records modified</Typography>
        )}
      </Box>

      {/* Stats */}
      <Grid container spacing={1.5} sx={{ mb: 1.5 }}>
        <Grid item xs={6} sm={3}><StatCard label="Records"       value={`${filtered.length}/${state.records.length}`} sub="Nevada"                              color="#1B75BB" /></Grid>
        <Grid item xs={6} sm={3}><StatCard label="NCCI Codes"    value={filtered.length}  sub="Unique classes"                       color="#1B75BB" /></Grid>
        <Grid item xs={6} sm={3}><StatCard label="Admin Systems" value="4"                sub="F1 · F2 · F3 · F4"                   color="#1B75BB" /></Grid>
        <Grid item xs={6} sm={3}><StatCard label="Modified"      value={modCount}         sub={modCount ? 'Analyst edits' : 'No changes'} color="#946b0e" /></Grid>
      </Grid>

      <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2, maxHeight: 560 }}>
        <Table size="small" stickyHeader>
          <TableHead>
            {/* System group header row */}
            <TableRow>
              <TableCell colSpan={9} sx={{ bgcolor: '#F2F7F6', border: 0 }} />
              {SYSTEMS.map(sys => (
                <TableCell
                  key={sys} colSpan={3} align="center"
                  sx={{ bgcolor: SYS_COLORS[sys], color: 'white', fontWeight: 700, fontSize: 9, textTransform: 'uppercase', letterSpacing: '.6px', py: '5px' }}
                >
                  {SYS_LABELS[sys]}
                </TableCell>
              ))}
            </TableRow>
            {/* Column header row */}
            <TableRow>
              {[
                { l: '#', a: 'center' }, { l: 'Description' }, { l: 'Lk', a: 'center' }, { l: 'Class' },
                { l: 'Note', a: 'center' }, { l: 'NCCI LC', a: 'right' }, { l: 'ELR', a: 'right' },
                { l: 'D-Ratio', a: 'right' }, { l: 'Per Cap', a: 'center' },
              ].map((c, i) => (
                <TableCell key={i} align={c.a || 'left'}>{c.l}</TableCell>
              ))}
              {SYSTEMS.map(sys => ['CC', 'Rate', 'Min P'].map((h, j) => (
                <TableCell key={`${sys}_${j}`} align={j === 0 ? 'center' : 'right'}>{h}</TableCell>
              )))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map((r, idx) => {
              const realIdx = state.records.indexOf(r);
              return (
                <TableRow
                  key={r.lk}
                  sx={{ bgcolor: r.modified ? '#fef9c3' : undefined, '&:hover': { bgcolor: r.modified ? '#fef9c3' : '#F2F7F6' } }}
                >
                  <TableCell align="center" sx={{ fontSize: 10, color: '#808285' }}>{String(r.it)}</TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: 12, whiteSpace: 'nowrap' }}>{r.desc}</TableCell>
                  <TableCell align="center" sx={{ fontSize: 10, color: '#808285' }}>{r.lk}</TableCell>
                  <TableCell sx={{ ...SX_MONO, fontWeight: 700 }}>{r.cc}</TableCell>
                  <TableCell align="center" sx={{ fontSize: 10 }}>{r.note || ''}</TableCell>
                  <TableCell align="right" sx={SX_MONO}>{fmt(r.ncci, 3)}</TableCell>
                  <TableCell align="right" sx={SX_MONO}>{fmt(r.elr, 3)}</TableCell>
                  <TableCell align="right" sx={SX_MONO}>{fmt(r.dr, 2)}</TableCell>
                  <TableCell align="center" sx={{ ...SX_MONO, fontSize: 10 }}>{r.pc ? String(r.pc) : ''}</TableCell>
                  {SYSTEMS.map(sys => {
                    const sd = r[sys.toLowerCase()];
                    const rate = calcRate(r.ncci, sys, state.factors);
                    const localKey = `${realIdx}_${sys}`;
                    const displayVal = localRates[localKey] !== undefined ? localRates[localKey] : fmt(rate, 3);
                    return [
                      <TableCell key={`${sys}_cc`} align="center" sx={{ ...SX_MONO, fontSize: 10 }}>{sd.cc}</TableCell>,
                      <TableCell key={`${sys}_rate`} align="right" sx={{ px: 0.5 }}>
                        <input
                          type="number"
                          step="0.001"
                          value={displayVal}
                          onChange={e => handleRateChange(realIdx, sys, e.target.value)}
                          onBlur={e => { handleRateBlur(realIdx, sys, e.target.value); dispatch({ type: 'MODIFY_RECORD', index: realIdx, patch: {} }); }}
                          onFocus={e => e.target.select()}
                          style={{
                            width: 66, padding: '3px 5px', border: `1px solid ${r.modified ? '#F6921E' : '#cdd3d2'}`,
                            borderRadius: 4, fontSize: 12, fontFamily: 'monospace', textAlign: 'right',
                            background: r.modified ? '#fef9c3' : '#F2F7F6', outline: 'none',
                          }}
                        />
                      </TableCell>,
                      <TableCell key={`${sys}_mp`} align="right" sx={{ ...SX_MONO, fontSize: 10 }}>{sd.mp}</TableCell>,
                    ];
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography sx={{ fontSize: 10, color: '#a8aaad', mt: 1.5 }}>
        Scroll right for all 4 admin systems. Edit rates directly. Adjust system factors in the Adjust & Factor tab.
      </Typography>
    </Box>
  );
}
