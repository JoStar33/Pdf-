import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import GlobalStyle from './styles/GlobalStyles.ts';
import Theme from './styles/Theme.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Theme>
      <GlobalStyle />
      <App />
    </Theme>
  </StrictMode>,
);
