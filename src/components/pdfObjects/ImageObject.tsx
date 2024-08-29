import usePdfObjectEventHandler from '@/hooks/usePdfObjectEventHandler';
import { PdfImageObject } from '@/types/pdfObject';
import styled from 'styled-components';
import ObjectDeleteButton from './ObjectDeleteButton';
import React from 'react';

interface Props {
  objectElement: PdfImageObject;
  currentPage: number;
}

/**
 * 랜덤 보리이미지 컴포넌트
 * @param objectElement 오브젝트
 * @returns 이미지 컴포넌트
 */
export default React.memo(function ImageObject({ objectElement, currentPage }: Props) {
  const { objectRef, handleDragOver, handleDragStart, handleDragEnd } = usePdfObjectEventHandler<HTMLDivElement>(objectElement);
  const { top, left, width, height, src, page } = objectElement;

  if (page !== currentPage) return <></>;

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
});

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
    -ms-overflow-style: none;
    scrollbar-width: none;
    ::-webkit-scrollbar {
      display: none;
    }
    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  `,
};
