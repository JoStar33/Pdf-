import { PdfAllObject } from './pdfObject';

/*************************** Domain & DTO ***************************/
export interface PdfDocument {
  id: number;
  file: string;
  title?: string;
  createdAt: string;
  objects: PdfAllObject[];
}

/******************************* Form ********************************/

export interface PdfDocumentCreateForm {
  file: string;
}

export interface PdfDocumentModifyForm {
  file?: string;
  title?: string;
}

export interface PdfDocumentTitleForm {
  title: string;
}
