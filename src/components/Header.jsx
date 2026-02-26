import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { PERSONAS } from '../data/data';
import { useApp } from '../context/AppContext';

const BLOOM_LOGO = (
  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style={{ width: 36, height: 36 }}>
    <path d="M100 16 C90 16,68 38,68 62 C68 78,78 90,100 100 C122 90,132 78,132 62 C132 38,110 16,100 16Z" fill="#00ADEE"/>
    <path d="M184 100 C184 90,162 68,138 68 C122 68,110 78,100 100 C110 122,122 132,138 132 C162 132,184 110,184 100Z" fill="#37A526"/>
    <path d="M100 184 C110 184,132 162,132 138 C132 122,122 110,100 100 C78 110,68 122,68 138 C68 162,90 184,100 184Z" fill="#8BC53F"/>
    <path d="M16 100 C16 110,38 132,62 132 C78 132,90 122,100 100 C90 78,78 68,62 68 C38 68,16 90,16 100Z" fill="#1B75BB"/>
    <path d="M156 20 C148 20,126 36,118 56 C112 70,114 84,100 100 C116 100,130 96,144 88 C160 78,170 54,168 42 C166 30,160 20,156 20Z" fill="#E8DE23"/>
    <path d="M44 180 C52 180,74 164,82 144 C88 130,86 116,100 100 C84 100,70 104,56 112 C40 122,30 146,32 158 C34 170,40 180,44 180Z" fill="#F6921E"/>
    <circle cx="100" cy="100" r="10" fill="#E8DE23"/>
  </svg>
);

export default function Header() {
  const { state, dispatch } = useApp();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const persona = PERSONAS[state.persona];

  const handlePersonaSwitch = (key) => {
    dispatch({ type: 'SET_PERSONA', payload: key });
    dispatch({ type: 'SHOW_SNACKBAR', message: `Switched to ${PERSONAS[key].name}` });
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{ bgcolor: 'white', borderBottom: '1px solid #e0e5e4', zIndex: 1200, height: 60 }}
    >
      <Toolbar sx={{ minHeight: '60px !important', px: 3, gap: 2 }}>
        {/* Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexShrink: 0 }}>
          {BLOOM_LOGO}
          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: '5px' }}>
            <Typography sx={{ fontWeight: 700, fontSize: 20, color: '#333' }}>Bloom</Typography>
            <Typography sx={{ fontWeight: 400, fontSize: 20, color: '#555' }}>Insurance</Typography>
          </Box>
        </Box>

        {/* Use-case switcher */}
        <Box sx={{ mx: 'auto', display: 'flex', alignItems: 'center', p: '4px', bgcolor: '#F2F7F6', borderRadius: '10px', border: '1px solid #e0e5e4', gap: '2px' }}>
          {[{ key: 'wc', label: "Workers' Comp" }, { key: 'la', label: 'Life & Annuity' }].map(uc => {
            const active = state.useCase === uc.key;
            return (
              <Box
                key={uc.key}
                onClick={() => dispatch({ type: 'SET_USE_CASE', payload: uc.key })}
                sx={{
                  px: 2, py: 0.625, borderRadius: '7px', cursor: 'pointer',
                  fontSize: 12, fontWeight: active ? 700 : 500,
                  bgcolor: active ? '#fff' : 'transparent',
                  color: active ? '#1B75BB' : '#808285',
                  boxShadow: active ? '0 1px 4px rgba(0,0,0,.12)' : 'none',
                  transition: 'all .15s',
                  userSelect: 'none',
                  '&:hover': { color: active ? '#1B75BB' : '#1a1a1a' },
                }}
              >
                {uc.label}
              </Box>
            );
          })}
        </Box>

        {/* Right controls */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Tooltip title="Notifications">
            <IconButton size="small" sx={{ border: '1px solid #e0e5e4', borderRadius: '6px', color: '#808285' }}
              onClick={() => dispatch({ type: 'SHOW_SNACKBAR', message: 'Notifications' })}>
              <NotificationsIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Settings">
            <IconButton size="small" sx={{ border: '1px solid #e0e5e4', borderRadius: '6px', color: '#808285' }}
              onClick={() => dispatch({ type: 'SHOW_SNACKBAR', message: 'Settings' })}>
              <SettingsIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Tooltip>

          {/* Persona switcher */}
          <Box
            onClick={(e) => setAnchorEl(e.currentTarget)}
            sx={{
              display: 'flex', alignItems: 'center', gap: 1,
              cursor: 'pointer', px: 1.5, py: 0.5, borderRadius: '99px',
              border: open ? '1px solid #1B75BB' : '1px solid transparent',
              bgcolor: open ? '#F2F7F6' : 'transparent',
              boxShadow: open ? '0 0 0 3px rgba(27,117,187,.12)' : 'none',
              '&:hover': { bgcolor: '#F2F7F6', borderColor: '#e0e5e4' },
              transition: 'all .15s',
            }}
          >
            <Avatar sx={{ width: 32, height: 32, bgcolor: persona.color, fontSize: 11, fontWeight: 700 }}>
              {persona.ini}
            </Avatar>
            <Box sx={{ display: { xs: 'none', sm: 'flex' }, flexDirection: 'column', lineHeight: 1.2 }}>
              <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a' }}>{persona.name}</Typography>
              <Typography sx={{ fontSize: 10, fontWeight: 500, color: '#a8aaad' }}>{persona.role}</Typography>
            </Box>
            <KeyboardArrowDownIcon sx={{ fontSize: 16, color: '#a8aaad', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }} />
          </Box>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={() => setAnchorEl(null)}
            PaperProps={{ sx: { width: 280, mt: 1, border: '1px solid #e0e5e4', boxShadow: '0 12px 40px rgba(0,0,0,.14)' } }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <Typography sx={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.8px', color: '#808285', px: 2, py: 1.5 }}>
              Switch Persona
            </Typography>
            {Object.values(PERSONAS).filter(p => p.useCase === state.useCase).map((p) => (
              <MenuItem
                key={p.id}
                onClick={() => handlePersonaSwitch(p.id)}
                selected={state.persona === p.id}
                sx={{ gap: 1.5, '&.Mui-selected': { bgcolor: '#e0f0fc' } }}
              >
                <Avatar sx={{ width: 36, height: 36, bgcolor: p.color, fontSize: 13, fontWeight: 700 }}>{p.ini}</Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography sx={{ fontSize: 13, fontWeight: 600 }}>{p.name}</Typography>
                  <Typography sx={{ fontSize: 11, color: '#808285' }}>{p.role}</Typography>
                </Box>
                {state.persona === p.id && (
                  <ListItemIcon sx={{ minWidth: 0 }}>
                    <CheckCircleIcon sx={{ color: '#1B75BB', fontSize: 18 }} />
                  </ListItemIcon>
                )}
              </MenuItem>
            ))}
            <Divider />
            <Typography sx={{ fontSize: 10, color: '#a8aaad', px: 2, py: 1 }}>
              Personas simulate role-based access for demo
            </Typography>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
