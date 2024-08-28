type PdfObjectTypes = 'IMAGE' | 'TEXT' | 'INPUT';

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

export interface PdfImageObjectCreateForm {
  src: string;
}
