import { PdfAllObject } from './pdfObject';

export interface PdfDocument {
  id: number;
  file: string;
  title?: string;
  createdAt: string;
  objects: PdfAllObject[];
}

export interface PdfDocumentCreateForm {
  file: string;
}

export interface PdfDocumentModifyForm {
  file?: string;
  title?: string;
}
