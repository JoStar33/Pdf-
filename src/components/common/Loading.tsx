import styled, { css } from 'styled-components';
import { flexCenter } from '@/styles/Common';
// import Image from 'next/image';

interface ILoading {
  mode: 'block' | 'center' | 'fixed' | 'absolute';
  width?: number;
  height?: string;
  padding?: string;
  spinnerHeight?: number;
}

export default function Loading({ padding, mode, height }: ILoading) {
  return (
    <S.Loading padding={padding} mode={mode} height={height}>
      <div className="loading-wrapper">
        <div className="loading" />
      </div>
    </S.Loading>
  );
}

const S = {
  Loading: styled.div<{ mode: string; padding?: string; height?: string }>`
    margin: 0 auto;
    padding: ${(props) => props.padding};
    text-align: center;
    height: ${(props) => (props.height ? props.height : '100%')};
    ${flexCenter}
    ${(props) =>
      props.mode === 'center' &&
      css`
        height: 50%;
      `};
    ${(props) =>
      props.mode === 'fixed' &&
      css`
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 11;
      `};
    ${(props) =>
      props.mode === 'absolute' &&
      css`
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 10px;
      `};
    .loading-wrapper {
      ${flexCenter}
      /* background-color: rgba(0, 0, 0, 0.3); */
      border-radius: 10px;
      width: 55px;
      height: 55px;
    }
    .loading:before {
      content: '';
      display: block;
      height: 25px;
      width: 25px;
      -webkit-animation: spin 0.5s infinite linear;
      animation: spin 0.5s infinite linear;
      border: 4px ${(props) => props.theme.colors.deepSkyblue} solid;
      border-left-color: transparent;
      border-radius: 100%;
    }

    @-webkit-keyframes spin {
      to {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
      }
    }

    @keyframes spin {
      to {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
      }
    }
  `,
};
