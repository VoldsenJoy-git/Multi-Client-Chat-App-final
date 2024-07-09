const Chat = require("../models/chatSchema");
const User = require("../models/userSchema");

// access or create one-one chat
const accessChat = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    console.log("User id is not send in request");
    return res.status(400).send({ error: "User id is required" });
  }

  try {
    let isChat = await Chat.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.user._id } } }, // current user id
        { users: { $elemMatch: { $eq: userId } } },       // sent user id
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage");

    isChat = await User.populate(isChat, {
      path: "latestMessage.sender",
      select: "username pic email",
    });

    if (isChat.length > 0) {
      return res.send(isChat[0]); // if chat exists send it
    } else { // otherwise create a new chat
      const chatData = {
        chatName: "sender",
        isGroupChat: false,
        users: [req.user._id, userId],
      };

      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate("users", "-password");
      return res.status(200).json(FullChat);
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const fetchChats = async (req, res) => {
  if (!req.user || !req.user._id) {
    return res.status(400).send({ error: "User not authenticated" });
  }

  try {
    let results = await Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 });

    results = await User.populate(results, {
      path: "latestMessage.sender",
      select: "username pic email",
    });

    res.status(200).send(results);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const createGroupChat = async (req, res) => {
  const { users, name } = req.body;

  if (!users || !name) {
    return res.status(400).send({ message: "Please fill all the fields" });
  }

  const userArray = JSON.parse(users);

  if (userArray.length < 2) {
    return res.status(400).send("More than 2 users are required to form a group chat");
  }

  userArray.push(req.user); // adding user as admin with the group of users

  try {
    const groupChat = await Chat.create({
      chatName: name,
      users: userArray,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(fullGroupChat);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const renameGroup = async (req, res) => {
  const { chatId, chatName } = req.body;

  try {
    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      { chatName },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!updatedChat) {
      res.status(404).send({ error: "Chat not found" });
    } else {
      res.json(updatedChat);
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const removeFromGroup = async (req, res) => {
  const { chatId, userId } = req.body;

  try {
    const removed = await Chat.findByIdAndUpdate(
      chatId,
      { $pull: { users: userId } }, // remove user from chat
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!removed) {
      res.status(404).send({ error: "Chat not found" });
    } else {
      res.json(removed);
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const addToGroup = async (req, res) => {
  const { chatId, userId } = req.body;

  try {
    const added = await Chat.findByIdAndUpdate(
      chatId,
      { $push: { users: userId } },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!added) {
      res.status(404).send({ error: "Chat not found" });
    } else {
      res.json(added);
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const accessChatAdmin = async (req, res) => {
  try {
    let isChat = await Chat.find({
      isGroupChat: false,
      users: { $in: [req.user._id] }
    })
      .populate("users", "-password")
      .populate("latestMessage");

    isChat = await User.populate(isChat, {
      path: "latestMessage.sender",
      select: "username pic email",
    });

    if (isChat.length > 0) {
      res.send(isChat[0]);
    } else {
      const allUsers = await User.find({}, '_id');

      const userIds = allUsers.map((user) => user._id).filter((userId) => userId.toString() !== req.user._id.toString());

      for (const userId of userIds) {
        const chatData = {
          chatName: "Broadcast",
          isGroupChat: false,
          users: [req.user._id, userId],
        };
        await Chat.create(chatData);
      }

      res.status(200).send({ message: "Broadcast chats created" });
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
  accessChatAdmin
};
