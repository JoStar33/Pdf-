import usePdfObjectEventHandler from '@/hooks/usePdfObjectEventHandler';
import { PdfImageObject } from '@/types/pdfObject';
import styled from 'styled-components';
import ObjectDeleteButton from './ObjectDeleteButton';

interface Props {
  objectElement: PdfImageObject;
}

/**
 * 랜덤 보리이미지 컴포넌트
 * @param objectElement 오브젝트
 * @returns 이미지 컴포넌트
 */
export default function ImageObject({ objectElement }: Props) {
  const { objectRef, handleDragOver, handleDragStart, handleDragEnd } = usePdfObjectEventHandler<HTMLImageElement>(objectElement);
  const { top, left, width, height, src } = objectElement;

  return (
    <S.ImageObject
      style={{
        top,
        left,
        width,
        height,
      }}
      draggable={true}
      ref={objectRef}
      onDragOver={handleDragOver}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <img src={src} />
      <ObjectDeleteButton objectId={objectElement.id} />
    </S.ImageObject>
  );
}

const S = {
  ImageObject: styled.div`
    width: 100px;
    height: 100px;
    top: 0px;
    left: 0px;
    position: absolute;
    z-index: 3;
    border: 1px solid black;
    overflow: auto;
    resize: both;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    ::-webkit-scrollbar {
      display: none; /* Chrome, Safari, Opera*/
    }
    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  `,
};
