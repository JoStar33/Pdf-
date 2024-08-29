import React from 'react';
import html2canvas from 'html2canvas';
import saveAs from 'file-saver';
import jsPDF from 'jspdf';
import { dateFormat } from '@/utils/dateFormat';

export default function usePdfDownload() {
  const pdfDivRef = React.useRef<HTMLDivElement>(null);

  const handleDownloadPdf = async (title: string = '제목없음') => {
    if (!pdfDivRef.current) return;
    const currentPdfView = pdfDivRef.current;
    try {
      const canvas = await html2canvas(pdfDivRef.current, { scale: 2 });
      const doc = new jsPDF('p', 'px', [currentPdfView.offsetWidth, currentPdfView.offsetHeight]);

      const imgData = canvas.toDataURL('image/png', 1.0);
      doc.addImage(imgData, 'PNG', 0, 0, currentPdfView.offsetWidth, currentPdfView.offsetHeight);
      const submissionTitle = title;
      const file = URL.createObjectURL(new Blob([doc.output('blob')], { type: 'application/pdf' }));
      const date = dateFormat.date4(String(new Date()));
      const fileName = `${submissionTitle}_ ${date}.pdf`;

      saveAs(file, fileName);
    } catch (error) {
      console.error('Error converting div to image:', error);
    }
  };

  return {
    pdfDivRef,
    handleDownloadPdf,
  };
}
