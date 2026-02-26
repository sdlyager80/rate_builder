import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { LA_PMI_RULES, LA_CLIENTS } from '../../data/data';

const STATUS_CHIP = {
  'Active':       { color: '#37A526', bg: '#e6f5e0' },
  'Exception':    { color: '#946b0e', bg: '#fef9c3' },
  'Review':       { color: '#946b0e', bg: '#fef9c3' },
  'Rate Overdue': { color: '#b91c1c', bg: '#fee2e2' },
  'Pending Chg':  { color: '#1B75BB', bg: '#e0f0fc' },
  'Silent':       { color: '#808285', bg: '#f4f4f5' },
};

const RATE_TYPE_COLOR = {
  CORPORATE: '#1B75BB',
  SPECIFIED: '#37A526',
  LEGAL:     '#F6921E',
  MOODY:     '#7c3aed',
  USGSCM:    '#0f4c75',
  NJCMF:     '#b91c1c',
  PRIME:     '#946b0e',
  FEDSHORT:  '#37A526',
  COMM90:    '#808285',
};

const COL = {
  state:     { label: 'State',      w: 52  },
  iss:       { label: 'ISS',        w: 44  },
  ins:       { label: 'INS',        w: 44  },
  ben:       { label: 'BEN',        w: 44  },
  grace:     { label: 'Grace Dys',  w: 72  },
  graceFrom: { label: 'Grace From', w: 78  },
  intFrom:   { label: 'Int. From',  w: 72  },
  plusDays:  { label: '+Days',      w: 52  },
  intTo:     { label: 'Int. To',    w: 62  },
  rateType:  { label: 'Rate Type',  w: 90  },
  rate:      { label: 'Rate %',     w: 62  },
  altRate:   { label: 'Alt Rate',   w: 80  },
  altVal:    { label: 'Alt Val',    w: 56  },
  calc:      { label: 'Calc',       w: 72  },
  t2Days:    { label: 'T2 Days',    w: 62  },
  t2Penalty: { label: 'T2 Penalty', w: 120 },
  iic:       { label: 'IIC',        w: 40  },
  status:    { label: 'Status',     w: 104 },
};

function YNChip({ val }) {
  if (!val) return <Typography sx={{ fontSize: 11, color: '#c0c2c5' }}>—</Typography>;
  return (
    <Typography sx={{ fontSize: 11, fontWeight: 700, color: val === 'YES' ? '#37A526' : val === 'NO' ? '#b91c1c' : '#808285' }}>
      {val}
    </Typography>
  );
}

export default function LARateRules() {
  const client = LA_CLIENTS[0];
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [filterRateType, setFilterRateType] = useState('ALL');

  const statuses = ['ALL', ...Array.from(new Set(LA_PMI_RULES.map(r => r.status)))];
  const rateTypes = ['ALL', ...Array.from(new Set(LA_PMI_RULES.map(r => r.rateType).filter(Boolean)))];

  const filtered = LA_PMI_RULES.filter(r => {
    const q = search.toLowerCase();
    const matchSearch = !q || r.state.toLowerCase().includes(q) || (r.rateType || '').toLowerCase().includes(q) || r.status.toLowerCase().includes(q);
    const matchStatus = filterStatus === 'ALL' || r.status === filterStatus;
    const matchType   = filterRateType === 'ALL' || r.rateType === filterRateType;
    return matchSearch && matchStatus && matchType;
  });

  return (
    <Box>
      {/* Client bar */}
      <Paper sx={{ p: 2, mb: 2.5, display: 'flex', alignItems: 'center', gap: 3, borderLeft: '3px solid #1B75BB' }}>
        <Box sx={{ flex: 1 }}>
          <Typography sx={{ fontSize: 14, fontWeight: 700 }}>{client.name}</Typography>
          <Typography sx={{ fontSize: 11, color: '#808285' }}>
            {client.states} jurisdictions · {client.rules} active rules · PMI Interest Calculation Rules
          </Typography>
        </Box>
        <Chip label={`${filtered.length} of ${LA_PMI_RULES.length} rules`} size="small" sx={{ bgcolor: '#e0f0fc', color: '#1B75BB', fontWeight: 600, fontSize: 11 }} />
      </Paper>

      {/* Filters */}
      <Box sx={{ display: 'flex', gap: 1.5, mb: 2 }}>
        <TextField
          size="small"
          placeholder="Search states, rate types…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          InputProps={{
            startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: 16, color: '#808285' }} /></InputAdornment>,
            sx: { fontSize: 12, bgcolor: 'white' },
          }}
          sx={{ width: 220 }}
        />
        <Select
          size="small"
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
          sx={{ fontSize: 12, bgcolor: 'white', minWidth: 140 }}
        >
          {statuses.map(s => <MenuItem key={s} value={s} sx={{ fontSize: 12 }}>{s === 'ALL' ? 'All Statuses' : s}</MenuItem>)}
        </Select>
        <Select
          size="small"
          value={filterRateType}
          onChange={e => setFilterRateType(e.target.value)}
          sx={{ fontSize: 12, bgcolor: 'white', minWidth: 140 }}
        >
          {rateTypes.map(t => <MenuItem key={t} value={t} sx={{ fontSize: 12 }}>{t === 'ALL' ? 'All Rate Types' : t}</MenuItem>)}
        </Select>
      </Box>

      {/* Table */}
      <Paper sx={{ overflow: 'hidden' }}>
        <Box sx={{ overflowX: 'auto' }}>
          {/* Header */}
          <Box sx={{ display: 'flex', bgcolor: '#f8fafb', borderBottom: '2px solid #e0e5e4', px: 1 }}>
            {Object.entries(COL).map(([key, { label, w }]) => (
              <Box key={key} sx={{ width: w, minWidth: w, flexShrink: 0, py: 1, pr: 0.5 }}>
                <Typography sx={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.4px', color: '#808285' }}>
                  {label}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Rows */}
          {filtered.map((r, idx) => {
            const chip = STATUS_CHIP[r.status] || { color: '#808285', bg: '#f4f4f5' };
            const rtColor = RATE_TYPE_COLOR[r.rateType] || '#808285';
            return (
              <Box
                key={r.state}
                sx={{
                  display: 'flex', px: 1, py: 0.75, alignItems: 'center',
                  bgcolor: idx % 2 === 0 ? 'white' : '#fafbfc',
                  borderBottom: '1px solid #f0f0f0',
                  '&:hover': { bgcolor: '#f0f7fd' },
                }}
              >
                {/* State */}
                <Box sx={{ width: COL.state.w, minWidth: COL.state.w, flexShrink: 0, pr: 0.5 }}>
                  <Typography sx={{ fontSize: 12, fontWeight: 700, color: '#1a1a1a' }}>{r.state}</Typography>
                </Box>
                {/* ISS */}
                <Box sx={{ width: COL.iss.w, minWidth: COL.iss.w, flexShrink: 0, pr: 0.5 }}>
                  <YNChip val={r.iss} />
                </Box>
                {/* INS */}
                <Box sx={{ width: COL.ins.w, minWidth: COL.ins.w, flexShrink: 0, pr: 0.5 }}>
                  <YNChip val={r.ins} />
                </Box>
                {/* BEN */}
                <Box sx={{ width: COL.ben.w, minWidth: COL.ben.w, flexShrink: 0, pr: 0.5 }}>
                  <YNChip val={r.ben} />
                </Box>
                {/* Grace Days */}
                <Box sx={{ width: COL.grace.w, minWidth: COL.grace.w, flexShrink: 0, pr: 0.5 }}>
                  <Typography sx={{ fontSize: 11, color: r.grace != null ? '#1a1a1a' : '#c0c2c5' }}>
                    {r.grace != null ? r.grace : '—'}
                  </Typography>
                </Box>
                {/* Grace From */}
                <Box sx={{ width: COL.graceFrom.w, minWidth: COL.graceFrom.w, flexShrink: 0, pr: 0.5 }}>
                  <Typography sx={{ fontSize: 11, color: r.graceFrom ? '#1a1a1a' : '#c0c2c5' }}>
                    {r.graceFrom || '—'}
                  </Typography>
                </Box>
                {/* Int From */}
                <Box sx={{ width: COL.intFrom.w, minWidth: COL.intFrom.w, flexShrink: 0, pr: 0.5 }}>
                  <Typography sx={{ fontSize: 11, color: r.intFrom ? '#1a1a1a' : '#c0c2c5' }}>
                    {r.intFrom || '—'}
                  </Typography>
                </Box>
                {/* +Days */}
                <Box sx={{ width: COL.plusDays.w, minWidth: COL.plusDays.w, flexShrink: 0, pr: 0.5 }}>
                  <Typography sx={{ fontSize: 11, color: r.plusDays != null ? '#1a1a1a' : '#c0c2c5' }}>
                    {r.plusDays != null ? r.plusDays : '—'}
                  </Typography>
                </Box>
                {/* Int To */}
                <Box sx={{ width: COL.intTo.w, minWidth: COL.intTo.w, flexShrink: 0, pr: 0.5 }}>
                  <Typography sx={{ fontSize: 11, color: r.intTo ? '#1a1a1a' : '#c0c2c5' }}>
                    {r.intTo || '—'}
                  </Typography>
                </Box>
                {/* Rate Type */}
                <Box sx={{ width: COL.rateType.w, minWidth: COL.rateType.w, flexShrink: 0, pr: 0.5 }}>
                  {r.rateType
                    ? <Chip label={r.rateType} size="small" sx={{ bgcolor: `${rtColor}18`, color: rtColor, fontWeight: 700, fontSize: 10, height: 18, '& .MuiChip-label': { px: 0.75 } }} />
                    : <Typography sx={{ fontSize: 11, color: '#c0c2c5' }}>—</Typography>
                  }
                </Box>
                {/* Rate */}
                <Box sx={{ width: COL.rate.w, minWidth: COL.rate.w, flexShrink: 0, pr: 0.5 }}>
                  <Typography sx={{ fontSize: 11, color: r.rate != null ? '#1a1a1a' : '#c0c2c5', fontVariantNumeric: 'tabular-nums' }}>
                    {r.rate != null ? `${r.rate.toFixed(3)}%` : '—'}
                  </Typography>
                </Box>
                {/* Alt Rate */}
                <Box sx={{ width: COL.altRate.w, minWidth: COL.altRate.w, flexShrink: 0, pr: 0.5 }}>
                  <Typography sx={{ fontSize: 11, color: r.altRate ? '#1a1a1a' : '#c0c2c5' }}>
                    {r.altRate || '—'}
                  </Typography>
                </Box>
                {/* Alt Val */}
                <Box sx={{ width: COL.altVal.w, minWidth: COL.altVal.w, flexShrink: 0, pr: 0.5 }}>
                  <Typography sx={{ fontSize: 11, color: r.altVal != null ? '#1a1a1a' : '#c0c2c5', fontVariantNumeric: 'tabular-nums' }}>
                    {r.altVal != null ? `${r.altVal.toFixed(3)}%` : '—'}
                  </Typography>
                </Box>
                {/* Calc */}
                <Box sx={{ width: COL.calc.w, minWidth: COL.calc.w, flexShrink: 0, pr: 0.5 }}>
                  <Typography sx={{ fontSize: 11, color: r.calc ? '#1a1a1a' : '#c0c2c5' }}>
                    {r.calc || '—'}
                  </Typography>
                </Box>
                {/* T2 Days */}
                <Box sx={{ width: COL.t2Days.w, minWidth: COL.t2Days.w, flexShrink: 0, pr: 0.5 }}>
                  <Typography sx={{ fontSize: 11, color: r.t2Days != null ? '#F6921E' : '#c0c2c5', fontWeight: r.t2Days != null ? 600 : 400 }}>
                    {r.t2Days != null ? r.t2Days : '—'}
                  </Typography>
                </Box>
                {/* T2 Penalty */}
                <Box sx={{ width: COL.t2Penalty.w, minWidth: COL.t2Penalty.w, flexShrink: 0, pr: 0.5 }}>
                  <Typography sx={{ fontSize: 11, color: r.t2Penalty ? '#b91c1c' : '#c0c2c5', fontWeight: r.t2Penalty ? 600 : 400 }}>
                    {r.t2Penalty || '—'}
                  </Typography>
                </Box>
                {/* IIC */}
                <Box sx={{ width: COL.iic.w, minWidth: COL.iic.w, flexShrink: 0, pr: 0.5 }}>
                  <Typography sx={{ fontSize: 11, fontWeight: 700, color: r.iic === 'Y' ? '#37A526' : '#808285' }}>
                    {r.iic}
                  </Typography>
                </Box>
                {/* Status */}
                <Box sx={{ width: COL.status.w, minWidth: COL.status.w, flexShrink: 0 }}>
                  <Chip
                    label={r.status}
                    size="small"
                    sx={{ bgcolor: chip.bg, color: chip.color, fontWeight: 600, fontSize: 10, height: 20, '& .MuiChip-label': { px: 1 } }}
                  />
                </Box>
              </Box>
            );
          })}

          {filtered.length === 0 && (
            <Box sx={{ py: 4, textAlign: 'center' }}>
              <Typography sx={{ fontSize: 13, color: '#808285' }}>No rules match your filters.</Typography>
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
}
