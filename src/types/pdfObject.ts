type PdfObjectTypes = 'IMAGE' | 'TEXT' | 'INPUT';

/*************************** Domain & DTO ***************************/
export interface ObjectCoordinate {
  top: string;
  left: string;
}

export interface PdfObject extends ObjectCoordinate {
  id: number;
  type: PdfObjectTypes;
  width: string;
  height: string;
}

export interface PdfImageObject extends PdfObject {
  src: string;
}

export interface PdfTextObject extends PdfObject {
  text: string;
}

export type PdfAllObject = PdfImageObject | PdfTextObject;

/******************************* Form ********************************/

export interface PdfImageObjectCreateForm {
  src: string;
}
