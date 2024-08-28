import { Route, Routes } from 'react-router-dom';
import routerPath from '@/constants/routerPath';
import PdfListPage from '@/pages/PdfListPage';
import PdfPage from '@/pages/PdfPage';

export default function Router() {
  return (
    <Routes>
      <Route path={routerPath.HOME} element={<PdfListPage />} />
      <Route path={`${routerPath.PDF}/*`} element={<PdfPage />} />
    </Routes>
  );
}
