import { useState } from "react";
import {
  Box,
  Text,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Flex,
  Button,
  Icon,
} from "@chakra-ui/react";
import { FaBars, FaSearch, FaUser, AddIcon } from "react-icons/fa";
import { BellIcon, HamburgerIcon, SmallAddIcon } from "@chakra-ui/icons";
import MailIcon from "@mui/icons-material/Mail";

import SideDrawer from "../components/SideDrawer";
import GroupChatModal from "../components/GroupChatModal";

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ChatState } from "../context/ChatProvider";
import { getSender } from "../config/ChatLogics";
import ProfileModal from "./ProfileModal";

import { keyframes } from "@chakra-ui/react";

//Animation of ChatBox
const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

function LeftHeader() {
  const [isSearchDrawerOpen, setIsSearchDrawerOpen] = useState(false);
  const {
    setSelectedChat,
    user,
    notification,
    setNotification,
    chats,
    setChats,
  } = ChatState();

  const handleSearchDrawerOpen = () => {
    setIsSearchDrawerOpen(true);
  };

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  return (
    <>
{/* ChatBook name */}
      <Box
      bg="#1CD060" // Background color
      py={4} // Padding top and bottom
      px={6} // Padding left and right
      mb={4} // Margin bottom
      borderRadius="md" // Rounded corners
      boxShadow="lg" // Box shadow for depth
      display="flex"
      alignItems="center"
      justifyContent="center"
      position="relative"
    >
      <Text
        fontSize="3xl"
        fontFamily="Send Flowers cursive"
        color="#B71344"
        fontWeight="bold"
        textShadow="1px 1px 2px rgba(0, 0, 0, 0.3)"
        animation={`${pulse} 2s infinite`}
      >
        ChatBook
      </Text>
    </Box>

      <Flex alignItems="center" mb={8}>
        {/* Groupchat icon */}
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<HamburgerIcon />}
            variant="outline"
            color="white" // Set the color to white
            marginRight={4}
          />

          <MenuList>
            <MenuItem>
              <GroupChatModal>
                <Button
                  d="flex"
                  fontSize={{ base: "17px", md: "10px", lg: "17px" }}
                  rightIcon={<SmallAddIcon />}
                >
                  New Group Chat
                </Button>
              </GroupChatModal>
            </MenuItem>
          </MenuList>
        </Menu>

        {/* search */}
        <Box onClick={handleSearchDrawerOpen} cursor="pointer">
          <InputGroup mr={4}>
            <Input placeholder="Search" />
            <InputRightElement>
              <IconButton
                aria-label="Search"
                icon={<FaSearch />}
                onClick={handleSearchDrawerOpen}
                padding={3}
                display={{ base: "none", md: "block" }}
              />
            </InputRightElement>
          </InputGroup>
        </Box>

        {/* Profile and logout */}
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Profile"
            icon={<Icon as={FaUser} />}
            margin={4}
            display={{ base: "none", md: "block" }}
          />
          <MenuList direction="ltr" p>
            <MenuGroup title="Profile">
              <ProfileModal user={user}>
                <MenuItem>My Account</MenuItem>
              </ProfileModal>

              <MenuItem as="button" onClick={handleLogout}>
                Log out
              </MenuItem>
            </MenuGroup>

            {/* <MenuDivider />

            <MenuGroup title='Help'>
                <MenuItem>Docs</MenuItem>
                <MenuItem>FAQ</MenuItem>
            </MenuGroup> */}
          </MenuList>
        </Menu>
        {/* Bell icon */}
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<MailIcon />}
            variant="outline"
            color="#185ABB" // Set the color
            marginRight={4}
          />

          <MenuList pl={2}>
            {!notification.length && "No New Messages"}
            {notification.map((notif) => (
              <MenuItem
                zIndex={10}
                key={notif._id}
                onClick={() => {
                  setSelectedChat(notif.chat);
                  setNotification(notification.filter((n) => n !== notif));
                }}
              >
                {notif.chat.isGroupChat
                  ? `New Message in ${notif.chat.chatName}`
                  : `New Message from ${getSender(user, notif.chat.users)}`}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
        {/* Adding sidedrawer for seacching logic */}

        <SideDrawer
          isOpen={isSearchDrawerOpen}
          onClose={() => setIsSearchDrawerOpen(false)}
        />
      </Flex>
    </>
  );
}

export default LeftHeader;
