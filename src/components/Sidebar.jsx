import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

// MUI Icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import TableChartIcon from '@mui/icons-material/TableChart';
import TuneIcon from '@mui/icons-material/Tune';
import SendIcon from '@mui/icons-material/Send';
import HistoryIcon from '@mui/icons-material/History';
import ChecklistIcon from '@mui/icons-material/Checklist';
import ScienceIcon from '@mui/icons-material/Science';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import RateReviewIcon from '@mui/icons-material/RateReview';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

import { useApp } from '../context/AppContext';
import { PERSONAS, getSteps } from '../data/data';

const ICON_MAP = {
  Dashboard: DashboardIcon,
  TableChart: TableChartIcon,
  Tune: TuneIcon,
  Send: SendIcon,
  History: HistoryIcon,
  Checklist: ChecklistIcon,
  Science: ScienceIcon,
  TaskAlt: TaskAltIcon,
  RateReview: RateReviewIcon,
  HowToReg: HowToRegIcon,
  RocketLaunch:   RocketLaunchIcon,
  AccountBalance: AccountBalanceIcon,
  TrendingUp:     TrendingUpIcon,
};

const DRAWER_WIDTH = 220;

export default function Sidebar() {
  const { state, dispatch } = useApp();
  const steps = getSteps(state.persona);
  const persona = PERSONAS[state.persona];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          position: 'relative',
          height: '100%',
          border: 'none',
          borderRight: '1px solid #e0e5e4',
          overflow: 'hidden auto',
        },
      }}
    >
      <Box sx={{ pt: 1.5, pb: 1 }}>
        <Typography sx={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.8px', color: '#808285', px: 2, pb: 0.5 }}>
          {persona.role}
        </Typography>
        <List disablePadding>
          {steps.map((s, i) => {
            const Icon = ICON_MAP[s.icon] || DashboardIcon;
            const active = i === state.step;
            return (
              <ListItemButton
                key={s.id}
                selected={active}
                onClick={() => dispatch({ type: 'SET_STEP', payload: i })}
                sx={{
                  borderLeft: active ? '3px solid #1B75BB' : '3px solid transparent',
                  bgcolor: active ? '#e0f0fc' : 'transparent',
                  py: 1, px: 2,
                  '&:hover': { bgcolor: active ? '#d4eaf8' : '#F2F7F6' },
                }}
              >
                <Box sx={{ mr: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 20, height: 20, borderRadius: '50%', bgcolor: active ? '#1B75BB' : '#F2F7F6', flexShrink: 0 }}>
                  <Typography sx={{ fontSize: 10, fontWeight: 700, color: active ? 'white' : '#808285', lineHeight: 1 }}>
                    {i + 1}
                  </Typography>
                </Box>
                <ListItemIcon sx={{ minWidth: 0, mr: 1, color: active ? '#1B75BB' : '#808285' }}>
                  <Icon sx={{ fontSize: 17 }} />
                </ListItemIcon>
                <ListItemText
                  primary={s.label}
                  primaryTypographyProps={{ fontSize: 13, fontWeight: active ? 600 : 500, color: active ? '#1B75BB' : '#1a1a1a' }}
                />
              </ListItemButton>
            );
          })}
        </List>
      </Box>
    </Drawer>
  );
}
