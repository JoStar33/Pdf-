import FormDateSelect from '@/components/hookForm/FormDateSelect';
import PdfList from '@/components/pdfList';
import { usePdfDocumentStore } from '@/stores/pdfDocument';

export default function PdfListContainer() {
  const { pdfDocumentList } = usePdfDocumentStore();
  return <FormDateSelect />;
}
