import { useContext } from 'react';
import { DashboardContext } from '../contexts/DashboardContext';
//
// ----------------------------------------------------------------------

const useDashboard = () => {
  const context = useContext(DashboardContext);

  if (!context) throw new Error('Dashboard context must be use inside DashboardProvider');

  return context;
};

export default useDashboard;
