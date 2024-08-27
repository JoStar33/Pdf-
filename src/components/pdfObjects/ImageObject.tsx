import usePdfObjectEventHandler from '@/hooks/usePdfObjectEventHandler';
import styled from 'styled-components';

export default function ImageObject() {
  const { objectRef, handleDragOver, handleDragStart, handleDragEnd } = usePdfObjectEventHandler<HTMLImageElement>();

  return (
    <S.ImageObject
      draggable={true}
      ref={objectRef}
      onDragOver={handleDragOver}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      src="/images/boriImage1.jpg"
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
