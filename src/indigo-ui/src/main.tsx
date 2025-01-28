import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { themeProvider } from './theme/themeProvider.tsx'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './Routes.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={themeProvider}>
        <CssBaseline>
          <AppRoutes />
        </CssBaseline>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
)
