import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import CheckIcon from '@mui/icons-material/Check';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SaveIcon from '@mui/icons-material/Save';
import TuneIcon from '@mui/icons-material/Tune';
import AssessmentIcon from '@mui/icons-material/Assessment';
import BarChartIcon from '@mui/icons-material/BarChart';
import ShieldIcon from '@mui/icons-material/Shield';
import LockIcon from '@mui/icons-material/Lock';
import { SYSTEMS, SYS_LABELS, SYS_COLORS, PERSONAS, calcRate, calcCurRate, fmt, pctChange } from '../data/data';
import { useApp } from '../context/AppContext';

const THRESHOLD_OPTIONS = ['Any Risk', '$5,000+', '$10,000+', '$25,000+'];

function FactorInput({ value, onChange }) {
  return (
    <input
      type="number"
      step="0.001"
      value={value}
      onChange={e => onChange(parseFloat(e.target.value) || 0)}
      style={{ width: 64, padding: '3px 5px', border: '1px solid #cdd3d2', borderRadius: 3, fontSize: 12, textAlign: 'right', fontFamily: 'monospace', background: 'white' }}
    />
  );
}

function FactorRow({ label, curKey, propKey, decimals, simple }) {
  const { state, dispatch } = useApp();
  return (
    <Box sx={{ display: 'contents' }}>
      <Box sx={{ bgcolor: '#F2F7F6', fontWeight: 600, fontSize: 12, px: 1.25, py: 1, borderBottom: '1px solid #e0e5e4', display: 'flex', alignItems: 'center' }}>
        {label}
      </Box>
      {SYSTEMS.map(sys => (
        <Box key={sys} sx={{ px: 0.75, py: 0.5, borderBottom: '1px solid #e0e5e4', display: 'flex', gap: 0.5, alignItems: 'center', justifyContent: 'center' }}>
          {!simple && (
            <>
              <Typography sx={{ fontSize: 11, fontFamily: 'monospace', color: '#808285', minWidth: 50, textAlign: 'right' }}>
                {fmt(state.factors[sys][curKey], decimals)}
              </Typography>
              <Typography sx={{ fontSize: 10, color: '#a8aaad' }}>→</Typography>
            </>
          )}
          {simple && <Box sx={{ minWidth: 50 }} />}
          <FactorInput
            value={state.factors[sys][propKey]}
            onChange={val => dispatch({ type: 'UPDATE_FACTOR', sys, key: propKey, value: val })}
          />
        </Box>
      ))}
    </Box>
  );
}

function ThresholdRow() {
  const { state, dispatch } = useApp();
  return (
    <Box sx={{ display: 'contents' }}>
      <Box sx={{ bgcolor: '#F2F7F6', fontWeight: 600, fontSize: 12, px: 1.25, py: 1, borderBottom: '1px solid #e0e5e4', display: 'flex', alignItems: 'center' }}>
        Schedule Threshold
      </Box>
      {SYSTEMS.map(sys => (
        <Box key={sys} sx={{ px: 0.75, py: 0.5, borderBottom: '1px solid #e0e5e4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Select
            size="small"
            value={state.factors[sys].thresh}
            onChange={e => dispatch({ type: 'UPDATE_FACTOR', sys, key: 'thresh', value: e.target.value })}
            sx={{ fontSize: 11, height: 28, '& .MuiSelect-select': { py: 0.5, px: 0.75 } }}
          >
            {THRESHOLD_OPTIONS.map(o => <MenuItem key={o} value={o} sx={{ fontSize: 12 }}>{o}</MenuItem>)}
          </Select>
        </Box>
      ))}
    </Box>
  );
}

export default function AdjustFactor() {
  const { state, dispatch } = useApp();

  const applyFactors = () => {
    dispatch({ type: 'MARK_ALL_MODIFIED' });
    dispatch({
      type: 'ADD_AUDIT', persona: state.persona, personas: PERSONAS,
      action: 'Factors Applied', obj: 'RF-2026-0041',
      det: `LCM: F1=${state.factors.EPIC.lcm}, F2=${state.factors.EAC.lcm}, F3=${state.factors.ECIC.lcm}, F4=${state.factors.EICN.lcm} | Cat/Terr updated → ${state.records.length} records`,
    });
    dispatch({ type: 'SHOW_SNACKBAR', message: `${state.records.length} records recalculated` });
  };

  const resetFactors = () => {
    dispatch({ type: 'RESET_FACTORS' });
    dispatch({ type: 'SHOW_SNACKBAR', message: 'Reset to filed values' });
  };

  const maxLcm = Math.max(...SYSTEMS.map(s => Math.max(state.factors[s].lcm_cur, state.factors[s].lcm)));

  return (
    <Box>
      <Alert severity="info" icon={<TuneIcon />} sx={{ mb: 2 }}>
        <strong>System Factor Adjustments — Nevada</strong>
        <Typography variant="body2" sx={{ mt: 0.5, fontWeight: 400 }}>
          Configure per-system rating factors. Current = filed/existing. Proposed = what will be applied. Changes recalculate all system rates.
        </Typography>
      </Alert>

      {/* Factor grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '200px repeat(4, 1fr)',
          border: '1px solid #e0e5e4',
          borderRadius: 2,
          overflow: 'hidden',
          mb: 2,
          fontSize: 12,
        }}
      >
        {/* Header */}
        <Box sx={{ bgcolor: '#0f4c75', color: 'white', fontWeight: 700, fontSize: 10, textTransform: 'uppercase', letterSpacing: '.5px', px: 1.25, py: 1.25 }}>
          Rating Factor
        </Box>
        {SYSTEMS.map((sys, i) => (
          <Box key={sys} sx={{ bgcolor: '#0f4c75', color: 'white', fontWeight: 700, fontSize: 10, textTransform: 'uppercase', letterSpacing: '.5px', px: 1.25, py: 1.25, textAlign: 'center', borderTop: `3px solid ${SYS_COLORS[sys]}` }}>
            {SYS_LABELS[sys]}
          </Box>
        ))}

        <FactorRow label="Loss Cost Multiplier (LCM)"    curKey="lcm_cur"  propKey="lcm"  decimals={2} />
        <FactorRow label="Catastrophe Load"              curKey="cat_cur"  propKey="cat"  decimals={4} />
        <FactorRow label="Terrorism Load"                curKey="terr_cur" propKey="terr" decimals={4} />
        <FactorRow label="Discount Table"                propKey="disc"    decimals={0}   simple />
        <FactorRow label="Expense Constant (EC)"         propKey="ec"      decimals={0}   simple />
        <FactorRow label="Min Premium Multiplier (MPM)"  propKey="mpm"     decimals={0}   simple />
        <FactorRow label="Max Minimum Premium (MMP)"     propKey="mmp"     decimals={0}   simple />
        <FactorRow label="Schedule Rating %"             propKey="sched"   decimals={0}   simple />
        <ThresholdRow />
      </Box>

      {/* Action buttons */}
      <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', mb: 2 }}>
        <Button variant="contained" startIcon={<CheckIcon />} onClick={applyFactors}>Apply All Factors</Button>
        <Button variant="outlined"  startIcon={<RestartAltIcon />} onClick={resetFactors}>Reset to Filed</Button>
        <Button variant="outlined" color="inherit" startIcon={<SaveIcon />} sx={{ borderColor: '#e0e5e4', color: '#1a1a1a' }}
          onClick={() => dispatch({ type: 'SHOW_SNACKBAR', message: 'Draft saved' })}>
          Save Draft
        </Button>
      </Box>

      {/* Two-column: impact table + charts */}
      <Grid container spacing={2}>
        {/* Impact preview */}
        <Grid item xs={12} md={7}>
          <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
              <AssessmentIcon sx={{ fontSize: 17, color: '#1B75BB' }} />
              <Typography sx={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.6px', color: '#808285' }}>Impact Preview</Typography>
            </Box>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={2} sx={{ bgcolor: '#F2F7F6', border: 0 }} />
                    {SYSTEMS.map(sys => (
                      <TableCell key={sys} colSpan={2} align="center" sx={{ bgcolor: SYS_COLORS[sys], color: 'white', fontWeight: 700, fontSize: 9, textTransform: 'uppercase', py: '5px' }}>
                        {SYS_LABELS[sys]}
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Class</TableCell>
                    {SYSTEMS.map(sys => ['Current','Proposed'].map((h, j) => (
                      <TableCell key={`${sys}_${j}`} align="right">{h}</TableCell>
                    )))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {state.records.slice(0, 8).map(r => (
                    <TableRow key={r.lk} hover>
                      <TableCell sx={{ fontSize: 10, color: '#808285' }}>{r.it}</TableCell>
                      <TableCell sx={{ fontWeight: 600, fontSize: 11, whiteSpace: 'nowrap' }}>{r.desc}</TableCell>
                      {SYSTEMS.map(sys => {
                        const cur  = calcCurRate(r.ncci, sys, state.factors);
                        const prop = calcRate(r.ncci, sys, state.factors);
                        const d    = pctChange(cur, prop);
                        return [
                          <TableCell key={`${sys}_c`} align="right" sx={{ fontFamily: 'monospace', fontSize: 11 }}>{fmt(cur, 3)}</TableCell>,
                          <TableCell key={`${sys}_p`} align="right" sx={{ fontFamily: 'monospace', fontSize: 11, fontWeight: 600, color: d > 0 ? '#b91c1c' : d < 0 ? '#2a7a1a' : '#1a1a1a' }}>{fmt(prop, 3)}</TableCell>,
                        ];
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Typography sx={{ fontSize: 10, color: '#a8aaad', mt: 1 }}>Showing first 8 records.</Typography>
          </Paper>
        </Grid>

        {/* Charts */}
        <Grid item xs={12} md={5}>
          {/* LCM bar chart */}
          <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
              <BarChartIcon sx={{ fontSize: 17, color: '#1B75BB' }} />
              <Typography sx={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.6px', color: '#808285' }}>LCM by System</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 0.75, height: 120, pt: 1 }}>
              {SYSTEMS.map(sys => {
                const curH  = (state.factors[sys].lcm_cur / maxLcm) * 100;
                const propH = (state.factors[sys].lcm     / maxLcm) * 100;
                return (
                  <Box key={sys} sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.25, height: '100%', justifyContent: 'flex-end' }}>
                    <Box sx={{ display: 'flex', gap: 0.25, alignItems: 'flex-end' }}>
                      <Box sx={{ width: 12, bgcolor: '#e0e5e4', borderRadius: '3px 3px 0 0', height: `${curH}px`, minHeight: 2 }} />
                      <Box sx={{ width: 12, bgcolor: '#1B75BB', borderRadius: '3px 3px 0 0', height: `${propH}px`, minHeight: 2 }} />
                    </Box>
                    <Typography sx={{ fontSize: 9, color: '#808285', textAlign: 'center' }}>{SYS_LABELS[sys]}</Typography>
                  </Box>
                );
              })}
            </Box>
            <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
              {[['#e0e5e4', 'Current'], ['#1B75BB', 'Proposed']].map(([c, l]) => (
                <Box key={l} sx={{ display: 'flex', alignItems: 'center', gap: 0.5, fontSize: 10, color: '#808285' }}>
                  <Box sx={{ width: 9, height: 9, bgcolor: c, borderRadius: 0.5, flexShrink: 0 }} />
                  <Typography sx={{ fontSize: 10, color: '#808285' }}>{l}</Typography>
                </Box>
              ))}
            </Box>
          </Paper>

          {/* Cat & Terr table */}
          <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
              <ShieldIcon sx={{ fontSize: 17, color: '#1B75BB' }} />
              <Typography sx={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.6px', color: '#808285' }}>Cat & Terrorism Loads</Typography>
            </Box>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>System</TableCell>
                    <TableCell align="right">Cat Cur</TableCell>
                    <TableCell align="right">Cat Prop</TableCell>
                    <TableCell align="right">Terr Cur</TableCell>
                    <TableCell align="right">Terr Prop</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {SYSTEMS.map(sys => (
                    <TableRow key={sys} hover>
                      <TableCell sx={{ fontWeight: 600 }}>{SYS_LABELS[sys]}</TableCell>
                      <TableCell align="right" sx={{ fontFamily: 'monospace', fontSize: 11 }}>{fmt(state.factors[sys].cat_cur, 4)}</TableCell>
                      <TableCell align="right" sx={{ fontFamily: 'monospace', fontSize: 11, fontWeight: 600, color: state.factors[sys].cat !== state.factors[sys].cat_cur ? '#b91c1c' : '#1a1a1a' }}>{fmt(state.factors[sys].cat, 4)}</TableCell>
                      <TableCell align="right" sx={{ fontFamily: 'monospace', fontSize: 11 }}>{fmt(state.factors[sys].terr_cur, 4)}</TableCell>
                      <TableCell align="right" sx={{ fontFamily: 'monospace', fontSize: 11, fontWeight: 600, color: state.factors[sys].terr !== state.factors[sys].terr_cur ? '#b91c1c' : '#1a1a1a' }}>{fmt(state.factors[sys].terr, 4)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          <Alert severity="info" icon={<LockIcon />} sx={{ fontSize: 12 }}>
            All factor changes tracked in audit trail.
          </Alert>
        </Grid>
      </Grid>
    </Box>
  );
}
