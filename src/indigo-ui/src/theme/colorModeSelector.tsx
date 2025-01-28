import { useColorScheme } from "@mui/material";

export enum ThemeMode {
    darkMode = 'dark',
    lightMode = 'light',
    systemMode = 'system'
};

export const useColorMode = () => {
    const { mode, setMode } = useColorScheme();

    const handleMode = (targetMode: ThemeMode) => {
        setMode(targetMode);
    };

    return { mode, handleMode };
};