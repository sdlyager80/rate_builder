import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Breadcrumbs from '@mui/material/Breadcrumbs';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import PackageHeader from './components/PackageHeader';

import Workbench from './views/Workbench';
import RateWorkspace from './views/RateWorkspace';
import AdjustFactor from './views/AdjustFactor';
import Submit from './views/Submit';
import QAReview from './views/QAReview';
import ParallelRating from './views/ParallelRating';
import QASubmit from './views/QASubmit';
import ApproverReview from './views/ApproverReview';
import ApproverDecide from './views/ApproverDecide';
import Deploy from './views/Deploy';
import AuditTrail from './views/AuditTrail';

import { PERSONAS, getSteps } from './data/data';
import { useApp } from './context/AppContext';

function MainContent() {
  const { state } = useApp();
  const steps = getSteps(state.persona);
  const currentStep = steps[state.step];
  const sid = currentStep?.id || '';
  const isAnalystWorkbench = state.persona === 'analyst' && sid === 'workbench';

  const viewMap = {
    workbench:  <Workbench />,
    workspace:  <RateWorkspace />,
    adjust:     <AdjustFactor />,
    submit:     <Submit />,
    qa_review:  <QAReview />,
    parallel:   <ParallelRating />,
    qa_submit:  <QASubmit />,
    review:     <ApproverReview />,
    decide:     <ApproverDecide />,
    deploy:     <Deploy />,
    audit:      <AuditTrail />,
  };

  return (
    <Box sx={{ flex: 1, overflowY: 'auto', p: 3, bgcolor: '#F2F7F6' }}>
      <Breadcrumbs sx={{ mb: 1.5 }}>
        <Typography sx={{ fontSize: 12, fontWeight: 500, color: '#808285' }}>
          {PERSONAS[state.persona].role}
        </Typography>
        <Typography sx={{ fontSize: 12, fontWeight: 600, color: '#1a1a1a' }}>
          {currentStep?.label || ''}
        </Typography>
      </Breadcrumbs>
      {!isAnalystWorkbench && <PackageHeader />}
      {viewMap[sid] || null}
    </Box>
  );
}

export default function App() {
  const { state, dispatch } = useApp();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar />
        <MainContent />
      </Box>
      <Snackbar
        open={Boolean(state.snackbar)}
        autoHideDuration={2500}
        onClose={() => dispatch({ type: 'HIDE_SNACKBAR' })}
        message={state.snackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        ContentProps={{ sx: { bgcolor: '#0f4c75', fontWeight: 600, fontSize: 13, borderRadius: 2 } }}
      />
    </Box>
  );
}
