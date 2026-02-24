export const PERSONAS = {
  analyst:    { id: 'analyst',    name: 'Sara Hernandez',  role: 'Rate Analyst',          color: '#1B75BB', ini: 'SH' },
  qa:         { id: 'qa',         name: 'Michael Chen',    role: 'QA / Parallel Rating',  color: '#0f4c75', ini: 'MC' },
  actuarial:  { id: 'actuarial',  name: 'Jaya Patel',      role: 'Actuarial Reviewer',    color: '#37A526', ini: 'JP' },
  compliance: { id: 'compliance', name: 'Rachel Davis',    role: 'Compliance Officer',    color: '#F6921E', ini: 'RD' },
  cab:        { id: 'cab',        name: 'Tom Kowalski',    role: 'Change Advisory Board', color: '#0f4c75', ini: 'TK' },
};

export const TASKS = [
  { id: 'RF-2026-0041', state: 'NV', title: 'Nevada WC Loss Cost Filing',          edition: '2026.1', effective: '2026-03-01', codes: 556,  records: 1192, status: 'In Progress',          tphase: 'workspace',       type: 'Proposed', received: '2025-12-10' },
  { id: 'RF-2026-0038', state: 'FL', title: 'Florida WC Loss Cost Filing',          edition: '2026.1', effective: '2026-03-01', codes: 489,  records: 978,  status: 'In QA Review',          tphase: 'submitted',       type: 'Proposed', received: '2025-12-05' },
  { id: 'RF-2026-0035', state: 'TX', title: 'Texas WC Loss Cost Filing',            edition: '2026.1', effective: '2026-03-01', codes: 512,  records: 1024, status: 'Actuarial Review',       tphase: 'act_review',      type: 'Proposed', received: '2025-11-28' },
  { id: 'RF-2026-0031', state: 'GA', title: 'Georgia WC Loss Cost Filing',          edition: '2026.1', effective: '2026-03-01', codes: 334,  records: 668,  status: 'Compliance Review',      tphase: 'comp_review',     type: 'Proposed', received: '2025-11-20' },
  { id: 'RF-2026-0027', state: 'AL', title: 'Alabama WC Loss Cost Filing',          edition: '2025.2', effective: '2025-10-01', codes: 298,  records: 596,  status: 'Deployed',               tphase: 'deployed',        type: 'Final',    received: '2025-08-15' },
  { id: 'RF-2026-0044', state: 'IA', title: 'Iowa WC Loss Cost Filing',             edition: '2026.1', effective: '2026-03-01', codes: 267,  records: 534,  status: 'Pending Final Rates',    tphase: 'pending_final',   type: 'Proposed', received: '2025-12-18' },
  { id: 'RF-2026-0022', state: 'NC', title: 'North Carolina WC Loss Cost Filing',   edition: '2025.2', effective: '2025-10-01', codes: 345,  records: 690,  status: 'Final Rates Received',   tphase: 'final_received',  type: 'Final',    received: '2025-12-20' },
  { id: 'RF-2026-0019', state: 'SC', title: 'South Carolina WC Loss Cost Filing',   edition: '2025.2', effective: '2025-10-01', codes: 310,  records: 620,  status: 'Deployed',               tphase: 'deployed',        type: 'Final',    received: '2025-07-22' },
];

export const SYSTEMS = ['EPIC', 'EAC', 'ECIC', 'EICN'];
export const SYS_LABELS = { EPIC: 'Factor 1', EAC: 'Factor 2', ECIC: 'Factor 3', EICN: 'Factor 4' };
export const SYS_COLORS = { EPIC: '#1B75BB', EAC: '#37A526', ECIC: '#F6921E', EICN: '#0f4c75' };

export const INITIAL_FACTORS = {
  EPIC: { lcm_cur: 1.20, lcm: 1.20, cat_cur: 0.0100, cat: 0.0120, terr_cur: 0.0500, terr: 0.0480, disc: 7,  ec: 160, mpm: 225, mmp: 750, sched: 25, thresh: 'Any Risk' },
  EAC:  { lcm_cur: 1.50, lcm: 1.50, cat_cur: 0.0200, cat: 0.0150, terr_cur: 0.0600, terr: 0.0600, disc: 9,  ec: 160, mpm: 225, mmp: 750, sched: 25, thresh: 'Any Risk' },
  ECIC: { lcm_cur: 1.80, lcm: 1.80, cat_cur: 0.0200, cat: 0.0180, terr_cur: 0.0700, terr: 0.0720, disc: 9,  ec: 160, mpm: 225, mmp: 750, sched: 25, thresh: 'Any Risk' },
  EICN: { lcm_cur: 1.45, lcm: 1.45, cat_cur: 0.0200, cat: 0.0200, terr_cur: 0.0700, terr: 0.0500, disc: 9,  ec: 160, mpm: 225, mmp: 750, sched: 25, thresh: 'Any Risk' },
};

export const RECORDS = [
  { it: 1,   desc: 'FARM: NURSERY',           lk: 1,  cc: '5',    note: '',  ncci: 2.145,  elr: 1.586, dr: 0.36, pc: '',  epic: { cc: '5',    mp: 739 }, eac: { cc: '5',    mp: 750 }, ecic: { cc: '5',    mp: 750 }, eicn: { cc: '5',    mp: 750 } },
  { it: 2,   desc: 'FARM: GARDEN',            lk: 2,  cc: '8',    note: '',  ncci: 1.795,  elr: 1.329, dr: 0.36, pc: '',  epic: { cc: '8',    mp: 645 }, eac: { cc: '8',    mp: 750 }, ecic: { cc: '8',    mp: 750 }, eicn: { cc: '8',    mp: 745 } },
  { it: 3,   desc: 'FARM: ORCHARD',           lk: 3,  cc: '16',   note: '',  ncci: 3.334,  elr: 2.090, dr: 0.29, pc: 16, epic: { cc: '16',   mp: 750 }, eac: { cc: '16',   mp: 750 }, ecic: { cc: '16',   mp: 750 }, eicn: { cc: '16',   mp: 750 } },
  { it: 4,   desc: 'FARM: POULTRY',           lk: 4,  cc: '34',   note: '',  ncci: 2.521,  elr: 1.784, dr: 0.34, pc: '',  epic: { cc: '34',   mp: 750 }, eac: { cc: '34',   mp: 750 }, ecic: { cc: '34',   mp: 750 }, eicn: { cc: '34',   mp: 750 } },
  { it: 5,   desc: 'FARM: FLORIST',           lk: 5,  cc: '35',   note: '',  ncci: 1.358,  elr: 0.962, dr: 0.34, pc: '',  epic: { cc: '35',   mp: 527 }, eac: { cc: '35',   mp: 618 }, ecic: { cc: '35',   mp: 710 }, eicn: { cc: '35',   mp: 603 } },
  { it: 6,   desc: 'FARM: DAIRY',             lk: 6,  cc: '36',   note: '',  ncci: 3.058,  elr: 2.249, dr: 0.36, pc: '',  epic: { cc: '36',   mp: 750 }, eac: { cc: '36',   mp: 750 }, ecic: { cc: '36',   mp: 750 }, eicn: { cc: '36',   mp: 750 } },
  { it: 7,   desc: 'FARM: FIELD CROPS',       lk: 7,  cc: '37',   note: '',  ncci: 2.526,  elr: 1.575, dr: 0.29, pc: '',  epic: { cc: '37',   mp: 750 }, eac: { cc: '37',   mp: 750 }, ecic: { cc: '37',   mp: 750 }, eicn: { cc: '37',   mp: 750 } },
  { it: 8,   desc: 'LANDSCAPE GARDENING',     lk: 8,  cc: '42',   note: '',  ncci: 3.844,  elr: 2.716, dr: 0.34, pc: '',  epic: { cc: '42',   mp: 750 }, eac: { cc: '42',   mp: 750 }, ecic: { cc: '42',   mp: 750 }, eicn: { cc: '42',   mp: 750 } },
  { it: 9,   desc: 'FARM: MACHINERY',         lk: 9,  cc: '50',   note: '',  ncci: 4.063,  elr: 2.533, dr: 0.29, pc: '',  epic: { cc: '50',   mp: 750 }, eac: { cc: '50',   mp: 750 }, ecic: { cc: '50',   mp: 750 }, eicn: { cc: '50',   mp: 750 } },
  { it: 10,  desc: 'FARM: BERRY/VINE',        lk: 10, cc: '79',   note: '',  ncci: 2.017,  elr: 1.430, dr: 0.34, pc: '',  epic: { cc: '79',   mp: 705 }, eac: { cc: '79',   mp: 750 }, ecic: { cc: '79',   mp: 750 }, eicn: { cc: '79',   mp: 750 } },
  { it: 11,  desc: 'FARM: CATTLE',            lk: 11, cc: '83',   note: '',  ncci: 4.913,  elr: 3.494, dr: 0.34, pc: '',  epic: { cc: '83',   mp: 750 }, eac: { cc: '83',   mp: 750 }, ecic: { cc: '83',   mp: 750 }, eicn: { cc: '83',   mp: 750 } },
  { it: 12,  desc: 'TREE PRUNING/REMOVAL',    lk: 12, cc: '106',  note: '',  ncci: 7.606,  elr: 4.370, dr: 0.26, pc: '',  epic: { cc: '106',  mp: 750 }, eac: { cc: '106',  mp: 750 }, ecic: { cc: '106',  mp: 750 }, eicn: { cc: '106',  mp: 750 } },
  { it: 13,  desc: 'FARM: FISH HATCHERY',     lk: 13, cc: '113',  note: '',  ncci: 2.605,  elr: 1.923, dr: 0.36, pc: '',  epic: { cc: '113',  mp: 750 }, eac: { cc: '113',  mp: 750 }, ecic: { cc: '113',  mp: 750 }, eicn: { cc: '113',  mp: 750 } },
  { it: 14,  desc: 'FARM: SHEEP',             lk: 14, cc: '169',  note: '',  ncci: 4.277,  elr: 3.200, dr: 0.36, pc: '',  epic: { cc: '169',  mp: 750 }, eac: { cc: '169',  mp: 750 }, ecic: { cc: '169',  mp: 750 }, eicn: { cc: '169',  mp: 750 } },
  { it: 15,  desc: 'FARM: ANIMAL RAISING',    lk: 15, cc: '170',  note: '',  ncci: 1.856,  elr: 1.370, dr: 0.36, pc: '',  epic: { cc: '170',  mp: 661 }, eac: { cc: '170',  mp: 750 }, ecic: { cc: '170',  mp: 750 }, eicn: { cc: '170',  mp: 750 } },
  { it: 16,  desc: 'IRRIGATION WORKS',        lk: 16, cc: '251',  note: '',  ncci: 3.885,  elr: 2.744, dr: 0.34, pc: '',  epic: { cc: '251',  mp: 750 }, eac: { cc: '251',  mp: 750 }, ecic: { cc: '251',  mp: 750 }, eicn: { cc: '251',  mp: 750 } },
  { it: 17,  desc: 'COTTON GINNING',          lk: 17, cc: '401',  note: '',  ncci: 7.190,  elr: 4.151, dr: 0.26, pc: '',  epic: { cc: '401',  mp: 750 }, eac: { cc: '401',  mp: 750 }, ecic: { cc: '401',  mp: 750 }, eicn: { cc: '401',  mp: 750 } },
  { it: 18,  desc: 'REPORTING ONLY',          lk: 18, cc: '771',  note: 'N', ncci: 0.533,  elr: 0,     dr: 0,    pc: '',  epic: { cc: '771',  mp: 304 }, eac: { cc: '771',  mp: 340 }, ecic: { cc: '771',  mp: 376 }, eicn: { cc: '771',  mp: 333 } },
  { it: 'P1', desc: 'DOMESTIC WORKERS',       lk: 19, cc: '908',  note: 'P', ncci: 127,    elr: 89.836,dr: 0.34, pc: 'P', epic: { cc: '908',  mp: 312 }, eac: { cc: '908',  mp: 351 }, ecic: { cc: '908',  mp: 389 }, eicn: { cc: '908',  mp: 344 } },
  { it: 'P2', desc: 'DOMESTIC WORKERS',       lk: 20, cc: '913',  note: 'P', ncci: 332,    elr: 234.45,dr: 0.34, pc: 'P', epic: { cc: '913',  mp: 558 }, eac: { cc: '913',  mp: 658 }, ecic: { cc: '913',  mp: 750 }, eicn: { cc: '913',  mp: 641 } },
  { it: 19,  desc: 'RESIDENTIAL CARE',        lk: 21, cc: '917',  note: '',  ncci: 2.611,  elr: 2.065, dr: 0.38, pc: '',  epic: { cc: '917',  mp: 750 }, eac: { cc: '917',  mp: 750 }, ecic: { cc: '917',  mp: 750 }, eicn: { cc: '917',  mp: 750 } },
  { it: 20,  desc: 'COAL MINING (Surface)',    lk: 22, cc: '1005', note: '',  ncci: 5.711,  elr: 2.958, dr: 0.26, pc: '',  epic: { cc: '1005', mp: 750 }, eac: { cc: '1005', mp: 750 }, ecic: { cc: '1005', mp: 750 }, eicn: { cc: '1005', mp: 750 } },
  { it: 21,  desc: 'COAL MINING (Underground)',lk: 23, cc: '1016', note: '',  ncci: 12.354, elr: 6.408, dr: 0.26, pc: '',  epic: { cc: '1016', mp: 750 }, eac: { cc: '1016', mp: 750 }, ecic: { cc: '1016', mp: 750 }, eicn: { cc: '1016', mp: 750 } },
  { it: 22,  desc: 'MINING NOC',              lk: 24, cc: '1164', note: '',  ncci: 3.437,  elr: 1.790, dr: 0.26, pc: '',  epic: { cc: '1164', mp: 750 }, eac: { cc: '1164', mp: 750 }, ecic: { cc: '1164', mp: 750 }, eicn: { cc: '1164', mp: 750 } },
];

export const QA_SCENARIOS = [
  { name: 'New Business – Nursery Farm',   st: 'NV', cc: '5',    exp: '$180,000',    base: '$4,631',  newP: '$4,631',  d: '$0', dp: '+0.0%', ok: true },
  { name: 'Renewal – Landscape Co.',       st: 'NV', cc: '42',   exp: '$420,000',    base: '$19,382', newP: '$19,382', d: '$0', dp: '+0.0%', ok: true },
  { name: 'Renewal – Tree Removal LLC',    st: 'NV', cc: '106',  exp: '$95,000',     base: '$8,673',  newP: '$8,673',  d: '$0', dp: '+0.0%', ok: true },
  { name: 'Endorsement – Coal Mining',     st: 'NV', cc: '1016', exp: '$60,000',     base: '$8,895',  newP: '$8,895',  d: '$0', dp: '+0.0%', ok: true },
  { name: 'New Business – Dairy Farm',     st: 'NV', cc: '36',   exp: '$2,400,000',  base: '$88,070', newP: '$88,070', d: '$0', dp: '+0.0%', ok: true },
  { name: 'Renewal – Domestic Workers',    st: 'NV', cc: '908',  exp: '$50,000',     base: '$76,200', newP: '$76,200', d: '$0', dp: '+0.0%', ok: true },
];

export const ANALYST_STEPS = [
  { id: 'workbench', label: 'Task Workbench',    icon: 'Dashboard' },
  { id: 'workspace', label: 'Rate Workspace',    icon: 'TableChart' },
  { id: 'adjust',    label: 'Adjust & Factor',   icon: 'Tune' },
  { id: 'submit',    label: 'Submit for Review', icon: 'Send' },
  { id: 'audit',     label: 'Audit Trail',       icon: 'History' },
];
export const QA_STEPS = [
  { id: 'qa_review', label: 'Review Changes',  icon: 'Checklist' },
  { id: 'parallel',  label: 'Parallel Rating', icon: 'Science' },
  { id: 'qa_submit', label: 'Complete QA',     icon: 'TaskAlt' },
  { id: 'audit',     label: 'Audit Trail',     icon: 'History' },
];
export const APPR_STEPS = [
  { id: 'review', label: 'Review Package', icon: 'RateReview' },
  { id: 'decide', label: 'Decision',       icon: 'HowToReg' },
  { id: 'audit',  label: 'Audit Trail',    icon: 'History' },
];
export const CAB_STEPS = [
  { id: 'review', label: 'Review Package', icon: 'RateReview' },
  { id: 'deploy', label: 'Deploy',         icon: 'RocketLaunch' },
  { id: 'audit',  label: 'Audit Trail',    icon: 'History' },
];

export const INITIAL_AUDIT = [
  { ts: '2025-12-10 09:00', user: 'System',          role: 'Intake',       action: 'Filing Received',  obj: 'RF-2026-0041', det: 'Nevada WC Edition 2026.1 — 556 codes, 1192 records, 4 admin systems' },
  { ts: '2025-12-10 09:02', user: 'Sara Hernandez',  role: 'Rate Analyst', action: 'Files Imported',   obj: 'RF-2026-0041', det: 'NCCI loss cost, ELR, D-Ratio imported. System rates calculated for Factor 1, Factor 2, Factor 3, Factor 4.' },
  { ts: '2025-12-10 09:03', user: 'System',          role: 'Validation',   action: 'Validation Passed', obj: 'RF-2026-0041', det: '0 errors, 2 warnings (cc 771 Reporting Only, Per Capita domestic workers), 10 checks passed' },
];

export const PHASE_ORDER = ['workspace', 'submitted', 'qa_done', 'act_ok', 'comp_ok', 'cab_ok', 'deployed'];

export function getSteps(persona) {
  if (persona === 'analyst')   return ANALYST_STEPS;
  if (persona === 'qa')        return QA_STEPS;
  if (persona === 'cab')       return CAB_STEPS;
  return APPR_STEPS;
}

export function calcRate(ncci, sys, factors)    { return ncci * factors[sys].lcm; }
export function calcCurRate(ncci, sys, factors) { return ncci * factors[sys].lcm_cur; }
export function fmt(n, d = 2) { return typeof n === 'number' ? n.toFixed(d) : String(n); }
export function pctChange(prev, cur) { return prev === 0 ? 0 : ((cur - prev) / prev * 100); }

export function phaseGate(phase, needed) {
  return PHASE_ORDER.indexOf(phase) >= PHASE_ORDER.indexOf(needed);
}

export const STATUS_PHASE_MAP = {
  workspace:     'In Progress',
  submitted:     'Submitted',
  qa_done:       'QA Complete',
  act_ok:        'Actuarial Approved',
  comp_ok:       'Compliance Approved',
  cab_ok:        'Fully Approved',
  deployed:      'Deployed',
};
