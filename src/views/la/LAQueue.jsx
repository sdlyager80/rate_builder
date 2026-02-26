import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import { LA_QUEUE_TASKS, LA_CLIENTS } from '../../data/data';

const STATS = [
  { key: 'overdue',  label: 'Overdue',       color: '#b91c1c', bg: '#fee2e2', count: 2 },
  { key: 'today',    label: 'Due Today',      color: '#946b0e', bg: '#fef9c3', count: 2 },
  { key: 'upcoming', label: 'Upcoming',       color: '#1B75BB', bg: '#e0f0fc', count: 2 },
  { key: 'done',     label: 'Completed (7d)', color: '#37A526', bg: '#e6f5e0', count: 14 },
];

const STATUS_CHIP = {
  overdue:   { color: '#b91c1c', bg: '#fee2e2' },
  review:    { color: '#946b0e', bg: '#fef9c3' },
  manual:    { color: '#7c5500', bg: '#fef3d6' },
  automated: { color: '#1B75BB', bg: '#e0f0fc' },
  prestaged: { color: '#1B75BB', bg: '#e0f0fc' },
};

const SECTIONS = [
  { key: 'overdue',  label: '⚠  Overdue',  border: '#b91c1c' },
  { key: 'today',    label: '●  Due Today', border: '#F6921E' },
  { key: 'upcoming', label: '○  Upcoming',  border: '#1B75BB' },
];

export default function LAQueue() {
  const client = LA_CLIENTS[0];

  return (
    <Box>
      {/* Client info bar */}
      <Paper sx={{ p: 2, mb: 2.5, display: 'flex', alignItems: 'center', gap: 3, borderLeft: '3px solid #1B75BB' }}>
        <Box sx={{ flex: 1 }}>
          <Typography sx={{ fontSize: 14, fontWeight: 700 }}>{client.name}</Typography>
          <Typography sx={{ fontSize: 11, color: '#808285' }}>
            {client.states} jurisdictions · {client.rules} active rules · Last refresh: Feb 13, 2026 06:00 EST
          </Typography>
        </Box>
        <Chip label="● Feeds Active" size="small" sx={{ bgcolor: '#e6f5e0', color: '#37A526', fontWeight: 600, fontSize: 11 }} />
      </Paper>

      {/* Stats */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1.5, mb: 2.5 }}>
        {STATS.map(s => (
          <Paper key={s.key} sx={{ p: 2, textAlign: 'center', borderTop: `3px solid ${s.color}`, cursor: 'pointer', transition: 'box-shadow .15s', '&:hover': { boxShadow: `0 4px 16px ${s.color}22` } }}>
            <Typography sx={{ fontSize: 28, fontWeight: 800, lineHeight: 1, color: s.color }}>{s.count}</Typography>
            <Typography sx={{ fontSize: 10, fontWeight: 700, color: '#808285', mt: 0.5, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{s.label}</Typography>
          </Paper>
        ))}
      </Box>

      {/* Task sections */}
      {SECTIONS.map(section => {
        const tasks = LA_QUEUE_TASKS.filter(t => t.priority === section.key);
        if (!tasks.length) return null;
        return (
          <Box key={section.key} sx={{ mb: 2.5 }}>
            <Typography sx={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', color: '#808285', mb: 1 }}>
              {section.label}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
              {tasks.map(task => {
                const chip = STATUS_CHIP[task.statusType] || STATUS_CHIP.automated;
                return (
                  <Paper key={task.id} sx={{ p: 2, display: 'flex', gap: 2, borderLeft: `4px solid ${section.border}`, transition: 'box-shadow .15s', '&:hover': { boxShadow: '0 2px 12px rgba(0,0,0,.08)' } }}>
                    <Box sx={{ fontSize: 22, lineHeight: 1, pt: 0.25, flexShrink: 0 }}>{task.icon}</Box>
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5, flexWrap: 'wrap' }}>
                        <Typography sx={{ fontSize: 13, fontWeight: 700 }}>{task.title}</Typography>
                        <Chip label={task.status} size="small" sx={{ bgcolor: chip.bg, color: chip.color, fontWeight: 600, fontSize: 11, height: 20 }} />
                      </Box>
                      <Typography sx={{ fontSize: 12, color: '#808285', mb: 1, lineHeight: 1.55 }}>{task.desc}</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography sx={{ fontSize: 11, color: '#a8aaad' }}>Due: {task.due}</Typography>
                        {task.actions.map((a, i) => (
                          <Button key={a} size="small" variant={i === 0 ? 'contained' : 'outlined'} disableElevation sx={{ fontSize: 11, py: 0.375 }}>{a}</Button>
                        ))}
                      </Box>
                    </Box>
                  </Paper>
                );
              })}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}
