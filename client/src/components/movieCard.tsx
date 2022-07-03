import { AspectRatio, Center, Pressable, Image, Text } from "native-base";

const MovieCard = ({ show, setShow, index }: { show: any, setShow: Function, index: number }): JSX.Element => {
    return (
        <AspectRatio height={["95%", "95%", "90%"]} ratio={3 / 4} key={show.id} >
            <Pressable height="full" width="full" onPress={() => setShow(index)}>
                {({ isHovered }) => (
                    <Center position="relative" height="full" width="full" overflow="hidden" borderRadius="sm">
                        <Image
                            source={{
                                uri: `./data/${show.id}/thumb.jpg`
                            }}
                            height="full"
                            width="full"
                            position="absolute" />
                        <Text color="white" fontWeight="extrabold" fontSize={isHovered ? "19" : "18"} zIndex="0" textAlign="center">{show.name.replaceAll(" ", `\n`)}</Text>
                    </Center>
                )}
            </Pressable>
        </AspectRatio>
    )
}

export default MovieCard;