import { Box, Text, Image, HStack, Hidden, Center, Avatar, Button, VStack, Link, Pressable, AspectRatio, Heading } from "native-base";
import { useState } from "react";
import { IoSearchOutline } from 'react-icons/io5';
import shows from '../data';

const ntp = (num: number): string => num.toString().concat("%");

const App = (): JSX.Element => {
  const [show, setShow] = useState(0);
  return (
    <main>
      <Box
        minHeight="full"
        justifyContent="center"
      >
        <Image
          source={{
            uri: `./data/${shows[show].id}/video_thumb.jpg`
          }}
          resizeMode="cover"
          width="full"
          resizeMethod="resize"
          minHeight="full"
          position="absolute"
        />

        <Box
          zIndex="2"
          height="full"
          width="full"
          px={["6", "7", "9", "16", "24"]}
        >

          <HStack
            width="full"
            height={`${1 / 7 * 100}%`}
            justifyContent="space-between"
            alignItems="center"
          >


            <Hidden till="sm">
              <HStack alignItems="center" justifyContent="flex-start" space="8">
                <Link><Text color="white" fontWeight="semibold">DASHBOARD</Text></Link>
                <Link><Text color="white" fontWeight="semibold">MOVIES</Text></Link>
                <Link><Text color="white" fontWeight="semibold">SERIES</Text></Link>
                <Link><Text color="white" fontWeight="semibold">KIDS</Text></Link>
              </HStack>
            </Hidden>
            <Center>
              <HStack alignItems="center">
                <IoSearchOutline size={26} color="white" />
                <Avatar
                  source={{
                    uri: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                  }}
                  alignSelf="center"
                  bg="amber.500"
                  size="md"
                  ml="10"
                />
              </HStack>
            </Center>
          </HStack>


          <VStack
            width="full"
            height={[ntp(2.8 / 7 * 100), ntp(3.8 / 7 * 100)]}
            py="8"
          >
            <HStack height="50%" alignItems={["center", "center", "flex-end"]} maxWidth={["full", "2/3", "1/3"]} >
              <Heading color="white" fontWeight="bold" fontSize={["4xl", "5xl", "6xl", "7xl"]}>{shows[show].fullName.toUpperCase()}</Heading>
            </HStack>
            <HStack height="15%" alignItems="center">
              <Text color="success.500" fontWeight="medium" fontSize="lg">{shows[show].rating * 10}%</Text> &ensp;
              <Text color="success.500" fontWeight="medium" fontSize="lg">{shows[show].date.split(" ")[0]}</Text> &ensp;
              <Text color="white" fontWeight="medium" fontSize="lg">{shows[show].date.split(" ")[1]}</Text>
            </HStack>
            <HStack height="35%" alignItems={["center", "center", "flex-start"]}>
              <Link href={`/play/${(show + 1).toString()}`}>
                <Button py={["2.5", "3"]} px={["8", "9", "12"]} mt={[0, 0, "1.5"]} bg="purple.600" borderRadius="full" _hover={{ bg: "purple.700" }}>
                  <Text
                    color="white"
                    fontWeight="bold"
                    fontSize={["sm", "sm", "md"]}
                  >Play</Text>
                </Button>
              </Link>
            </HStack>
          </VStack>

          <HStack
            width="full"
            height={[ntp(3.2 / 7 * 100), ntp(2.2 / 7 * 100)]}
            alignItems="self-start"
            justifyContent="flex-start"
            overflowX="scroll"
            space="5"
            px="2"
          >
            {
              shows.map(({ id, name }, index) => {
                return (
                  <AspectRatio
                    height={["95%", "95%", "90%"]}
                    ratio={3 / 4}
                    key={id}
                  >
                    <Pressable height="full" width="full" onPress={() => setShow(index)}>
                      {({ isHovered }) => {
                        return (
                          <Center position="relative" height="full" width="full" overflow="hidden" borderRadius="sm">
                            <Image
                              source={{
                                uri: `./data/${id}/thumb.jpg`
                              }}
                              height="full"
                              width="full"
                              position="absolute"
                            />
                            <Text color="white" fontWeight="extrabold" fontSize={isHovered ? "19" : "18"} zIndex="0" textAlign="center" >{name.replaceAll(" ", `\n`)}</Text>
                          </Center>
                        )
                      }}

                    </Pressable>
                  </AspectRatio>
                )
              })
            }
          </HStack>

        </Box>

      </Box>
    </main>
  );
}

export default App;