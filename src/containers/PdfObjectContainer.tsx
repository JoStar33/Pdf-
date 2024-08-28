import ImageObject from '@/components/pdfObjects/ImageObject';
import { PdfImageObject, PdfTextObject } from '@/types/pdfObject';

interface Props {
  objects: (PdfImageObject | PdfTextObject)[];
}

export default function PdfObjectContainer({ objects }: Props) {
  return (
    <>
      {objects.map((objectElement) => {
        if ('src' in objectElement) return <ImageObject key={objectElement.id} objectElement={objectElement} />;
        return <></>;
      })}
    </>
  );
}
