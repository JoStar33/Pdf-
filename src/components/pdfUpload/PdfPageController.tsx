import { colors } from '@/styles/Theme';
import styled from 'styled-components';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { flexCenter } from '@/styles/Common';

interface Props {
  setPage: (page: number) => void;
  currentPage: number;
  lastPage: number;
}

export default function PdfPageController({ currentPage, lastPage, setPage }: Props) {
  const handleClickPageNumber = (page: number) => {
    setPage(page);
  };

  const handleNextPage = () => {
    if (currentPage === lastPage) return;
    setPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage === 1) return;
    setPage(currentPage - 1);
  };

  const currentPageStyle = (page: number): React.CSSProperties => ({
    backgroundColor: currentPage === page ? colors.white : 'transparent',
    color: currentPage === page ? colors.black : colors.white,
  });

  return (
    <S.PdfPageController>
      <button onClick={handlePrevPage}>
        <IoIosArrowBack />
      </button>
      {new Array(lastPage).fill('').map((_, index) => (
        <span className="page-element" style={currentPageStyle(index + 1)} onClick={() => handleClickPageNumber(index + 1)}>
          {index + 1}
        </span>
      ))}
      <button onClick={handleNextPage}>
        <IoIosArrowForward />
      </button>
    </S.PdfPageController>
  );
}

const S = {
  PdfPageController: styled.div`
    display: flex;
    margin-top: 10px;
    width: 100%;
    justify-content: center;
    gap: 10px;
    .page-element {
      ${flexCenter}
      cursor: pointer;
      width: 25px;
      border-radius: 5px;
      height: 25px;
    }
  `,
};
