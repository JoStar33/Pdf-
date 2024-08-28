import { createRoot } from 'react-dom/client';
import App from '@/App.tsx';
import GlobalStyle from '@/styles/GlobalStyles.ts';
import Theme from '@/styles/Theme.tsx';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Theme>
      <GlobalStyle />
      <App />
    </Theme>
  </BrowserRouter>,
);
