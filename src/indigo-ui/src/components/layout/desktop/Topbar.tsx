import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Menu, MenuItem } from '@mui/material';
import { ThemeMode, useColorMode } from '../../../theme/colorModeSelector';
import { useState } from 'react';

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

interface TopbarProps {
  open: boolean;
  handleDrawerOpen: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({ open, handleDrawerOpen }) => {
  const { mode, handleMode } = useColorMode();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  return (
    <AppBar variant="outlined" position="fixed" open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ marginRight: 5, ...(open && { display: 'none' }) }}
        >
        <Typography variant="h6" noWrap component="div">
          Icon
        </Typography>          
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Indigo
        </Typography>

        <IconButton color="inherit" onClick={handleMenuOpen}>
          {mode === "dark" ? (
            <Typography>Dark</Typography>
          ) : mode === "light" ? (
            <Typography>Light</Typography>
          ) : (
            <Typography>System</Typography>
          )}
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => handleMode(ThemeMode.lightMode)}>
            Light Mode
          </MenuItem>
          <MenuItem onClick={() => handleMode(ThemeMode.darkMode)}>
            Dark Mode
          </MenuItem>
          <MenuItem onClick={() => handleMode(ThemeMode.systemMode)}>
            System Mode
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};