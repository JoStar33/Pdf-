import { flexCenter } from '@/styles/Common';
import { FaPlus } from 'react-icons/fa';
import styled from 'styled-components';

interface Props {
  handleDropFileLoad: (fileList: FileList) => void;
  handleFileLoad: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function PdfFileUploader({ handleDropFileLoad, handleFileLoad }: Props) {
  const handleDragOver: React.DragEventHandler<HTMLLabelElement> = (event) => {
    event.preventDefault();
  };

  const handleDragStart: React.DragEventHandler<HTMLLabelElement> = (event) => {
    event.dataTransfer.setData('text/plain', '');
  };

  const handleUploadImages = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (!event.target.files) return;
    handleFileLoad(event);
  };

  const handleDrop: React.DragEventHandler<HTMLLabelElement> = (event) => {
    event.preventDefault();
    handleDropFileLoad(event.dataTransfer.files);
  };

  return (
    <S.PdfFileUploader
      htmlFor="pdf-file-input"
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onChange={handleUploadImages as unknown as React.FormEventHandler<HTMLLabelElement>}
      onDrop={handleDrop}
    >
      <FaPlus size={30} />
      <input id="pdf-file-input" type="file" accept=".pdf" />
    </S.PdfFileUploader>
  );
}

const S = {
  PdfFileUploader: styled.label`
    margin: 5px;
    width: 100%;
    cursor: pointer;
    aspect-ratio: 1;
    border: 2px dashed ${(props) => props.theme.colors.deepSkyblue};
    input {
      display: none;
    }
    ${flexCenter}
  `,
};
