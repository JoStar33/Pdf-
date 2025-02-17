import { PdfDocument, PdfDocumentCreateForm } from '@/types/pdfDocument';
import { PdfAllObject, PdfImageObject, PdfImageObjectCreateForm } from '@/types/pdfObject';
import { dateFormat } from '@/utils/dateFormat';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface PdfDocumentStore {
  pdfDocumentList: PdfDocument[];
  uniqueId: number;
  createPdf: (pdfDocument: PdfDocumentCreateForm) => void;
  modifyPdf: (fn: ((prev: PdfDocument) => PdfDocument) | PdfDocument, pdfDocumentId: number) => void;
  deletePdf: (pdfDocumentId: number) => void;
  modifyObject: (fn: ((prev: PdfAllObject) => PdfAllObject) | PdfAllObject, objectId: number, pdfDocumentId: number) => void;
  deleteObject: (objectId: number, pdfDocumentId: number) => void;
  createImageObject: (pdfImageObject: PdfImageObjectCreateForm, pdfDocumentId: number, currentPage: number) => void;
}

export const usePdfDocumentStore = create(
  persist<PdfDocumentStore>(
    (set) => ({
      pdfDocumentList: [],
      uniqueId: 1,
      createPdf: (pdfDocument) =>
        set((prev) => ({
          ...prev,
          uniqueId: prev.uniqueId + 1,
          pdfDocumentList: [
            ...prev.pdfDocumentList,
            { ...pdfDocument, id: prev.uniqueId, objects: [], createdAt: dateFormat.date5(String(new Date())), file: pdfDocument.file },
          ],
        })),
      modifyPdf: (fn, pdfDocumentId) =>
        set((prev) => {
          const findPdfDocument = prev.pdfDocumentList.find((pdfDocument) => pdfDocument.id === pdfDocumentId);
          if (!findPdfDocument) throw new Error('PDF를 찾을 수 없습니다.');
          const modifiedPdfDocument = {
            ...(typeof fn === 'function' ? fn(findPdfDocument) : fn),
          };
          return {
            ...prev,
            pdfDocumentList: [...prev.pdfDocumentList.filter((pdfElement) => pdfElement.id !== pdfDocumentId), modifiedPdfDocument],
          };
        }),
      deletePdf: (pdfDocumentId) =>
        set((prev) => ({ ...prev, pdfDocumentList: [...prev.pdfDocumentList.filter((pdfDocument) => pdfDocument.id !== pdfDocumentId)] })),
      modifyObject: (fn, objectId, pdfDocumentId) =>
        set((prev) => {
          const findPdfDocument = prev.pdfDocumentList.find((pdfDocument) => pdfDocument.id === pdfDocumentId);
          if (!findPdfDocument) throw new Error('PDF를 찾을 수 없습니다.');
          const findObject = findPdfDocument?.objects.find((objectElement) => objectElement.id === objectId);
          if (!findObject) throw new Error('오브젝트를 찾을 수 없습니다.');
          const modifiedPdfObject = {
            ...(typeof fn === 'function' ? fn(findObject) : fn),
          };
          return {
            ...prev,
            uniqueId: prev.uniqueId + 1,
            pdfDocumentList: [
              ...prev.pdfDocumentList.filter((pdfDocument) => pdfDocument.id !== pdfDocumentId),
              {
                ...findPdfDocument,
                objects: [...findPdfDocument.objects.filter((objectElement) => objectElement.id !== objectId), modifiedPdfObject],
              },
            ],
          };
        }),
      deleteObject: (objectId, pdfDocumentId) =>
        set((prev) => {
          const findPdfDocument = prev.pdfDocumentList.find((pdfDocument) => pdfDocument.id === pdfDocumentId);
          if (!findPdfDocument) throw new Error('PDF를 찾을 수 없습니다.');

          const filteredObjects = findPdfDocument.objects.filter((objectElement) => objectElement.id !== objectId);

          return {
            ...prev,
            uniqueId: prev.uniqueId + 1,
            pdfDocumentList: [
              ...prev.pdfDocumentList.filter((pdfDocument) => pdfDocument.id !== pdfDocumentId),
              { ...findPdfDocument, objects: [...filteredObjects] },
            ],
          };
        }),
      createImageObject: (pdfImageObject, pdfDocumentId, currentPage) =>
        set((prev) => {
          const findPdfDocument = prev.pdfDocumentList.find((pdfDocument) => pdfDocument.id === pdfDocumentId);
          const newPdfImageObject: PdfImageObject = {
            ...pdfImageObject,
            id: prev.uniqueId,
            page: currentPage,
            top: '10px',
            left: '10px',
            width: '100px',
            height: '100px',
            type: 'IMAGE',
          };
          if (!findPdfDocument) throw new Error('PDF를 찾을 수 없습니다.');
          return {
            ...prev,
            uniqueId: prev.uniqueId + 1,
            pdfDocumentList: [
              ...prev.pdfDocumentList.filter((pdfDocument) => pdfDocument.id !== pdfDocumentId),
              { ...findPdfDocument, objects: [...findPdfDocument.objects, newPdfImageObject] },
            ],
          };
        }),
    }),
    {
      name: 'pdf-document-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
