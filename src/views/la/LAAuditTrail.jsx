import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import { LA_AUDIT, LA_CLIENTS } from '../../data/data';

const ACTION_STYLE = {
  'Rate Change Detected': { color: '#b91c1c', bg: '#fee2e2' },
  'Impact Analysis Run':  { color: '#7c3aed', bg: '#f3e8ff' },
  'Queue Item Opened':    { color: '#1B75BB', bg: '#e0f0fc' },
  'Verification Overdue': { color: '#b91c1c', bg: '#fee2e2' },
  'Rate Entry Request':   { color: '#946b0e', bg: '#fef9c3' },
  'Rule Pre-Staged':      { color: '#37A526', bg: '#e6f5e0' },
};

const ROLE_COLOR = {
  'Feed Monitor': '#7c3aed',
  'Rate Analyst': '#1B75BB',
};

const USER_INI = {
  'System':        { ini: 'SY', color: '#808285' },
  'Rachel Torres': { ini: 'RT', color: '#1B75BB' },
};

export default function LAAuditTrail() {
  const client = LA_CLIENTS[0];

  return (
    <Box>
      {/* Client bar */}
      <Paper sx={{ p: 2, mb: 2.5, display: 'flex', alignItems: 'center', gap: 3, borderLeft: '3px solid #1B75BB' }}>
        <Box sx={{ flex: 1 }}>
          <Typography sx={{ fontSize: 14, fontWeight: 700 }}>{client.name}</Typography>
          <Typography sx={{ fontSize: 11, color: '#808285' }}>
            Audit Trail · Life & Annuity Rate Management · {LA_AUDIT.length} entries
          </Typography>
        </Box>
        <Chip label="Feb 2026" size="small" sx={{ bgcolor: '#e0f0fc', color: '#1B75BB', fontWeight: 600, fontSize: 11 }} />
      </Paper>

      {/* Table */}
      <Paper sx={{ overflow: 'hidden' }}>
        {/* Header */}
        <Box sx={{ display: 'flex', bgcolor: '#f8fafb', borderBottom: '2px solid #e0e5e4', px: 2, py: 1, gap: 2 }}>
          {[
            { label: 'Timestamp',  w: 140 },
            { label: 'User',       w: 180 },
            { label: 'Action',     w: 175 },
            { label: 'Object',     w: 100 },
            { label: 'Detail',     flex: true },
          ].map(h => (
            <Box key={h.label} sx={h.flex ? { flex: 1 } : { width: h.w, minWidth: h.w, flexShrink: 0 }}>
              <Typography sx={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.4px', color: '#808285' }}>
                {h.label}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Rows */}
        {LA_AUDIT.map((entry, idx) => {
          const actionStyle = ACTION_STYLE[entry.action] || { color: '#808285', bg: '#f4f4f5' };
          const roleColor = ROLE_COLOR[entry.role] || '#808285';
          const userMeta = USER_INI[entry.user] || { ini: entry.user.slice(0, 2).toUpperCase(), color: '#808285' };

          return (
            <Box
              key={idx}
              sx={{
                display: 'flex', px: 2, py: 1.25, gap: 2, alignItems: 'flex-start',
                bgcolor: idx % 2 === 0 ? 'white' : '#fafbfc',
                borderBottom: '1px solid #f0f0f0',
                '&:hover': { bgcolor: '#f0f7fd' },
              }}
            >
              {/* Timestamp */}
              <Box sx={{ width: 140, minWidth: 140, flexShrink: 0 }}>
                <Typography sx={{ fontSize: 11, fontWeight: 600, color: '#1a1a1a', fontVariantNumeric: 'tabular-nums' }}>
                  {entry.ts.split(' ')[0]}
                </Typography>
                <Typography sx={{ fontSize: 11, color: '#a8aaad', fontVariantNumeric: 'tabular-nums' }}>
                  {entry.ts.split(' ')[1]} EST
                </Typography>
              </Box>

              {/* User */}
              <Box sx={{ width: 180, minWidth: 180, flexShrink: 0, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Avatar sx={{ width: 26, height: 26, bgcolor: userMeta.color, fontSize: 10, fontWeight: 700, flexShrink: 0 }}>
                  {userMeta.ini}
                </Avatar>
                <Box>
                  <Typography sx={{ fontSize: 12, fontWeight: 600, color: '#1a1a1a', lineHeight: 1.2 }}>{entry.user}</Typography>
                  <Typography sx={{ fontSize: 10, color: roleColor, fontWeight: 600 }}>{entry.role}</Typography>
                </Box>
              </Box>

              {/* Action */}
              <Box sx={{ width: 175, minWidth: 175, flexShrink: 0 }}>
                <Chip
                  label={entry.action}
                  size="small"
                  sx={{
                    bgcolor: actionStyle.bg,
                    color: actionStyle.color,
                    fontWeight: 600,
                    fontSize: 10,
                    height: 20,
                    '& .MuiChip-label': { px: 1 },
                  }}
                />
              </Box>

              {/* Object */}
              <Box sx={{ width: 100, minWidth: 100, flexShrink: 0 }}>
                <Typography sx={{ fontSize: 11, fontWeight: 700, color: '#1B75BB', fontFamily: 'monospace' }}>
                  {entry.obj}
                </Typography>
              </Box>

              {/* Detail */}
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ fontSize: 12, color: '#4b5563', lineHeight: 1.55 }}>
                  {entry.det}
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Paper>
    </Box>
  );
}
