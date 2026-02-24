import Chip from '@mui/material/Chip';

const STATUS_MAP = {
  'In Progress':          { bg: '#e0f0fc', color: '#1B75BB' },
  'In Review':            { bg: '#e0f0fc', color: '#1B75BB' },
  'Submitted':            { bg: '#fef9c3', color: '#946b0e' },
  'In QA Review':         { bg: '#fef9c3', color: '#946b0e' },
  'Actuarial Review':     { bg: '#fef3d6', color: '#7c5500' },
  'Compliance Review':    { bg: '#fef3d6', color: '#7c5500' },
  'QA Complete':          { bg: '#e6f5e0', color: '#2a7a1a' },
  'Actuarial Approved':   { bg: '#e6f5e0', color: '#2a7a1a' },
  'Compliance Approved':  { bg: '#e6f5e0', color: '#2a7a1a' },
  'Fully Approved':       { bg: '#e6f5e0', color: '#2a7a1a' },
  'Deployed':             { bg: '#d1fae5', color: '#065f46' },
  'Pass':                 { bg: '#e6f5e0', color: '#2a7a1a' },
  'Flag':                 { bg: '#fee2e2', color: '#b91c1c' },
  'Warning':              { bg: '#fef9c3', color: '#946b0e' },
  'Pending':              { bg: '#fef3d6', color: '#7c5500' },
  'Approved':             { bg: '#e6f5e0', color: '#2a7a1a' },
  'Pending Final Rates':  { bg: '#f0f0f0', color: '#52525b' },
  'Final Rates Received': { bg: '#e0f0fc', color: '#1B75BB' },
  'Proposed':             { bg: '#fef9c3', color: '#946b0e' },
  'Final':                { bg: '#e6f5e0', color: '#2a7a1a' },
};

export default function StatusChip({ label, size = 'small' }) {
  const style = STATUS_MAP[label] || { bg: '#e0f0fc', color: '#1B75BB' };
  return (
    <Chip
      label={label}
      size={size}
      sx={{
        backgroundColor: style.bg,
        color: style.color,
        fontWeight: 500,
        fontSize: '12px',
        height: 22,
        borderRadius: '99px',
        '& .MuiChip-label': { px: 1 },
      }}
    />
  );
}
