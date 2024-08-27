import React from 'react';
import styled from 'styled-components';

export default function ImageObject() {
  const objectRef = React.useRef<HTMLImageElement | null>(null);

  const handleDragStart: React.DragEventHandler<HTMLImageElement> = (event) => {
    event.dataTransfer.setData('text/plain', '');
  };

  const handleDragOver: React.DragEventHandler<HTMLImageElement> = (event) => {
    event.preventDefault();
  };

  const handleDragEnd: React.DragEventHandler<HTMLImageElement> = (event) => {
    event.preventDefault();
    if (!objectRef.current || !objectRef.current.parentElement) return;

    // Get the parent element's position
    const parentRect = objectRef.current.parentElement.getBoundingClientRect();

    // Calculate the new position for the dropped element
    const newLeft = event.clientX - parentRect.left - objectRef.current.offsetWidth / 2;
    const newTop = event.clientY - parentRect.top - objectRef.current.offsetHeight / 2;

    // Set the position of the draggable element
    objectRef.current.style.left = `${newLeft}px`;
    objectRef.current.style.top = `${newTop}px`;
  };

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
