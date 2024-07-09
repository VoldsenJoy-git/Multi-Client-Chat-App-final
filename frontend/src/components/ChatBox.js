import { Box } from "@chakra-ui/layout";
import "./styles.css";
import SingleChat from "./Singlechat";
import { ChatState } from "../context/ChatProvider";

const Chatbox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();

  return (
    <Box
      d={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      p={3}
      bg={selectedChat ? "url('https://wallpapercave.com/wp/hkBkZQg.jpg')" : "transparent"}
      backgroundSize="cover"
      backgroundPosition="center"
      w="100%"
      h="100%"
      overflowY="scroll"
      overflowX="hidden"
      borderRadius="lg"
      borderWidth="1px"
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};

export default Chatbox;
