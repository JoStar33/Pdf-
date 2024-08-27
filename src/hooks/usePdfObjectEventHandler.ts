import React from 'react';

export default function usePdfObjectEventHandler<T extends HTMLElement>() {
  const objectRef = React.useRef<T | null>(null);

  const handleDragStart: React.DragEventHandler<T> = (event) => {
    event.dataTransfer.setData('text/plain', '');
  };

  const handleDragOver: React.DragEventHandler<T> = (event) => {
    event.preventDefault();
  };

  const handleDragEnd: React.DragEventHandler<T> = (event) => {
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

  return {
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    objectRef,
  };
}
