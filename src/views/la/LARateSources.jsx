import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { LA_RATE_SOURCES, LA_CLIENTS } from '../../data/data';

const SOURCE_TYPE_STYLE = {
  'Automated Feed': { color: '#37A526', bg: '#e6f5e0' },
  'U.S. Treasury':  { color: '#1B75BB', bg: '#e0f0fc' },
  'Federal Reserve':{ color: '#1B75BB', bg: '#e0f0fc' },
  'Manual Entry':   { color: '#946b0e', bg: '#fef9c3' },
};

function TrendArrow({ changed, prev, val }) {
  if (!changed) return <Typography sx={{ fontSize: 11, color: '#37A526', fontWeight: 600 }}>● No Change</Typography>;
  const up = val > prev;
  return (
    <Typography sx={{ fontSize: 11, fontWeight: 700, color: up ? '#b91c1c' : '#37A526' }}>
      {up ? '▲' : '▼'} {up ? '+' : ''}{(val - prev).toFixed(3)}%
    </Typography>
  );
}

export default function LARateSources() {
  const client = LA_CLIENTS[0];
  const changedSources = LA_RATE_SOURCES.filter(s => s.changed);
  const overdueSources = LA_RATE_SOURCES.filter(s => s.overdue);

  return (
    <Box>
      {/* Client bar */}
      <Paper sx={{ p: 2, mb: 2.5, display: 'flex', alignItems: 'center', gap: 3, borderLeft: '3px solid #1B75BB' }}>
        <Box sx={{ flex: 1 }}>
          <Typography sx={{ fontSize: 14, fontWeight: 700 }}>{client.name}</Typography>
          <Typography sx={{ fontSize: 11, color: '#808285' }}>
            {LA_RATE_SOURCES.length} rate sources · Last system refresh: Feb 13, 2026 06:00 EST
          </Typography>
        </Box>
        <Chip label="● Feeds Active" size="small" sx={{ bgcolor: '#e6f5e0', color: '#37A526', fontWeight: 600, fontSize: 11 }} />
      </Paper>

      {/* Alert banner — Moody's changed */}
      {changedSources.map(s => (
        <Paper key={s.id} sx={{ p: 1.75, mb: 2, display: 'flex', alignItems: 'center', gap: 1.5, bgcolor: '#fff7ed', border: '1px solid #fed7aa', borderLeft: '4px solid #F6921E' }}>
          <WarningAmberIcon sx={{ color: '#F6921E', fontSize: 20, flexShrink: 0 }} />
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontSize: 13, fontWeight: 700, color: '#7c2d12' }}>
              Rate Change Detected — {s.label}
            </Typography>
            <Typography sx={{ fontSize: 11, color: '#9a3412' }}>
              {s.prev.toFixed(3)}% → {s.value.toFixed(3)}% (+{(s.value - s.prev).toFixed(3)}%). {s.impacted} state rules affected. Exceeds GAFG auto-threshold — manual review required.
            </Typography>
          </Box>
          <Button size="small" variant="contained" disableElevation sx={{ fontSize: 11, py: 0.375, bgcolor: '#F6921E', '&:hover': { bgcolor: '#d97706' } }}>
            Review Impact
          </Button>
        </Paper>
      ))}

      {/* Overdue banner — NJCMF */}
      {overdueSources.map(s => (
        <Paper key={s.id} sx={{ p: 1.75, mb: 2, display: 'flex', alignItems: 'center', gap: 1.5, bgcolor: '#fef2f2', border: '1px solid #fecaca', borderLeft: '4px solid #b91c1c' }}>
          <ScheduleIcon sx={{ color: '#b91c1c', fontSize: 20, flexShrink: 0 }} />
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontSize: 13, fontWeight: 700, color: '#7f1d1d' }}>
              Verification Overdue — {s.label}
            </Typography>
            <Typography sx={{ fontSize: 11, color: '#991b1b' }}>
              Last confirmed: {s.lastUpdate}. Manual re-confirmation required from state treasury portal.
            </Typography>
          </Box>
          <Button size="small" variant="contained" disableElevation sx={{ fontSize: 11, py: 0.375, bgcolor: '#b91c1c', '&:hover': { bgcolor: '#991b1b' } }}>
            Verify Now
          </Button>
        </Paper>
      ))}

      {/* Rate source cards grid */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1.75 }}>
        {LA_RATE_SOURCES.map(s => {
          const typeStyle = SOURCE_TYPE_STYLE[s.source] || { color: '#808285', bg: '#f4f4f5' };
          return (
            <Paper
              key={s.id}
              sx={{
                p: 2.25,
                borderLeft: `4px solid ${s.changed ? '#F6921E' : s.overdue ? '#b91c1c' : '#e0e5e4'}`,
                transition: 'box-shadow .15s',
                '&:hover': { boxShadow: '0 2px 12px rgba(0,0,0,.08)' },
              }}
            >
              {/* Top row */}
              <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 1.25 }}>
                <Box>
                  <Typography sx={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.6px', textTransform: 'uppercase', color: '#808285' }}>
                    {s.id}
                  </Typography>
                  <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#1a1a1a', mt: 0.25 }}>
                    {s.label}
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                  {s.changed
                    ? <Chip label="Rate Changed" size="small" sx={{ bgcolor: '#fff7ed', color: '#F6921E', fontWeight: 700, fontSize: 10, height: 20, '& .MuiChip-label': { px: 1 } }} />
                    : s.overdue
                    ? <Chip label="Overdue" size="small" sx={{ bgcolor: '#fee2e2', color: '#b91c1c', fontWeight: 700, fontSize: 10, height: 20, '& .MuiChip-label': { px: 1 } }} />
                    : <CheckCircleOutlineIcon sx={{ fontSize: 18, color: '#37A526', mt: 0.25 }} />
                  }
                </Box>
              </Box>

              {/* Rate display */}
              <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 0.75 }}>
                <Typography sx={{ fontSize: 28, fontWeight: 800, color: s.changed ? '#F6921E' : s.overdue ? '#b91c1c' : '#1B75BB', lineHeight: 1 }}>
                  {s.value.toFixed(s.value < 1 ? 3 : 3)}%
                </Typography>
                {s.changed && (
                  <Typography sx={{ fontSize: 12, color: '#808285', textDecoration: 'line-through' }}>
                    {s.prev.toFixed(3)}%
                  </Typography>
                )}
              </Box>

              {/* Change indicator */}
              <Box sx={{ mb: 1.25 }}>
                <TrendArrow changed={s.changed} prev={s.prev} val={s.value} />
              </Box>

              {/* Meta row */}
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pt: 1.25, borderTop: '1px solid #f0f0f0' }}>
                <Box>
                  <Chip
                    label={s.source}
                    size="small"
                    sx={{ bgcolor: typeStyle.bg, color: typeStyle.color, fontWeight: 600, fontSize: 10, height: 18, '& .MuiChip-label': { px: 0.75 } }}
                  />
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography sx={{ fontSize: 10, color: '#a8aaad' }}>
                    {s.impacted} rule{s.impacted !== 1 ? 's' : ''} affected
                  </Typography>
                  <Typography sx={{ fontSize: 10, color: '#a8aaad' }}>
                    {s.lastUpdate}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          );
        })}
      </Box>
    </Box>
  );
}
