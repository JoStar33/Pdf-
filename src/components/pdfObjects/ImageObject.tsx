import usePdfObjectEventHandler from '@/hooks/usePdfObjectEventHandler';
import { PdfImageObject } from '@/types/pdfObject';
import styled from 'styled-components';

interface Props {
  objectElement: PdfImageObject;
}

export default function ImageObject({ objectElement }: Props) {
  const { objectRef, handleDragOver, handleDragStart, handleDragEnd } = usePdfObjectEventHandler<HTMLImageElement>(objectElement);
  const { top, left, src } = objectElement;

  return (
    <S.ImageObject
      style={{
        top,
        left,
      }}
      draggable={true}
      ref={objectRef}
      onDragOver={handleDragOver}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      src={src}
    />
  );
}

const S = {
  ImageObject: styled.img`
    width: 100px;
    height: 100px;
    top: 0px;
    left: 0px;
    object-fit: cover;
    position: absolute;
    z-index: 3;
  `,
};
