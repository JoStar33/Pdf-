import React from 'react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import Form from '@/components/hookForm';
import { FaPen } from 'react-icons/fa';
import { IoCloseSharp } from 'react-icons/io5';
import { FaSave } from 'react-icons/fa';
import { PdfDocumentTitleForm } from '@/types/pdfDocument';
import { flexCenter } from '@/styles/Common';

interface Props {
  onTitleSubmit: (submitData: PdfDocumentTitleForm, onSuccess: () => void) => void;
}

export default function PdfTitleInput({ onTitleSubmit }: Props) {
  const [modifyMode, setModifyMode] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext<PdfDocumentTitleForm>();

  const handleStartModifyTitle = () => {
    setModifyMode(true);
  };

  const handleCancelModifyTitle = () => {
    setModifyMode(false);
  };

  return (
    <S.PdfTitleInput onSubmit={handleSubmit((submitData) => onTitleSubmit(submitData, () => setModifyMode(false)))}>
      <div className="main-wrapper">
        <input {...register('title')} disabled={!modifyMode} />
        {modifyMode && (
          <div className="main-wrapper__button-wrapper">
            <button type="submit">
              <FaSave size={20} />
            </button>
            <button onClick={handleCancelModifyTitle}>
              <IoCloseSharp size={24} />
            </button>
          </div>
        )}
        {!modifyMode && (
          <button onClick={handleStartModifyTitle}>
            <FaPen size={20} />
          </button>
        )}
      </div>
      <Form.ErrorText name="title" errors={errors} />
    </S.PdfTitleInput>
  );
}

const S = {
  PdfTitleInput: styled.form`
    .main-wrapper {
      height: 50px;
      display: flex;
      width: 100%;
      input {
        width: 100%;
        padding-left: 10px;
        font-size: 18px;
      }
      button {
        height: 100%;
        padding: 0px 10px;
        ${flexCenter}
      }
      &__button-wrapper {
        display: flex;
        gap: 3px;
      }
    }
  `,
};
