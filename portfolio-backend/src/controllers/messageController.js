import Message from "../models/Message.js";
import { sendEmail } from "../utils/sendEmail.js";

export const createMessage = async (req, res) => {
  try {
    const message = await Message.create(req.body);

    req.io?.emit("newMessage", message);

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getMessages = async (req, res) => {
  const messages = await Message.find().sort({ createdAt: -1 });
  res.json(messages);
};

export const getUnreadCount = async (req, res) => {
  const count = await Message.countDocuments({ isRead: false });
  res.json({ count });
};

export const markAsRead = async (req, res) => {
  await Message.findByIdAndUpdate(req.params.id, { isRead: true });
  res.json({ success: true });
};

export const replyMessage = async (req, res) => {
  try {
    const { reply } = req.body;

    if (!reply) {
      return res.status(400).json({ message: "Reply is required" });
    }

    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    message.reply = reply;
    message.repliedAt = new Date();
    await message.save();

    try {
      await sendEmail({
        to: message.email,
        subject: "Reply to your message",
        html: `
          <p>Hi ${message.name},</p>
          <p>${reply}</p>
          <br/>
          <p>Thanks & Regards,<br/>Ninad Kadam</p>
        `,
      });
    } catch (emailErr) {
      console.error("Email failed:", emailErr.message);
    }

    res.json({ success: true });
  } catch (err) {
    console.error("Reply Error:", err.message);
    res.status(500).json({ message: "Failed to send reply" });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    req.io?.emit("deleteMessage", req.params.id);

    res.json({ success: true, message: "Message deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};