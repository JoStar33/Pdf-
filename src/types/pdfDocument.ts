import { PdfImageObject, PdfTextObject } from './pdfObject';

export interface PdfDocument {
  id: number;
  file: File;
  title?: string;
  createdAt: string;
  objects: (PdfImageObject | PdfTextObject)[];
}

export interface PdfDocumentCreateForm {
  file: File;
}

export interface PdfDocumentModifyForm {
  file?: File;
  title?: string;
}
