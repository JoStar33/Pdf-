import ImageObject from '@/components/pdfObjects/ImageObject';
import { PdfAllObject } from '@/types/pdfObject';

interface Props {
  objects: PdfAllObject[];
  currentPage: number;
}

export default function PdfObjectContainer({ objects, currentPage }: Props) {
  return (
    <>
      {objects.map((objectElement) => {
        if ('src' in objectElement) return <ImageObject currentPage={currentPage} key={objectElement.id} objectElement={objectElement} />;
        return <></>;
      })}
    </>
  );
}
