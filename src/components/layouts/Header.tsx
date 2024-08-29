import styled from 'styled-components';
import { GoHomeFill } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import routerPath from '@/constants/routerPath';

export default function Header() {
  const navigator = useNavigate();
  const handleClickHome = () => {
    navigator(routerPath.HOME);
  };
  return (
    <S.Header>
      <GoHomeFill size={30} onClick={handleClickHome} cursor="pointer" />
    </S.Header>
  );
}

const S = {
  Header: styled.div`
    height: 50px;
    display: flex;
    justify-content: space-between;
    padding: 0px 10px;
    align-items: center;
    background-color: ${(props) => props.theme.colors.gray};
  `,
};
