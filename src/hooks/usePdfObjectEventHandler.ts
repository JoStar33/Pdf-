import React from 'react';
import useIdGetter from './useIdGetter';
import { PdfObject } from '@/types/pdfObject';
import { usePdfDocumentStore } from '@/stores/pdfDocument';
import debounce from '@/utils/debounce';

export default function usePdfObjectEventHandler<T extends HTMLElement>(objectElement: PdfObject) {
  const { id } = useIdGetter();
  const modifyObject = usePdfDocumentStore((state) => state.modifyObject);
  const objectRef = React.useRef<T>(null);

  const handleDragStart: React.DragEventHandler<T> = (event) => {
    event.dataTransfer.setData('text/plain', '');
  };

  const handleDragOver: React.DragEventHandler<T> = (event) => {
    event.preventDefault();
  };

  const handleDragEnd: React.DragEventHandler<T> = (event) => {
    event.preventDefault();
    if (!objectRef.current || !objectRef.current.parentElement || !id) return;

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
    modifyObject((prev) => ({ ...prev, top: `${newTop}px`, left: `${newLeft}px` }), objectElement.id, id);
  };

  const handleResize: React.ReactEventHandler<T> = React.useCallback(() => {
    if (!id || !objectRef.current) return;
    const newWidth = objectRef.current.offsetWidth;
    const newHeight = objectRef.current.offsetHeight;
    modifyObject((prev) => ({ ...prev, width: `${newWidth}px`, height: `${newHeight}px` }), objectElement.id, id);
  }, [id, modifyObject, objectElement.id]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedHandleResize = React.useCallback(debounce(handleResize, 100), [handleResize]);

  React.useEffect(
    function observeObjectResize() {
      if (!objectRef.current) return;
      // ResizeObserver 설정
      const observer = new ResizeObserver(debouncedHandleResize);
      observer.observe(objectRef.current);

      // 클린업 함수에서 observer 해제
      return () => {
        observer.disconnect();
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [objectRef.current],
  );

  return {
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    objectRef,
  };
}
