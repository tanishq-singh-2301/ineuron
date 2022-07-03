import { VStack, HStack, Heading, Text, Link, Button } from "native-base";
import shows from '../data';
import ntp from '../lib/ntp';

const movieDetails = ({ show }: { show: number }): JSX.Element => {
    return (
        <VStack width="full" height={[ntp(2.8 / 7 * 100), ntp(3.8 / 7 * 100)]} py="8" >
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
    )
}

export default movieDetails;