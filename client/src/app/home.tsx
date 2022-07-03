import { Box, Image, HStack } from "native-base";
import { useState } from "react";
import MovieCard from "../components/movieCard";
import MovieDetails from "../components/movieDetails";
import TopBar from "../components/topbar";
import shows from '../data';
import ntp from '../lib/ntp';

const App = (): JSX.Element => {
  const [show, setShow] = useState(0);
  return (
    <main>
      <Box minHeight="full" justifyContent="center" >
        <Image source={{ uri: `./data/${shows[show].id}/video_thumb.jpg` }} resizeMode="cover" width="full" resizeMethod="resize" minHeight="full" position="absolute" />

        <Box zIndex="2" height="full" width="full" px={["6", "7", "9", "16", "24"]} >

          <TopBar />

          <MovieDetails show={show} />

          <HStack width="full" height={[ntp(3.2 / 7 * 100), ntp(2.2 / 7 * 100)]} alignItems="self-start" justifyContent="flex-start" overflowX="scroll" space="5" px="2" >
            {shows.map((show, index) => <MovieCard show={show} index={index} setShow={setShow} key={Math.random()} />)}
          </HStack>

        </Box>
      </Box>
    </main>
  );
}

export default App;