import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

export default function LabelBottomNavigation() {
  const [value, setValue] = React.useState('recents');

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
        label="Sidebar"
        value="Sidebar"
        icon={"Sidebar"}
      />
      <BottomNavigationAction
        label="Recents"
        value="recents"
        icon={"Recents"}
      />
      <BottomNavigationAction
        label="Lol"
        value="lol"
        icon={"lol"}
      />
      <BottomNavigationAction
        label="Favorites"
        value="favorites"
        icon={"Favs"}
      />
    </BottomNavigation>
  );
}