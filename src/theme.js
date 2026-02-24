import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary:    { main: '#1B75BB', light: '#e0f0fc', dark: '#0f4c75' },
    success:    { main: '#37A526', light: '#e6f5e0', dark: '#2a7a1a' },
    warning:    { main: '#F6921E', light: '#fef3d6', dark: '#7c5500' },
    error:      { main: '#b91c1c', light: '#fee2e2' },
    background: { default: '#F2F7F6', paper: '#ffffff' },
    text:       { primary: '#1a1a1a', secondary: '#808285', disabled: '#a8aaad' },
    divider:    '#e0e5e4',
  },
  typography: {
    fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
    fontSize: 13,
    h6:    { fontWeight: 700, fontSize: '16px' },
    body2: { fontSize: '12px' },
    caption: { fontSize: '11px' },
  },
  shape: { borderRadius: 8 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none', fontWeight: 600, borderRadius: 6 },
        sizeSmall: { fontSize: '12px', padding: '4px 10px' },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 700,
          textTransform: 'uppercase',
          fontSize: '10px',
          letterSpacing: '0.4px',
          color: '#808285',
          backgroundColor: '#F2F7F6',
          whiteSpace: 'nowrap',
          padding: '7px 8px',
        },
        body: { fontSize: '12px', padding: '6px 8px' },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 500, borderRadius: 99, fontSize: '12px', height: 24 },
        label: { paddingLeft: 8, paddingRight: 8 },
      },
    },
    MuiPaper: { styleOverrides: { root: { backgroundImage: 'none' } } },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderLeft: '3px solid transparent',
          borderRadius: 0,
          fontSize: '13px',
          fontWeight: 500,
          gap: 8,
          padding: '8px 16px',
          '&.Mui-selected': {
            borderLeftColor: '#1B75BB',
            backgroundColor: '#e0f0fc',
            color: '#1B75BB',
            fontWeight: 600,
          },
          '&.Mui-selected .MuiListItemIcon-root': { color: '#1B75BB' },
          '&.Mui-selected:hover': { backgroundColor: '#d4eaf8' },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: { root: { minWidth: 0, color: '#808285', fontSize: '17px' } },
    },
    MuiAlert: {
      styleOverrides: { root: { fontSize: '13px' } },
    },
  },
});

export default theme;
