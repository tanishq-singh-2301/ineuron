import { Box, IconButton, MoonIcon, SunIcon, useColorMode } from 'native-base';
import shows from '../data';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Play = (): JSX.Element => {
    const params = useParams();
    const navigate = useNavigate();
    const { colorMode } = useColorMode();
    const [show, setShow] = useState<number | null>(null);

    useEffect(() => {
        if ((params.index !== undefined) && (typeof parseInt(params.index) === "number")) setShow(parseInt(params.index))
        else navigate("/")
    }, []);

    return (
        <Box
            minHeight="full"
            justifyContent="center"
        >
            {show}
        </Box>
    )
}

const ToggleDarkMode = (): JSX.Element => {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <Box>
            <IconButton
                onPress={toggleColorMode}
            >
                {colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
            </IconButton>
        </Box>
    );
}

export default Play;