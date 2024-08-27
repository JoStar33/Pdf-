import PdfUploadPage from './pages';
import { pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import Layout from '@/components/layouts';

pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString();

function App() {
  return (
    <Layout>
      <PdfUploadPage />
    </Layout>
  );
}

export default App;
