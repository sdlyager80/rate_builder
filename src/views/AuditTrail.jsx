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
import Button from '@mui/material/Button';
import HistoryIcon from '@mui/icons-material/History';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import LockIcon from '@mui/icons-material/Lock';
import { useApp } from '../context/AppContext';

export default function AuditTrail() {
  const { state, dispatch } = useApp();

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <HistoryIcon sx={{ fontSize: 17, color: '#1B75BB' }} />
          <Typography sx={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.6px', color: '#808285' }}>
            Immutable Audit Trail
          </Typography>
        </Box>
        <Button variant="outlined" size="small" startIcon={<FileDownloadIcon />}
          onClick={() => dispatch({ type: 'SHOW_SNACKBAR', message: 'Audit bundle export' })}>
          Export
        </Button>
      </Box>

      <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2, mb: 2 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Timestamp</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Action</TableCell>
              <TableCell>Object</TableCell>
              <TableCell>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.audit.map((e, i) => (
              <TableRow key={i} hover>
                <TableCell sx={{ fontFamily: 'monospace', whiteSpace: 'nowrap', fontSize: 11 }}>{e.ts}</TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: 12 }}>{e.user}</TableCell>
                <TableCell sx={{ fontSize: 11, color: '#808285' }}>{e.role}</TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: 12 }}>{e.action}</TableCell>
                <TableCell sx={{ fontFamily: 'monospace', fontSize: 11 }}>{e.obj}</TableCell>
                <TableCell sx={{ fontSize: 12 }}>{e.det}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Alert severity="info" icon={<LockIcon />} sx={{ fontSize: 12 }}>
        All events are immutable and time-stamped. Supports SOX, DOI, and internal audit requirements.
      </Alert>
    </Box>
  );
}
