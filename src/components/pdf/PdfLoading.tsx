import { flexCenter } from '@/styles/Common';
import styled from 'styled-components';
import Loading from '@/components/common/Loading';

export default function PdfLoading() {
  return (
    <S.PdfLoading>
      <Loading mode="block" />
    </S.PdfLoading>
  );
}

const S = {
  PdfLoading: styled.div`
    width: 100%;
    height: 850px;
    ${flexCenter}
  `,
};
