import { AspectRatio, Box, Text, Heading, Hidden, HStack, Stack, VStack, Button, Center, ChevronUpIcon, Avatar, Input, ChevronRightIcon, CloseIcon } from 'native-base';
import shows from '../data';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import ReactPlayer from 'react-player';
import { IoSearchOutline } from 'react-icons/io5';
import { WsContext } from '../../context/websocket';

const Play = (): JSX.Element => {
    const params = useParams();
    const navigate = useNavigate();
    // const { colorMode } = useColorMode();
    const [show, setShow] = useState<number | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const { ws } = useContext(WsContext);

    const sendMessage = (message: string) => {
        if (typeof window !== "undefined") {
            try {
                ws.send(message)
            } catch {
                window.location.replace(window.location.origin);
            }
        };

        ws.onmessage = message => {
            console.log(message);
        }
    };

    useEffect(() => {
        if (params.index)
            setShow(parseInt(params.index) - 1)

        else
            navigate("/");

        // eslint-disable-next-line
    }, []);

    return (
        <Box
            minHeight="full"
            justifyContent="center"
            flexDirection={["column", "column", "column", "row"]}
            position="relative"
        >
            {(show !== null) ?
                <Stack direction="column" height="full" bg="muted.900" width={["full", "full", "full", "3/5", "4/6"]}>
                    <HStack height={["12", "12", "12", "16"]} px="5" alignItems="center" width="full" borderBottomColor="gray.700" borderBottomWidth="1">
                        <Heading color="gray.50" fontSize="lg" fontWeight="bold" >INeuron</Heading>
                    </HStack>
                    <AspectRatio ratio={16 / 9} height="full" borderBottomColor="gray.700" borderBottomWidth={["1", "1", "1", "0"]}>
                        <HStack px={[0, 0, 0, 8]} pt={[0, 0, 0, 8]} pb={[0, 0, 0, 6]}>
                            <ReactPlayer
                                url={shows[show].yt}
                                width="100%"
                                height="100%"
                                controls={true}
                            />
                        </HStack>
                    </AspectRatio>
                    <VStack width="full" position="relative">
                        <HStack px="6" py="3" pt={[3, 3, 3, 0]} pb="1.5" alignItems="center" justifyContent="space-between">
                            <Text color="white" fontSize="2xl" fontWeight="medium" >{shows[show].fullName}</Text>

                            <Hidden from="xl">
                                <Button onPress={() => setIsOpen(!isOpen)} variant="ghost">
                                    <ChevronUpIcon />
                                </Button>
                            </Hidden>
                        </HStack>
                        {isOpen ? "" : <VStack width="full">
                            <HStack px="6" justifyContent="flex-start">
                                <Text color="gray.400" fontSize="xs">{shows[show].date}</Text>
                                &ensp;.
                                <Text color="gray.400" fontSize="xs">{shows[show].rating}</Text>
                            </HStack>
                            <Box px="6" py="3" >
                                <Text color="gray.400" fontSize="md">{shows[show].desc}</Text>
                            </Box>
                        </VStack>}

                        {isOpen ? <VStack position="absolute" width="full" bg="muted.900" py="3" pt="0">
                            <HStack height="12" width="full" justifyContent="space-between" alignItems="center" px="6" borderBottomColor="gray.700" borderBottomWidth="1">
                                <Text color="white" fontSize="xl" fontWeight="medium" >Comments</Text>

                                <Button onPress={() => setIsOpen(!isOpen)} variant="ghost">
                                    <CloseIcon />
                                </Button>
                            </HStack>
                            <HStack height="16" width="full" justifyContent="space-between" alignItems="center" px="6" borderBottomColor="gray.700" borderBottomWidth="1">
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
                                    placeholder="Enter Message"
                                    value={message}
                                    onChangeText={(t) => setMessage(t)}
                                />
                                <Button size="xs" rounded="none" variant="ghost" w="10%">
                                    <ChevronRightIcon />
                                </Button>
                            </HStack>
                            <VStack
                                width="full"
                                overflowY="scroll"
                                height="285px"
                            >

                                <HStack width="full" justifyContent="space-between" alignItems="flex-start" py="5" px="6" borderBottomColor="gray.700" borderBottomWidth="1">
                                    <Avatar
                                        source={{
                                            uri: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                                        }}
                                        alignSelf="flex-start"
                                        bg="amber.500"
                                        size="sm"
                                        mr="6"
                                    />
                                    <Text color="gray.400" fontSize="md">
                                        <Text color="blue.400" fontSize="md">11:11</Text>&ensp;
                                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam perferendis quis exercitationem fuga vero placeat unde quos ab optio suscipit? Deserunt, officiis natus eveniet illum ad ipsum molestias mollitia recusandae!
                                    </Text>
                                </HStack>

                            </VStack>
                        </VStack> : ""}
                    </VStack>
                </Stack> : ""}
            <Hidden till="lg">
                <Stack direction={["column", "column", "column", "row"]} height="full" bg="muted.900" width={["full", "full", "full", "2/5", "2/6"]}>
                    <VStack width="full" height="full" px="5">
                        <HStack height="16" width="full" justifyContent="flex-end" alignItems="center" borderBottomColor="gray.700" borderBottomWidth="1">
                            <IoSearchOutline size={26} color="white" />

                            <Avatar
                                source={{
                                    uri: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                                }}
                                alignSelf="center"
                                bg="amber.500"
                                size="9"
                                ml="8"
                            />
                        </HStack>
                        <Center height="90%" width="full" py="8" >
                            <VStack height="full" width="full" borderRadius="2" borderWidth="1" borderColor="gray.700">
                                <VStack width="full" height="90%" justifyContent="flex-end">

                                    <HStack width="full" justifyContent="space-between" alignItems="flex-start" py="5" px="6" borderTopColor="gray.700" borderTopWidth="1">
                                        <Avatar
                                            source={{
                                                uri: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                                            }}
                                            alignSelf="flex-start"
                                            bg="amber.500"
                                            size="sm"
                                            mr="6"
                                        />
                                        <Text color="gray.400" fontSize="md">
                                            <Text color="blue.400" fontSize="md">11:11</Text>&ensp;
                                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam perferendis quis exercitationem fuga vero placeat unde quos ab optio suscipit? Deserunt, officiis natus eveniet illum ad ipsum molestias mollitia recusandae!
                                        </Text>
                                    </HStack>

                                </VStack>
                                <HStack width="full" alignItems="center" justifyContent="space-between" px="5" height="10%" borderTopColor="gray.700" borderTopWidth="1">
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
                                        placeholder="Enter Message"
                                        value={message}
                                        onChangeText={(t) => setMessage(t)}
                                        color="white"
                                    />
                                    <Button size="xs" rounded="none" variant="ghost" w="10%">
                                        <ChevronRightIcon />
                                    </Button>
                                </HStack>
                            </VStack>
                        </Center>
                    </VStack>
                </Stack>
            </Hidden>
        </Box>
    )
}

// const ToggleDarkMode = (): JSX.Element => {
//     const { colorMode, toggleColorMode } = useColorMode();
//     return (
//         <Box>
//             <IconButton onPress={toggleColorMode}>
//                 {colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
//             </IconButton>
//         </Box>
//     );
// }

export default Play;