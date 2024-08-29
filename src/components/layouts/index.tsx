import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import DarkBackground from '@/components/common/DarkBackground';
import Loading from '@/components/common/Loading';
import { useLoadingStore } from '@/stores/loading';

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  const { isLoading } = useLoadingStore();

  return (
    <S.Layout>
      <div className="layout__cover">
        {isLoading && (
          <DarkBackground>
            <Loading mode="fixed" />
          </DarkBackground>
        )}
        <Header />
        {children}
      </div>
    </S.Layout>
  );
}

const S = {
  Layout: styled.div`
    width: 100%;
    height: 100dvh;
    display: flex;
    justify-content: center;

    .layout {
      &__cover {
        color-scheme: light dark;
        color: rgba(255, 255, 255, 0.87);
        background-color: #242424;
        position: relative;
        overflow: hidden;
        transform: scale(1);
        width: 100%;
        max-width: 800px;
        height: 100dvh;
      }
    }
  `,
};
