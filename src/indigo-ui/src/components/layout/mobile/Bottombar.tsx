import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

export default function LabelBottomNavigation() {
  const location = useLocation();
  const [value, setValue] = useState(location.pathname);

  useEffect(() => {
    setValue(location.pathname);
  }, [location.pathname]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation
      sx={{ width: '100%', position: 'fixed', bottom: 0 }}
      value={value}
      onChange={handleChange}
    >
      <BottomNavigationAction
        label="Menu"
        value="/menu"
        icon={"Menu"}
        component={Link}
        to="/menu"
      />
      <BottomNavigationAction
        label="Feedpage"
        value="/feedpage"
        icon={"Feedpage"}
        component={Link}
        to="/feedpage"
      />
      <BottomNavigationAction
        label="Homepage"
        value="/homepage"
        icon={"Homepage"}
        component={Link}
        to="/homepage"
      />
      <BottomNavigationAction
        label="Inbox"
        value="/inbox"
        icon={"Inbox"}
        component={Link}
        to="/inbox"
      />
    </BottomNavigation>
  );
}