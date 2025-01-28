import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Link } from "@mui/material";
import { useState } from "react";
import { useColorMode, ThemeMode } from "../../theme/colorModeSelector";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const { mode, handleMode } = useColorMode();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Indigo
        </Typography>
        <MenuItem onClick={() => navigate("/Feedpage")}>
            Feed
          </MenuItem>
          <MenuItem onClick={() => navigate("/")}>
            Home
          </MenuItem>
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

export default Navbar;