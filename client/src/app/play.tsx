import { AspectRatio, Box, Text, Heading, Hidden, HStack, Stack, VStack, Button, Center, ChevronUpIcon, Avatar, Input, ChevronRightIcon, CloseIcon } from 'native-base';
import shows from '../data';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { IoSearchOutline } from 'react-icons/io5';
import { faker } from '@faker-js/faker';
import useWebSocket from 'react-use-websocket';
import moment from 'moment';

const name = faker.name.findName();
const profile_uri = faker.image.people();

const Play = (): JSX.Element => {
    const params = useParams();
    const navigate = useNavigate();
    // const { colorMode } = useColorMode();
    const [show, setShow] = useState<number | null>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [userMessages, setUserMessages] = useState<{ name: string, time: string, message: string, uri: string }[]>([]);
    const video = useRef<ReactPlayer | null>(null);
    const { sendMessage, lastMessage, readyState } = useWebSocket(process.env.REACT_APP_PUBLIC_WS_ENDPOINT as string);
    const [live, setLive] = useState(1);

    useEffect(() => {
        if (params.index) setShow(parseInt(params.index) - 1)
        else navigate("/");
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if ((readyState === 1) && (show !== null))
            sendMessage(JSON.stringify({
                action: "join",
                uid: shows[show].yt.split("v=")[1],
                name
            }));
        // eslint-disable-next-line
    }, [readyState]);

    useEffect(() => {
        const data = lastMessage?.data;

        if (typeof data !== "string") return;
        if (data.length === 0) return;

        const jsonData = JSON.parse(data);

        switch (jsonData.action) {
            case "messasge":
                setUserMessages(prev => [...prev, { name: jsonData.name, message: jsonData.message, time: moment().fromNow(), uri: jsonData.uri }])
                break;

            case "usersConnected":
                setLive(jsonData.names.length)
                break;

            default:
                break;
        }
    }, [lastMessage]);

    const Messages = () => {
        return (
            <>
                {
                    userMessages.map(({ message, name, time, uri }) => {
                        const time_of_video = parseInt(message.split(":time:")[1])

                        return (
                            <HStack key={Math.random()} width="full" justifyContent="flex-end" alignItems="flex-end" py="5" px="6" borderTopColor="gray.700" borderTopWidth="1">
                                <Box width="15%"><Avatar source={{ uri }} alignSelf="flex-start" bg="amber.500" size="sm" mr="6" /></Box>
                                <VStack width="85%">
                                    <HStack width="full" justifyContent="space-between">
                                        <Text color="gray.50" fontWeight="medium" fontSize="sm" underline pb="1">{name}</Text>
                                        <Text color="gray.500" fontWeight="medium" fontSize="sm" pb="1">{time}</Text>
                                    </HStack>
                                    <Box>
                                        <Text color="gray.400" fontSize="md">
                                            <Text color="blue.500" underline fontSize="md" onPress={() => video.current?.seekTo(time_of_video)}>time</Text>
                                            &ensp;{message.split(":time:")[0]}
                                        </Text>
                                    </Box>
                                </VStack>
                            </HStack>
                        )
                    })
                }
            </>
        )
    }

    return (
        <Box minHeight="full" justifyContent="center" flexDirection={["column", "column", "column", "row"]} position="relative">
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
                                ref={video}
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
                                <Text color="gray.400" fontSize="xs">{shows[show].date}</Text>&ensp;.
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
                                <Avatar source={{ uri: profile_uri }} alignSelf="center" bg="amber.500" size="sm" />
                                <Input type="text" w="70%" variant="underlined" placeholder="Enter Message" value={message} color="white" onChangeText={(t) => setMessage(t)} />
                                <Button size="xs" rounded="none" variant="ghost" w="10%" onPress={() => {
                                    if (message.length > 0)
                                        sendMessage(JSON.stringify({
                                            action: "message",
                                            uid: shows[show ?? 0].yt.split("v=")[1],
                                            name,
                                            message: message.concat(":time:", `${video.current?.getCurrentTime()}`),
                                            uri: profile_uri
                                        }));
                                }}>
                                    <ChevronRightIcon />
                                </Button>
                            </HStack>
                            <VStack width="full" overflowY="scroll" height="285px" >
                                <Messages />
                            </VStack>
                        </VStack> : ""}

                    </VStack>
                </Stack> : ""}
            <Hidden till="lg">
                <Stack direction={["column", "column", "column", "row"]} height="full" bg="muted.900" width={["full", "full", "full", "2/5", "2/6"]}>
                    <VStack width="full" height="full" px="5">
                        <HStack height="16" width="full" justifyContent="space-between" alignItems="center" borderBottomColor="gray.700" borderBottomWidth="1">
                            <HStack>
                                <Text fontSize="md" fontWeight="medium" color="error.600" >Live {live}</Text>
                            </HStack>
                            <HStack>
                                <IoSearchOutline size={26} color="white" />
                                <Avatar source={{ uri: profile_uri }} alignSelf="center" bg="amber.500" size="9" ml="8" />
                            </HStack>
                        </HStack>
                        <Center height="90%" width="full" py="8" >
                            <VStack height="full" width="full" borderRadius="2" borderWidth="1" borderColor="gray.700">
                                <VStack width="full" maxHeight="90%" height="90%" justifyContent="flex-end" overflowY="scroll">
                                    <Messages />
                                </VStack>
                                <HStack width="full" alignItems="center" justifyContent="space-between" px="5" height="10%" borderTopColor="gray.700" borderTopWidth="1">
                                    <Avatar source={{ uri: profile_uri }} alignSelf="center" bg="amber.500" size="sm" />
                                    <Input type="text" w="70%" variant="underlined" placeholder="Enter Message" value={message} color="white" onChangeText={(t) => setMessage(t)} />
                                    <Button size="xs" rounded="none" variant="ghost" w="10%" onPress={() => {
                                        if (message.length > 0)
                                            sendMessage(JSON.stringify({
                                                action: "message",
                                                uid: shows[show ?? 0].yt.split("v=")[1],
                                                name,
                                                message: message.concat(":time:", `${Math.floor(video.current?.getCurrentTime() ?? 0)}`),
                                                uri: profile_uri
                                            }));
                                    }}>
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