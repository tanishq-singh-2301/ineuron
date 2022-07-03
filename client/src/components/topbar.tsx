import { Avatar, Center, Hidden, HStack, Link, Text } from "native-base"
import { IoSearchOutline } from "react-icons/io5"

const TopBar = (): JSX.Element => {

    return (
        <HStack width="full" height={`${1 / 7 * 100}%`} justifyContent="space-between" alignItems="center">

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
                        ml="10" />
                </HStack>
            </Center>

        </HStack>
    )
}

export default TopBar;