import routerPath from '@/constants/routerPath';
import { usePdfDocumentStore } from '@/stores/pdfDocument';
import changeFileToBase64 from '@/utils/changeFileToBase64';
import { useNavigate } from 'react-router-dom';

export default function usePdfUploadHandler() {
  const { createPdf, uniqueId } = usePdfDocumentStore((state) => ({ createPdf: state.createPdf, uniqueId: state.uniqueId }));
  const navigator = useNavigate();
  const createPdfAsArrayBuffer = (file: string) => {
    createPdf({
      file,
    });
  };

  const handleFileLoad = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;
    changeFileToBase64(selectedFile, createPdfAsArrayBuffer);
    navigator(`${routerPath.PDF}/${uniqueId}`);
  };

  const handleDropFileLoad = (fileList: FileList) => {
    const acceptedFiles = Array.from(fileList);
    if (acceptedFiles.length === 0) return;
    const selectedFile = acceptedFiles[0];
    changeFileToBase64(selectedFile, createPdfAsArrayBuffer);
    navigator(`${routerPath.PDF}/${uniqueId}`);
  };

  return {
    handleFileLoad,
    handleDropFileLoad,
  };
}
