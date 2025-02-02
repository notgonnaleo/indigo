import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Sidebar from './desktop/Sidebar';
import { Topbar } from './desktop/Topbar';
import { MobileTopbar } from './mobile/Topbar';
import Bottombar from './mobile/Bottombar';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState } from 'react';

const MainContent = styled('main', {
  shouldForwardProp: (prop) => prop !== 'open',
})<{ open: boolean }>(({ theme }) => ({
  flexGrow: 1,
  marginTop: 64,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [open, setOpen] = useState(false);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
      {(() => {
        switch (true) {
          case isMobile:
            return (
              <>
                <MobileTopbar />
                <MainContent open={open}>
                  <Box>
                    {children}
                  </Box>
                </MainContent>
                <Bottombar />
              </>
            );
          case isTablet:
            return (
              <>
                <MobileTopbar />
                <MainContent open={open}>
                  <Box>
                    {children}
                  </Box>
                </MainContent>
                <Bottombar />
              </>
            );
          case isDesktop:
            return (
              <>
                <Topbar open={open} handleDrawerOpen={handleDrawerOpen} />
                <Sidebar open={open} handleDrawerClose={handleDrawerClose} />
                <MainContent open={open}>
                  <Box sx={{marginLeft: open ? 32 : 12 }}>
                    {children}
                  </Box>
                </MainContent>
              </>
            );
          default:
            return null;
        }
      })()}
    </Box>
  );
};

export default MainLayout;