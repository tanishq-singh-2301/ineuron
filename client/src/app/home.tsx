import { Box, useColorMode, Text, IconButton, SunIcon, MoonIcon, Image, HStack, Hidden, Center, Avatar, HamburgerIcon, Button, PresenceTransition, VStack, Link, Slide, CheckIcon, Menu, Pressable, AspectRatio } from "native-base";
import { useState } from "react";
import { IoMenuOutline } from 'react-icons/io5'

const data = [
  {
    name: "Ray and the last dragon",
    yt: `https://www.youtube.com/watch?v=1VIZ89FEjYI`,
    desc: `"Raya and the Last Dragon" takes us on an exciting, epic journey to the fantasy world of Kumandra, where humans and dragons lived together long ago in harmony. But when an evil force threatened the land, the dragons sacrificed themselves to save humanity. Now, 500 years later, that same evil has returned and it's up to a lone warrior, Raya, to track down the legendary last dragon to restore the fractured land and its divided people. However, along her journey, she’ll learn that it’ll take more than a dragon to save the world—it’s going to take trust and teamwork as well`,
    rating: 9.4,
    date: "March 5, 2021",
    id: "ray"
  },
  {
    name: "Dragons",
    yt: `https://www.youtube.com/watch?v=Vv9KJYUnVvA`,
    desc: `Hiccup (Jay Baruchel) is a Norse teenager from the island of Berk, where fighting dragons is a way of life. His progressive views and weird sense of humor make him a misfit, despite the fact that his father (Gerard Butler) is chief of the clan. Tossed into dragon-fighting school, he endeavors to prove himself as a true Viking, but when he befriends an injured dragon he names Toothless, he has the chance to plot a new course for his people's future.`,
    rating: 8.9,
    date: "April 26, 2022",
    id: "dragons"
  },
  {
    name: "John Wick",
    yt: "https://www.youtube.com/watch?v=C0BMx-qxsP4",
    desc: `An ex-hitman comes out of retirement to track down the gangsters that took everything from him. With New York City as his bullet-riddled playground, JOHN WICK (Keanu Reeves) is a fresh and stylized take on the "assassin genre".`,
    rating: 8.3,
    date: "September 15, 2020",
    id: "john"
  },
  {
    name: "Deadpool",
    yt: "https://www.youtube.com/watch?v=Sy8nPI85Ih4",
    desc: `Copyright Disclaimer Under Section 107 of the Copyright Act 1976, allowance is made for "fair use" for purposes such as criticism, comment, news reporting, teaching, scholarship, and research. Fair use is a use permitted by copyright statute that might otherwise be infringing. Non-profit, educational or personal use tips the balance in favor of fair use. No copyright infringement intended.`,
    rating: 9.2,
    date: "Octuber 15, 2301",
    id: "deadpool"
  }
]

const ntp = (num: number): string => num.toString().concat("%");

const App = (): JSX.Element => {
  const { colorMode } = useColorMode();
  const [menu, setMenu] = useState(false);

  return (
    <main id="home">
      <Box
        bg={colorMode === "light" ? "coolGray.50" : "coolGray.900"}
        minHeight="full"
        justifyContent="center"
      >
        <Image
          source={{
            uri: `./data/ray/video_thumb.jpg`
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
              <Avatar
                source={{
                  uri: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                }}
                alignSelf="center"
                bg="amber.500"
                size="md"
              />
            </Center>
          </HStack>

          <HStack
            width="full"
            height={[ntp(2.8 / 7 * 100), ntp(3.8 / 7 * 100)]}
          >
          </HStack>


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
              data.map(({ date, desc, id, name, rating, yt }) => {
                return (
                  <AspectRatio
                    height="90%"
                    ratio={3 / 4}
                    bg="white"
                    borderRadius="sm"
                    position="relative"
                    overflow="hidden"
                  >
                    <Center>
                      <Image
                        source={{
                          uri: `./data/${id}/thumb.jpg`
                        }}
                        height="full"
                        width="full"
                      />
                    </Center>
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

export default App;
