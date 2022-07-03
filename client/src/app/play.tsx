import { AspectRatio, Box, Text, Link, Heading, Hidden, HStack, Stack, VStack, Button, Center, ChevronUpIcon, Avatar, Input, ChevronRightIcon, CloseIcon, useColorMode } from 'native-base';
import shows from '../data';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { IoSearchOutline } from 'react-icons/io5';
import { faker } from '@faker-js/faker';
import useWebSocket from 'react-use-websocket';
import moment from 'moment';
import Message from '../components/message';
import ToggleMode from '../components/toggleMode';

// Fake username and profile
const name = faker.name.findName();
const profile_uri = faker.image.people();

const Play = (): JSX.Element => {
    const params = useParams();
    const navigate = useNavigate();
    const { colorMode } = useColorMode();
    const [show, setShow] = useState<number | null>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [userMessages, setUserMessages] = useState<{ name: string, time: string, message: string, uri: string }[]>([]);
    const video = useRef<ReactPlayer | null>(null);
    const { sendMessage, lastMessage, readyState } = useWebSocket(process.env.REACT_APP_PUBLIC_WS_ENDPOINT as string);
    const [live, setLive] = useState(1);

    // Setting up show index
    useEffect(() => {
        if (params.index) setShow(parseInt(params.index) - 1)
        else navigate("/");

        // eslint-disable-next-line
    }, []);

    // Send socket mesaages
    const sendMessageForChat = (uid: string) => {
        if (message.length > 0)
            sendMessage(JSON.stringify({
                action: "message",
                uid,
                name,
                message: message.concat(":time:", `${Math.floor(video.current?.getCurrentTime() ?? 0)}`),
                uri: profile_uri
            }));

        setMessage("")
    }

    // Join room after websocket is opened
    useEffect(() => {
        if ((readyState === 1) && (show !== null))
            sendMessage(JSON.stringify({
                action: "join",
                uid: shows[show].yt.split("v=")[1],
                name
            }));
        // eslint-disable-next-line
    }, [readyState]);

    // Collect the messages from websocket
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

    return (
        <Box minHeight="full" justifyContent="center" flexDirection={["column", "column", "column", "row"]} position="relative">
            {(show !== null) ?
                <Stack direction="column" height="full" _dark={{ bg: "muted.900" }} _light={{ bg: "gray.50" }} width={["full", "full", "full", "3/5", "4/6"]}>

                    {/* Top Bar */}
                    <HStack height={["12", "12", "12", "16"]} px="5" alignItems="center" width="full" _dark={{ borderBottomColor: "gray.700" }} _light={{ borderBottomColor: "gray.400" }} borderBottomWidth="1">
                        <Heading _dark={{ color: "gray.50" }} _light={{ color: "gray.800" }} fontSize="lg" fontWeight="bold" >
                            <Link href="/">NativeBase</Link>
                        </Heading>
                    </HStack>

                    {/* Movie Player */}
                    <AspectRatio ratio={16 / 9} height="full" _dark={{ borderBottomColor: "gray.700" }} _light={{ borderBottomColor: "gray.400" }} borderBottomWidth={["1", "1", "1", "0"]}>
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
                    <VStack width="full" position="relative" px="2">

                        {/* Movie Name and crousal */}
                        <HStack px="6" py="3" pt={[3, 3, 3, 0]} pb="1.5" alignItems="center" justifyContent="space-between">
                            <Text _dark={{ color: "white" }} _light={{ color: "gray.900" }} fontSize="2xl" fontWeight="medium" >{shows[show].fullName}</Text>
                            <Hidden from="xl">
                                <Button onPress={() => setIsOpen(!isOpen)} variant="ghost">
                                    <ChevronUpIcon />
                                </Button>
                            </Hidden>
                            <Text fontSize="md" fontWeight="medium" _dark={{ color: "error.600" }} _light={{ color: "error.800", fontWeight: "semibold" }}>Live {live}</Text>
                        </HStack>

                        {/* Movie Details */}
                        {isOpen ? "" :
                            <VStack width="full">
                                <HStack px="6" justifyContent="flex-start">
                                    <Text _dark={{ color: "gray.400" }} _light={{ color: "gray.600" }} fontSize="xs">{shows[show].date}</Text>&ensp;.
                                    <Text _dark={{ color: "gray.400" }} _light={{ color: "gray.600" }} fontSize="xs">{shows[show].rating}</Text>
                                </HStack>
                                <Box px="6" py="3" >
                                    <Text _dark={{ color: "gray.400" }} _light={{ color: "gray.600" }} fontSize="md">{shows[show].desc}</Text>
                                </Box>
                            </VStack>}

                        {/* Large screen comments */}
                        {isOpen ?
                            <VStack position="absolute" width="full" _dark={{ bg: "muted.900" }} _light={{ bg: "gray.50" }} py="3" pt="0">
                                <HStack height="12" width="full" justifyContent="space-between" alignItems="center" px="6" _dark={{ borderBottomColor: "gray.700" }} _light={{ borderBottomColor: "gray.400" }} borderBottomWidth="1">
                                    <Text _dark={{ color: "white" }} _light={{ color: "black" }} fontSize="xl" fontWeight="medium" >Comments</Text>
                                    <Button onPress={() => setIsOpen(!isOpen)} variant="ghost">
                                        <CloseIcon />
                                    </Button>
                                </HStack>
                                <HStack height="16" width="full" justifyContent="space-between" alignItems="center" px="6" _dark={{ borderBottomColor: "gray.700" }} _light={{ borderBottomColor: "gray.400" }} borderBottomWidth="1">
                                    <Avatar source={{ uri: profile_uri }} alignSelf="center" bg="amber.500" size="sm" />
                                    <Input type="text" w="70%" variant="underlined" placeholder="Enter Message" value={message} _dark={{ color: "white" }} _light={{ color: "black" }} onChangeText={(t) => setMessage(t)} />
                                    <Button size="xs" rounded="none" variant="ghost" w="10%" onPress={() => sendMessageForChat(shows[show ?? 0].yt.split("v=")[1])}>
                                        <ChevronRightIcon />
                                    </Button>
                                </HStack>
                                <VStack width="full" overflowY="scroll" height="285px" >
                                    {userMessages.map((message) => <Message message={message} video={video} key={Math.random()} />)}
                                </VStack>
                            </VStack> : ""}

                    </VStack>
                </Stack> : ""}

            {/* Small screen comments */}
            <Hidden till="lg">
                <Stack direction={["column", "column", "column", "row"]} height="full" _dark={{ bg: "muted.900" }} _light={{ bg: "gray.50" }} width={["full", "full", "full", "2/5", "2/6"]}>
                    <VStack width="full" height="full" pl="0" px="5">

                        {/* User Input */}
                        <HStack height="16" width="full" justifyContent="flex-end" alignItems="center" _dark={{ borderBottomColor: "gray.700" }} _light={{ borderBottomColor: "gray.400" }} borderBottomWidth="1">
                            <ToggleMode />
                            <IoSearchOutline size={26} color={colorMode === "dark" ? "white" : "black"} />
                            <Avatar source={{ uri: profile_uri }} alignSelf="center" bg="amber.500" size="9" ml="4" />
                        </HStack>

                        {/* Messages */}
                        <Center height="90%" width="full" py="8" >
                            <VStack height="full" width="full" borderRadius="2" borderWidth="1" _dark={{ borderColor: "gray.700" }} _light={{ borderColor: "gray.400" }}>
                                <VStack width="full" maxHeight="90%" height="90%" justifyContent="flex-end" overflowY="scroll">
                                    {userMessages.map((message) => <Message message={message} video={video} key={Math.random()} />)}
                                </VStack>
                                <HStack width="full" alignItems="center" justifyContent="space-between" px="5" height="10%" _dark={{ borderTopColor: "gray.700" }} _light={{ borderTopColor: "gray.400" }} borderTopWidth="1">
                                    <Avatar source={{ uri: profile_uri }} alignSelf="center" bg="amber.500" size="sm" />
                                    <Input type="text" w="70%" variant="underlined" placeholder="Enter Message" value={message} _dark={{ color: "white" }} _light={{ color: "black" }} onChangeText={(t) => setMessage(t)} />
                                    <Button size="xs" rounded="none" variant="ghost" w="10%" onPress={() => sendMessageForChat(shows[show ?? 0].yt.split("v=")[1])}>
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

export default Play;