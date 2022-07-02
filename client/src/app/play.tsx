import { AspectRatio, Box, Text, Heading, Hidden, HStack, IconButton, MoonIcon, Stack, SunIcon, useColorMode, useDisclose, VStack, Button, ChevronDownIcon, Actionsheet, Center, Slide, Alert, ChevronUpIcon, Avatar, Input, ChevronRightIcon, CloseIcon } from 'native-base';
import shows from '../data';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';

const Play = (): JSX.Element => {
    const params = useParams();
    const navigate = useNavigate();
    const { colorMode } = useColorMode();
    const [show, setShow] = useState<number | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if ((params.index !== undefined) && (typeof parseInt(params.index) === "number")) setShow(parseInt(params.index))
        else navigate("/")
    }, []);

    return (
        <Box
            minHeight="full"
            justifyContent="center"
            flexDirection={["column", "column", "column", "row"]}
            position="relative"
        >
            {(show !== null) ?
                <Stack direction={["column", "column", "column", "row"]} height="full" bg="muted.900" width={["full", "full", "full", "3/5", "4/6"]}>
                    <HStack height={["12", "12", "12", "16"]} px="5" alignItems="center" width="full" borderBottomColor="gray.700" borderBottomWidth="1">
                        <Heading color="gray.50" fontSize="lg" fontWeight="bold" >INeuron</Heading>
                    </HStack>
                    <AspectRatio ratio={16 / 9} width="full" borderBottomColor="gray.700" borderBottomWidth="1">
                        <HStack width="full" height="full">
                            <ReactPlayer
                                url={shows[show].yt}
                                width="100%"
                                height="100%"
                                controls={true}
                            />
                        </HStack>
                    </AspectRatio>
                    <VStack width="full" position="relative">
                        <HStack px="6" py="3" pb="1.5" alignItems="center" justifyContent="space-between">
                            <Text color="white" fontSize="2xl" fontWeight="medium" >{shows[show].fullName}</Text>

                            <Button onPress={() => setIsOpen(!isOpen)} variant="ghost">
                                <ChevronUpIcon />
                            </Button>
                        </HStack>
                        <HStack px="6" justifyContent="flex-start">
                            <Text color="gray.400" fontSize="xs">{shows[show].date}</Text>
                            &ensp;.
                            <Text color="gray.400" fontSize="xs">{shows[show].rating}</Text>
                        </HStack>
                        <Box px="6" py="3">
                            {isOpen ? "" : <Text color="gray.400" fontSize="md">{shows[show].desc}</Text>}
                        </Box>

                        <VStack position="absolute" height="full" width="full" left={isOpen ? "0" : -window.innerWidth} bg="muted.900" py="3">
                            <HStack height="12" width="full" justifyContent="space-between" alignItems="center" px="6">
                                <Text color="white" fontSize="xl" fontWeight="medium" >Comments</Text>

                                <Button onPress={() => setIsOpen(!isOpen)} variant="ghost">
                                    <CloseIcon />
                                </Button>
                            </HStack>
                            <HStack height="16" width="full" justifyContent="space-between" alignItems="center" px="6">
                                <Avatar
                                    source={{
                                        uri: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                                    }}
                                    alignSelf="center"
                                    bg="amber.500"
                                    size="sm"
                                />

                                <Input
                                    type="text"
                                    w="70%"
                                    variant="underlined"
                                    _focus={{ borderWidth: 0 }}
                                    // InputRightElement={<Button size="xs" rounded="none" w="1/6" h="full">hi</Button>}
                                    placeholder="Enter Message"
                                    value={message}
                                    onChangeText={(t) => setMessage(t)}
                                />
                                <Button size="xs" rounded="none" variant="ghost" w="10%">
                                    <ChevronRightIcon />
                                </Button>
                            </HStack>
                            <VStack width="full" px="6">
                                <HStack width="full" justifyContent="space-between" alignItems="flex-start">
                                    <Avatar
                                        source={{
                                            uri: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                                        }}
                                        alignSelf="flex-start"
                                        bg="amber.500"
                                        size="sm"
                                        mr="6"
                                    />
                                    <Text color="gray.400" fontSize="md">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam perferendis quis exercitationem fuga vero placeat unde quos ab optio suscipit? Deserunt, officiis natus eveniet illum ad ipsum molestias mollitia recusandae!</Text>
                                </HStack>
                            </VStack>
                        </VStack>
                    </VStack>
                </Stack> : ""}
            <Hidden till="lg">
                <Stack direction={["column", "column", "column", "row"]} height="full" bg="green.800" width={["full", "full", "full", "2/5", "2/6"]}></Stack>
            </Hidden>
        </Box>
    )
}

const ToggleDarkMode = (): JSX.Element => {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <Box>
            <IconButton onPress={toggleColorMode}>
                {colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
            </IconButton>
        </Box>
    );
}

export default Play;