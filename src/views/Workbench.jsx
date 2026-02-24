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
import Button from '@mui/material/Button';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import DashboardIcon from '@mui/icons-material/Dashboard';
import StatusChip from '../components/StatusChip';
import { TASKS } from '../data/data';
import { useApp } from '../context/AppContext';

function StatCard({ label, value, sub, color }) {
  return (
    <Paper variant="outlined" sx={{ p: 1.5, textAlign: 'center', borderRadius: 2 }}>
      <Typography sx={{ fontSize: 22, fontWeight: 700, color: color || '#1a1a1a', lineHeight: 1.1 }}>{value}</Typography>
      <Typography sx={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.4px', color: '#808285', mt: 0.25 }}>{label}</Typography>
      {sub && <Typography sx={{ fontSize: 10, color: '#a8aaad', mt: 0.25 }}>{sub}</Typography>}
    </Paper>
  );
}

export default function Workbench() {
  const { dispatch } = useApp();

  const active   = TASKS.filter(t => t.tphase !== 'deployed').length;
  const inAppr   = TASKS.filter(t => ['submitted','act_review','comp_review'].includes(t.tphase)).length;
  const pending  = TASKS.filter(t => t.tphase === 'pending_final').length;
  const needsAct = TASKS.filter(t => t.tphase === 'final_received').length;
  const done     = TASKS.filter(t => t.tphase === 'deployed').length;

  const openFile = () => { dispatch({ type: 'SET_STEP', payload: 1 }); };

  return (
    <Box>
      <Alert severity="info" icon={<DashboardIcon />} sx={{ mb: 2, fontSize: 13 }}>
        <strong>Rate Task Workbench</strong>
        <Typography variant="body2" sx={{ mt: 0.5, fontWeight: 400 }}>
          Active and completed rate filing assignments. Click a filing to open the rate workspace.
          Proposed rates cycle through approval, then return when NCCI publishes final rates for comparison and resubmission.
        </Typography>
      </Alert>

      <Grid container spacing={1.5} sx={{ mb: 2 }}>
        <Grid item xs={6} sm={4} md={2.4}><StatCard label="Active Files"    value={active}   sub="In progress"         color="#1B75BB" /></Grid>
        <Grid item xs={6} sm={4} md={2.4}><StatCard label="In Approval"     value={inAppr}   sub="Downstream"          color="#946b0e" /></Grid>
        <Grid item xs={6} sm={4} md={2.4}><StatCard label="Pending Final"   value={pending}  sub="Awaiting NCCI"       color="#7c5500" /></Grid>
        <Grid item xs={6} sm={4} md={2.4}><StatCard label="Needs Action"    value={needsAct} sub="Compare & resubmit"  color="#b91c1c" /></Grid>
        <Grid item xs={6} sm={4} md={2.4}><StatCard label="Completed"       value={done}     sub="Deployed"            color="#37A526" /></Grid>
      </Grid>

      <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Filing ID</TableCell>
              <TableCell>State</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Type</TableCell>
              <TableCell align="right">Codes</TableCell>
              <TableCell align="right">Records</TableCell>
              <TableCell>Effective</TableCell>
              <TableCell>Received</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {TASKS.map((t) => {
              const canOpen = t.tphase === 'workspace' || t.tphase === 'final_received';
              const isActive = t.id === 'RF-2026-0041';
              return (
                <TableRow
                  key={t.id}
                  hover={canOpen}
                  onClick={canOpen ? openFile : undefined}
                  sx={{
                    cursor: canOpen ? 'pointer' : 'default',
                    bgcolor: isActive ? '#fef9c3' : undefined,
                    '&:hover': canOpen ? { bgcolor: '#e0f0fc !important' } : {},
                  }}
                >
                  <TableCell sx={{ fontFamily: 'monospace', fontWeight: 600, fontSize: 12 }}>{t.id}</TableCell>
                  <TableCell><Typography sx={{ fontWeight: 700, fontSize: 12 }}>{t.state}</Typography></TableCell>
                  <TableCell sx={{ fontSize: 12 }}>{t.title}</TableCell>
                  <TableCell><StatusChip label={t.type} /></TableCell>
                  <TableCell align="right" sx={{ fontFamily: 'monospace', fontSize: 12 }}>{t.codes}</TableCell>
                  <TableCell align="right" sx={{ fontFamily: 'monospace', fontSize: 12 }}>{t.records}</TableCell>
                  <TableCell sx={{ fontFamily: 'monospace', fontSize: 11 }}>{t.effective}</TableCell>
                  <TableCell sx={{ fontFamily: 'monospace', fontSize: 11 }}>{t.received}</TableCell>
                  <TableCell><StatusChip label={t.status} /></TableCell>
                  <TableCell>
                    {canOpen ? (
                      <Button size="small" variant="contained" startIcon={<OpenInNewIcon sx={{ fontSize: '14px !important' }} />}
                        onClick={(e) => { e.stopPropagation(); openFile(); }}
                        sx={{ fontSize: 12, py: 0.5, px: 1.25, minWidth: 0 }}>
                        Open
                      </Button>
                    ) : t.tphase === 'pending_final' ? (
                      <Typography sx={{ fontSize: 10, color: '#a8aaad' }}>Awaiting NCCI</Typography>
                    ) : t.tphase === 'deployed' ? (
                      <Typography sx={{ fontSize: 10, color: '#a8aaad' }}>Complete</Typography>
                    ) : (
                      <Typography sx={{ fontSize: 10, color: '#a8aaad' }}>In workflow</Typography>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography sx={{ fontSize: 10, color: '#a8aaad', mt: 1.5 }}>
        Proposed rate files cycle: Analyst → QA → Actuarial → Compliance → CAB. After deployment, when NCCI publishes final rates, the file returns for comparison and resubmission.
      </Typography>
    </Box>
  );
}
