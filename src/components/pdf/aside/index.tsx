import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
}

export default function PdfAside({ children }: Props) {
  return <S.PdfAside>{children}</S.PdfAside>;
}

const S = {
  PdfAside: styled.div`
    height: 100%;
    width: 30%;
    margin: 5px 0px 5px 5px;
    display: flex;
    flex-direction: column;
  `,
};
