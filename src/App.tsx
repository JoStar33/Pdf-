import PdfUploadPage from './pages/PdfPage';
import { pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import Layout from '@/components/layouts';

pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString();

export default function App() {
  return (
    <Layout>
      <PdfUploadPage />
    </Layout>
  );
}
