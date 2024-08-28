import React from 'react';
import useIdGetter from './useIdGetter';
import { PdfObject } from '@/types/pdfObject';
import { usePdfDocumentStore } from '@/stores/pdfDocument';

export default function usePdfObjectEventHandler<T extends HTMLElement>(objectElement: PdfObject) {
  const { id } = useIdGetter();
  const modifyObjectCoordinate = usePdfDocumentStore((state) => state.modifyObjectCoordinate);
  const objectRef = React.useRef<T | null>(null);

  const handleDragStart: React.DragEventHandler<T> = (event) => {
    event.dataTransfer.setData('text/plain', '');
    event.currentTarget.classList.add('dragging');
  };

  const handleDragOver: React.DragEventHandler<T> = (event) => {
    event.preventDefault();
  };

  const handleDragEnd: React.DragEventHandler<T> = (event) => {
    event.preventDefault();
    if (!objectRef.current || !objectRef.current.parentElement || !id || !event.currentTarget.classList.contains('dragging')) return;

    // Get the parent element's position
    const parentRect = objectRef.current.parentElement.getBoundingClientRect();

    // Calculate the new position for the dropped element
    const newLeft = event.clientX - parentRect.left - objectRef.current.offsetWidth / 2;
    const newTop = event.clientY - parentRect.top - objectRef.current.offsetHeight / 2;
    const isPdfZone =
      event.clientX >= parentRect.left &&
      event.clientX <= parentRect.right &&
      event.clientY >= parentRect.top &&
      event.clientY <= parentRect.bottom;

    if (!isPdfZone) return;

    // Set the position of the draggable element
    objectRef.current.style.left = `${newLeft}px`;
    objectRef.current.style.top = `${newTop}px`;
    modifyObjectCoordinate({ top: `${newTop}px`, left: `${newLeft}px` }, objectElement.id, id);
  };

  return {
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    objectRef,
  };
}
