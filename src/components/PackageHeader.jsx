import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TagIcon from '@mui/icons-material/Tag';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PublicIcon from '@mui/icons-material/Public';
import CategoryIcon from '@mui/icons-material/Category';
import DescriptionIcon from '@mui/icons-material/Description';
import StatusChip from './StatusChip';
import { useApp } from '../context/AppContext';
import { TASKS, STATUS_PHASE_MAP } from '../data/data';

function MetaItem({ icon: Icon, text }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
      <Icon sx={{ fontSize: 14, color: '#1B75BB' }} />
      <Typography variant="caption" color="text.secondary">{text}</Typography>
    </Box>
  );
}

export default function PackageHeader() {
  const { state } = useApp();
  const t = TASKS[0];
  const modCount = state.records.filter(r => r.modified).length;
  const statusLabel = STATUS_PHASE_MAP[state.phase] || 'Draft';

  return (
    <Paper variant="outlined" sx={{ p: 3, mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderRadius: 2 }}>
      <Box>
        <Typography sx={{ fontWeight: 700, fontSize: 18, mb: 0.5, color: '#1a1a1a' }}>
          Nevada WC Loss Cost Filing — Edition 2026.1
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 0.5 }}>
          <MetaItem icon={TagIcon} text={`Filing: ${t.id}`} />
          <MetaItem icon={CalendarTodayIcon} text={`Effective: ${t.effective}`} />
          <MetaItem icon={PublicIcon} text="State: Nevada" />
          <MetaItem icon={CategoryIcon} text={`Edition: ${t.edition}`} />
          <MetaItem icon={DescriptionIcon} text={`${t.codes} codes · ${t.records} records · 4 admin systems`} />
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1, flexShrink: 0, ml: 2 }}>
        <StatusChip label={statusLabel} />
        {modCount > 0 && (
          <Typography sx={{ fontSize: 10, color: '#a8aaad' }}>{modCount} modified</Typography>
        )}
      </Box>
    </Paper>
  );
}
