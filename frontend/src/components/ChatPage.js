import { Box, Grid } from "@chakra-ui/react";
import { useState } from "react";
import MyChats from "../components/MyChats";
import ChatBox from "../components/ChatBox";
import { ChatState } from "../context/ChatProvider";
import AdminComponent from "./AdminComponent";
import AdminChatBox from "./AdminChatBox";
import LeftHeader from "../components/LeftHeader";

const Chatpage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();
  const [admin, selectAdmin] = useState(false);

  return (
    <div style={{ width: "100%", position: "relative" }}>
      {user && (
        <Grid templateColumns="30% 70%" gap={0} h="100%">
          <Box
            bg="transparent"
            backdropFilter="blur(30px)"
            p={4}
            h="100%"
            position="relative" // Ensure the parent container has a position set
            zIndex="10" // Higher z-index for LeftHeader to overlay ChatBox
          >
            <LeftHeader /> {/* Use LeftHeader instead of SideDrawer */}
            {user.username === "admin" ? (
              <AdminComponent
                selectAdmin={selectAdmin}
                fetchAgain={fetchAgain}
                setFetchAgain={setFetchAgain}
              />
            ) : (
              <MyChats fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
            )}
          </Box>
          <Box
            bg="transparent"
            backdropFilter="blur(30px)"
            p={0}
            h="100%"
            position="relative" // Ensure the parent container has a position set
            zIndex="1" // Lower z-index for ChatBox to stay below LeftHeader
          >
            {user.username !== "admin" ? (
              <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
            ) : (
              <AdminChatBox
                admin={admin}
                fetchAgain={fetchAgain}
                setFetchAgain={setFetchAgain}
              />
            )}
          </Box>
        </Grid>
      )}
    </div>
  );
};

export default Chatpage;
