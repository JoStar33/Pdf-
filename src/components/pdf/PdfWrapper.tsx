import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
}

export default function PdfWrapper({ children }: Props) {
  return <S.PdfWrapper>{children}</S.PdfWrapper>;
}

const S = {
  PdfWrapper: styled.div`
    display: flex;
  `,
};
