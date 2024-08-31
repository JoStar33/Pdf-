import React from 'react';
import html2canvas from 'html2canvas';
import saveAs from 'file-saver';
import jsPDF from 'jspdf';
import { dateFormat } from '@/utils/dateFormat';
import { useLoadingStore } from '@/stores/loading';

export default function usePdfDownload() {
  const pdfDivRef = React.useRef<HTMLDivElement>(null);
  const { setIsLoading, isLoading } = useLoadingStore();

  const handleDownloadPdf = async (title: string = '제목없음') => {
    if (!pdfDivRef.current) return;
    const currentPdfView = pdfDivRef.current;
    const pdfWidth = parseInt(currentPdfView.style.width.replaceAll('px', ''));
    const pdfHeight = parseInt(currentPdfView.style.height.replaceAll('px', ''));
    if (isLoading) return;
    setIsLoading(true);
    try {
      const canvas = await html2canvas(pdfDivRef.current, { scale: 2 });
      const doc = new jsPDF('p', 'px', [pdfWidth, pdfHeight]);

      const imgData = canvas.toDataURL('image/png', 1.0);
      doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      const submissionTitle = title;
      const file = URL.createObjectURL(new Blob([doc.output('blob')], { type: 'application/pdf' }));
      const date = dateFormat.date4(String(new Date()));
      const fileName = `${submissionTitle}_ ${date}.pdf`;
      saveAs(file, fileName);
    } catch (error) {
      console.error('Error converting div to image:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    pdfDivRef,
    handleDownloadPdf,
  };
}
