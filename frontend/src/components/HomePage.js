import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import Login from "../components/Login";
import Signup from "../components/SignUp";

function Homepage() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user) navigate("/chats"); // if user is present then push it to the chat page
  }, [navigate]);

  return (
    <Container maxW="xl" centerContent>
      <Box
      d="flex"
      justifyContent="center"
      p={3}
      backdropFilter="blur(50px)" // Apply blur effect
      w="100%"
      m="40px 0 15px 0"
      borderRadius="lg"
      borderWidth="1px"
      boxShadow="0px 8px 16px rgba(0, 0, 0, 0.1)"
      bgGradient="linear(to-r, green.500, red.500)"
        color="white"
    >
       <Text fontSize="4xl"  fontWeight="bold">
        ChatBook
      </Text>
    </Box>
      <Box 
      backdropFilter="blur(50px)"  w="100%" p={4} borderRadius="lg" borderWidth="1px" 
      boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1)"  bg="blackAlpha.800" // Use blackAlpha.800 for a dark shade
                    color="green"  >
      {/* https://v2.chakra-ui.com/docs/components/tabs    chakra-ui Fitted Tabs */}
        <Tabs isFitted variant="soft-rounded" colorScheme="teal">
          <TabList mb="1em">
            <Tab>Login</Tab>
            <Tab>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}

export default Homepage;
// 1st box is for ChatBook word , 2nd box is for the login and sign-up segment