import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { LA_IMPACT_ROWS, LA_CLIENTS } from '../../data/data';

const RISK_STYLE = {
  'Low':    { color: '#37A526', bg: '#e6f5e0' },
  'Medium': { color: '#946b0e', bg: '#fef9c3' },
  'High':   { color: '#b91c1c', bg: '#fee2e2' },
  'None':   { color: '#808285', bg: '#f4f4f5' },
};

const RULE_COLOR = {
  'CORPORATE': '#1B75BB',
  'MOODY':     '#7c3aed',
};

const STATS = [
  { label: 'States Affected',   value: '12',    color: '#b91c1c', bg: '#fee2e2' },
  { label: 'Open Claims',       value: '47',    color: '#946b0e', bg: '#fef9c3' },
  { label: 'Clients Affected',  value: '3',     color: '#1B75BB', bg: '#e0f0fc' },
  { label: 'Rate Change',       value: '+0.16%',color: '#37A526', bg: '#e6f5e0' },
];

export default function LAImpactAnalysis() {
  const client = LA_CLIENTS[0];

  const totalClaims = LA_IMPACT_ROWS.reduce((sum, r) => sum + r.claims, 0);
  const affectedRows = LA_IMPACT_ROWS.filter(r => r.direction === 'up');

  return (
    <Box>
      {/* Client bar */}
      <Paper sx={{ p: 2, mb: 2.5, display: 'flex', alignItems: 'center', gap: 3, borderLeft: '3px solid #7c3aed' }}>
        <Box sx={{ flex: 1 }}>
          <Typography sx={{ fontSize: 14, fontWeight: 700 }}>{client.name}</Typography>
          <Typography sx={{ fontSize: 11, color: '#808285' }}>
            Impact Analysis · Moody's Baa Rate Change · 5.51% → 5.67% (+0.16%) · Feb 13, 2026
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button size="small" variant="outlined" disableElevation sx={{ fontSize: 11, py: 0.375 }}>
            Export
          </Button>
          <Button size="small" variant="contained" disableElevation sx={{ fontSize: 11, py: 0.375 }}>
            Submit for Approval
          </Button>
        </Box>
      </Paper>

      {/* Alert banner */}
      <Paper sx={{ p: 1.75, mb: 2.5, display: 'flex', alignItems: 'center', gap: 1.5, bgcolor: '#fff7ed', border: '1px solid #fed7aa', borderLeft: '4px solid #F6921E' }}>
        <WarningAmberIcon sx={{ color: '#F6921E', fontSize: 20, flexShrink: 0 }} />
        <Typography sx={{ fontSize: 12, color: '#92400e' }}>
          <strong>GAFG Auto-Threshold Exceeded.</strong> Change of +0.16% exceeds the ±0.10% auto-approval threshold. Manual review and actuarial sign-off required before rates are updated.
        </Typography>
      </Paper>

      {/* Stat cards */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1.5, mb: 2.5 }}>
        {STATS.map(s => (
          <Paper key={s.label} sx={{ p: 2, textAlign: 'center', borderTop: `3px solid ${s.color}` }}>
            <Typography sx={{ fontSize: 28, fontWeight: 800, lineHeight: 1, color: s.color }}>{s.value}</Typography>
            <Typography sx={{ fontSize: 10, fontWeight: 700, color: '#808285', mt: 0.5, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{s.label}</Typography>
          </Paper>
        ))}
      </Box>

      {/* Rate change detail box */}
      <Paper sx={{ p: 2, mb: 2.5, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
        <Box>
          <Typography sx={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#808285', mb: 0.5 }}>Rate Source</Typography>
          <Typography sx={{ fontSize: 13, fontWeight: 700 }}>Moody's Baa Corporate Bond</Typography>
          <Typography sx={{ fontSize: 11, color: '#808285' }}>Source ID: MOODY · Automated Feed</Typography>
        </Box>
        <Box>
          <Typography sx={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#808285', mb: 0.5 }}>Rate Change</Typography>
          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
            <Typography sx={{ fontSize: 20, fontWeight: 800, color: '#808285', textDecoration: 'line-through' }}>5.510%</Typography>
            <Typography sx={{ fontSize: 12, color: '#808285' }}>→</Typography>
            <Typography sx={{ fontSize: 20, fontWeight: 800, color: '#b91c1c' }}>5.670%</Typography>
          </Box>
          <Typography sx={{ fontSize: 11, color: '#b91c1c', fontWeight: 600 }}>▲ +0.160% (+2.90%)</Typography>
        </Box>
        <Box>
          <Typography sx={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#808285', mb: 0.5 }}>Detection</Typography>
          <Typography sx={{ fontSize: 13, fontWeight: 700 }}>Feb 13, 2026 06:15 EST</Typography>
          <Typography sx={{ fontSize: 11, color: '#808285' }}>Automated feed monitor · Queued for review</Typography>
        </Box>
      </Paper>

      {/* Impact table */}
      <Paper sx={{ overflow: 'hidden' }}>
        {/* Header */}
        <Box sx={{ display: 'flex', bgcolor: '#f8fafb', borderBottom: '2px solid #e0e5e4', px: 2, py: 1 }}>
          {[
            { label: 'State',          w: 60 },
            { label: 'Rule Type',      w: 110 },
            { label: 'Clients',        w: 70 },
            { label: 'Open Claims',    w: 90 },
            { label: 'Direction',      w: 90 },
            { label: 'Est. Change',    w: 100 },
            { label: 'Risk Level',     w: 100 },
          ].map(h => (
            <Box key={h.label} sx={{ width: h.w, minWidth: h.w, flexShrink: 0 }}>
              <Typography sx={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.4px', color: '#808285' }}>
                {h.label}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Rows */}
        {LA_IMPACT_ROWS.map((r, idx) => {
          const riskStyle = RISK_STYLE[r.risk] || RISK_STYLE.None;
          const ruleColor = RULE_COLOR[r.rule] || '#808285';
          const isNoImpact = r.direction === 'none';
          return (
            <Box
              key={r.state}
              sx={{
                display: 'flex', px: 2, py: 1, alignItems: 'center',
                bgcolor: idx % 2 === 0 ? 'white' : '#fafbfc',
                borderBottom: '1px solid #f0f0f0',
                opacity: isNoImpact ? 0.55 : 1,
                '&:hover': { bgcolor: '#f0f7fd' },
              }}
            >
              <Box sx={{ width: 60, minWidth: 60, flexShrink: 0 }}>
                <Typography sx={{ fontSize: 13, fontWeight: 700 }}>{r.state}</Typography>
              </Box>
              <Box sx={{ width: 110, minWidth: 110, flexShrink: 0 }}>
                <Chip
                  label={r.rule}
                  size="small"
                  sx={{ bgcolor: `${ruleColor}18`, color: ruleColor, fontWeight: 700, fontSize: 10, height: 18, '& .MuiChip-label': { px: 0.75 } }}
                />
              </Box>
              <Box sx={{ width: 70, minWidth: 70, flexShrink: 0 }}>
                <Typography sx={{ fontSize: 12, fontVariantNumeric: 'tabular-nums' }}>{r.clients}</Typography>
              </Box>
              <Box sx={{ width: 90, minWidth: 90, flexShrink: 0 }}>
                <Typography sx={{ fontSize: 12, fontVariantNumeric: 'tabular-nums', fontWeight: r.claims > 5 ? 700 : 400, color: r.claims > 5 ? '#946b0e' : '#1a1a1a' }}>
                  {r.claims}
                </Typography>
              </Box>
              <Box sx={{ width: 90, minWidth: 90, flexShrink: 0 }}>
                {isNoImpact
                  ? <Typography sx={{ fontSize: 11, color: '#808285' }}>No impact</Typography>
                  : <Typography sx={{ fontSize: 12, fontWeight: 700, color: '#b91c1c' }}>▲ Increase</Typography>
                }
              </Box>
              <Box sx={{ width: 100, minWidth: 100, flexShrink: 0 }}>
                <Typography sx={{ fontSize: 12, fontWeight: 600, color: isNoImpact ? '#808285' : '#b91c1c', fontVariantNumeric: 'tabular-nums' }}>
                  {r.est}
                </Typography>
              </Box>
              <Box sx={{ width: 100, minWidth: 100, flexShrink: 0 }}>
                <Chip
                  label={r.risk}
                  size="small"
                  sx={{ bgcolor: riskStyle.bg, color: riskStyle.color, fontWeight: 600, fontSize: 10, height: 20, '& .MuiChip-label': { px: 1 } }}
                />
              </Box>
            </Box>
          );
        })}
      </Paper>

      {/* Summary footer */}
      <Paper sx={{ p: 2, mt: 2, display: 'flex', alignItems: 'center', gap: 3, bgcolor: '#f8fafb' }}>
        <Typography sx={{ fontSize: 12, color: '#808285', flex: 1 }}>
          <strong>{affectedRows.length} of {LA_IMPACT_ROWS.length}</strong> jurisdictions show increased interest accrual. Total of <strong>{totalClaims} open claims</strong> will recalculate upon approval. FL cap rule (12%) absorbs the change — no impact.
        </Typography>
        <Button size="small" variant="contained" disableElevation sx={{ fontSize: 11, py: 0.375 }}>
          Submit for Approval
        </Button>
      </Paper>
    </Box>
  );
}
