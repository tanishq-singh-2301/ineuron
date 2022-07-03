import { Box, IconButton, MoonIcon, SunIcon, useColorMode } from "native-base";

const ToggleMode = (): JSX.Element => {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <Box mr="3">
            <IconButton onPress={toggleColorMode}>
                {colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
            </IconButton>
        </Box>
    );
}

export default ToggleMode;