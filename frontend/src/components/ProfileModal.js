import { ViewIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  IconButton,
  Text,
  Image,
} from "@chakra-ui/react";
import React from "react";
import { ChatState } from "../context/ChatProvider";
const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const OverlayTwo = () => (
    <ModalOverlay bg="none" backdropFilter="auto" backdropBlur="20px" />
  );

  return (
    <>
      {children ? (
        <span
          onClick={() => {
            onOpen();
          }}
        >
          {children}
        </span>
      ) : (
        <IconButton
          d={{ base: "flex" }}
          icon={<ViewIcon />}
          onClick={() => {
            onOpen();
          }}
        />
      )}
      <Modal size="lg" onClose={onClose} isOpen={isOpen}>
        <OverlayTwo /> {/* Conditionally render overlay */}
        <ModalOverlay />
        <ModalContent
          h="410px"
          bg="transparent"
          isCentered
          boxShadow="0px 4px 12px rgba(0, 0, 0, 0.5)" // Set box shadow
          borderColor="black.300"
        >
          <ModalCloseButton />
          <ModalBody
            d="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="space-between"
          >
            <Image
              borderRadius="full"
              boxSize="150px"
              src={user.pic}
              alt={user.firstname}
            />
            <Text
              fontSize={{ base: "28px", md: "30px" }}
              fontFamily="Send Flowers cursive" // Example font family
              color="blue.200"
              pb={4} // Adjust the padding bottom as needed
            >
              {user.email}
            </Text>
            <Text
              fontSize="40px"
              fontWeight="bold"
              fontFamily="Send Flowers , cursive"
              d="flex"
              justifyContent="center"
              color="blue.200"
            >
              Username : {user.username}
            </Text>
            <Text
              fontSize="40px"
              fontWeight="bold"
              fontFamily="Send Flowers , cursive"
              d="flex"
              justifyContent="center"
              color="blue.200"
            >
              {user.firstname} {user.lastname}
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;
