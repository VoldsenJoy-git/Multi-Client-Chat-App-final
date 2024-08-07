import React, { useState } from "react";
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import EmailIcon from "@mui/icons-material/Email";
import "./SignUp.css";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement, InputLeftElement } from "@chakra-ui/input";
import { Progress, Text } from '@chakra-ui/react'
import { VStack } from "@chakra-ui/layout"; // vertical stack
import { useToast } from '@chakra-ui/react';
import { Button } from "@chakra-ui/button";
import { Box } from '@chakra-ui/react'
import { MotionBox } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { ChatState } from "../context/ChatProvider";

// Firstname , lastname , Username , Email , password
import axios from 'axios';



const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [progress, setProgress] = useState(0);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate=useNavigate();
  const { setUser } = ChatState();

  const [Pic, setPic] = useState(null); // State for profile picture

    const handleTogglePassword = () => {
        setShowPassword(!showPassword); // Toggle the state to show/hide password
    };
  const toast = useToast();
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:3001/api/users/signup", {
        firstname,
        lastname,
        username,
        email,
        password,
        Pic,
      });
      
      if (response.status === 200) {
        toast({
          title: "SignUp successful",
          status: "success",
          duration: 3000,
          isClosable: true,
          position:"bottom-left",
        });
        setLoading(false);
        localStorage.setItem("userInfo", JSON.stringify(response.data));
        navigate("/chats");
      }
    } catch (error) {
      console.error("SignUp error:", error);
      console.log("Full error object:", error);
      toast({
        title: "SignUp failed",
        status: "error", 
        duration: 5000,
        isClosable: true,
        position: 'bottom-left',
        description: "An error occurred while signing up",
      });
      setLoading(false);
    }
  };

  const postDetails = (pics) => {
    setLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    console.log(pics);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "ChatBook");
      data.append("cloud_name", "joydeep-cse");
      fetch("https://api.cloudinary.com/v1_1/joydeep-cse/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());  
          console.log(data.url.toString());
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
  };

  return (
      <VStack spacing="10px">
{/* Firstname */}
      <FormControl id="firstname" isRequired>
        <FormLabel>Firstname</FormLabel>
        <InputGroup size="lg">
        <InputLeftElement
          pointerEvents="none"
          children={<FaUser fontSize="small" color="gray.300" />}
        />
        <Input
        className="input-box"
          type="text"
          placeholder='Enter Firstname'
          _placeholder={{ color: 'inherit' }}
          color='teal.700'
          variant="filled" 
          bg="gray.100" 
          focusBorderColor="#00A67D"
          _focus={{
            color: "teal.900", // Change color when focused
            bgColor: "gray.100"
          }}
          onChange={(e) => {
            setFirstname(e.target.value);
          }}
        /></InputGroup>
      </FormControl>
{/* Lastname */}
      <FormControl id="lastname" isRequired>
        <FormLabel>Lastname</FormLabel>
        <InputGroup size="lg">
        <InputLeftElement
          pointerEvents="none"
          children={<FaUser fontSize="small" color="gray.300" />}
        />
        <Input
        className="input-box"
          type="text"
          placeholder='Enter Lastname'
          _placeholder={{ color: 'inherit' }}
          color='teal.700'
          variant="filled" 
          bg="gray.100" 
          focusBorderColor="#00A67D"
          _focus={{
            color: "teal.900", // Change color when focused
            bgColor: "gray.100"
          }}
          onChange={(e) => {
            setLastname(e.target.value);
          }}
        /></InputGroup>
      </FormControl>
{/* Username  */}
      <FormControl id="username" isRequired>
        <FormLabel>Username</FormLabel>
        <InputGroup size="lg">
        <InputLeftElement
          pointerEvents="none"
          children={<FaUser fontSize="small" color="gray.300" />}
        />
        <Input
        className="input-box"
          type="text"
          placeholder='Enter Your Username'
          _placeholder={{ color: 'inherit' }}
          color='teal.700'
          variant="filled" 
          bg="gray.100" 
          focusBorderColor="#00A67D"
          _focus={{
            color: "teal.900", // Change color when focused
            bgColor: "gray.100"
          }}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        /></InputGroup>
      </FormControl>
{/* Email */}
      <FormControl id="email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <InputGroup size="lg">
        <InputLeftElement
          pointerEvents="none"
          children={<EmailIcon fontSize="small" color="gray.300" />}
        />
        <Input
        className="input-box"
          type="email"
          placeholder='Enter Your Email Address'
          _placeholder={{ color: 'inherit' }}
          color='teal.700'
          variant="filled" 
          bg="gray.100" 
          focusBorderColor="#00A67D"
          _focus={{
            color: "teal.900", // Change color when focused
            bgColor: "gray.100"
          }}
          onChange={(e) => {
            setEmail(e.target.value)
          }}
        />
        </InputGroup>
        
      </FormControl>
{/* password */}
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="lg">
        <InputLeftElement
          pointerEvents="none"
          children={<FaLock fontSize="small" color="gray.300" />}
        />
        <Input
          className="input-box"
          type={showPassword ? "text" : "password"}
          placeholder="Enter Password"
          _placeholder={{ color: 'inherit' }}
          color='teal.700'
          variant="filled" 
          bg="gray.100" 
          focusBorderColor="#00A67D"
          _focus={{
            color: "teal.900", // Change color when focused
            bgColor: "gray.100"
          }}
          onChange={(e) => {
            setPassword(e.target.value)
            setProgress(100);
          }}
        />
        <InputRightElement width="4.5rem">
              <Box as="button" h="1.75rem" size="sm" onClick={handleTogglePassword}>
                {showPassword ? <FaEyeSlash color="gray.500" /> : <FaEye color="gray.500" />}
              </Box>
        </InputRightElement>
        </InputGroup>
        
      </FormControl>
{/* Profile Picture */}
      <FormControl id="Pic" isRequired>
        <FormLabel>Profile Picture</FormLabel>
        <InputGroup size="lg">
        
        <Input
          className="input-box"
          type="file"
          accept="image/*"
          _placeholder={{ color: 'inherit' }}
          color='teal.700'
          variant="filled" 
          bg="gray.100" 
          focusBorderColor="#00A67D"
          _focus={{
            color: "teal.900", // Change color when focused
            bgColor: "gray.100"
          }}
          onChange={(e) => postDetails(e.target.files[0])}     // validates profile picture
        />
        </InputGroup>
      </FormControl>      
{/* Sign up Button */}
      <Button
          colorScheme="blue"
          width="100%"
          style={{ marginTop: 15 }}
          onClick={handleSubmit}         //handlesubmit validates the signup info
          isLoading={loading}
          className="animatedButton"
        >
        <Text className="buttonText">Sign Up</Text>
      </Button>
    </VStack>
  );
};

export default SignUp;
