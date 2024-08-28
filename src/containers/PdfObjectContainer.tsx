import ImageObject from '@/components/pdfObjects/ImageObject';
import { PdfAllObject } from '@/types/pdfObject';

interface Props {
  objects: PdfAllObject[];
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
