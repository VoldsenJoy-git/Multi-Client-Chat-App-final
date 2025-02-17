const express = require ('express');
const { accessChat, fetchChats, createGroupChat, renameGroup, removeFromGroup, addToGroup, accessChatAdmin } = require ('../controllers/chatController.js');
const  {authMiddleware} = require ('../middleware.js'); // authenticate before exceed


const chatRouter = express.Router();

chatRouter.route("/").post(authMiddleware, accessChat);  // accessing or creating the chat
chatRouter.route("/adminchat").get(authMiddleware, accessChatAdmin);
chatRouter.route("/").get(authMiddleware, fetchChats);
chatRouter.route("/group").post(authMiddleware, createGroupChat);
chatRouter.route("/rename").put(authMiddleware, renameGroup);
chatRouter.route("/groupremove").put(authMiddleware, removeFromGroup);
chatRouter.route("/groupadd").put(authMiddleware, addToGroup);

module.exports = chatRouter;
