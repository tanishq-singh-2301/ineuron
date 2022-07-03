import { Avatar, Box, HStack, VStack, Text } from "native-base";
import { MutableRefObject } from "react";
import ReactPlayer from "react-player";

const Message = ({ message, video }: { message: any, video: MutableRefObject<ReactPlayer | null> }): JSX.Element => {
    return (
        <HStack key={Math.random()} width="full" justifyContent="flex-end" alignItems="flex-end" py="5" px="6" _dark={{ borderTopColor: "gray.700" }} _light={{ borderTopColor: "gray.400" }} borderTopWidth="1">
            <Box width="15%"><Avatar source={{ uri: message.uri }} alignSelf="flex-start" bg="amber.500" size="sm" mr="6" /></Box>
            <VStack width="85%">
                <HStack width="full" justifyContent="space-between">
                    <Text _dark={{ color: "gray.50" }} _light={{ color: "gray.700" }} fontWeight="medium" fontSize="sm" underline pb="1">{message.name}</Text>
                    <Text _dark={{ color: "gray.500" }} _light={{ color: "gray.400" }} fontWeight="medium" fontSize="sm" pb="1">{message.time}</Text>
                </HStack>
                <Box>
                    <Text _dark={{ color: "gray.400" }} _light={{ color: "gray.500" }} fontSize="md">
                        <Text color="blue.500" underline fontSize="md" onPress={() => video.current?.seekTo(parseInt(message.message.split(":time:")[1]))}>time</Text>
                        &ensp;{message.message.split(":time:")[0]}
                    </Text>
                </Box>
            </VStack>
        </HStack>
    )
}

export default Message;