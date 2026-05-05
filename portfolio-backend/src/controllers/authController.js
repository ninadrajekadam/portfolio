import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ name, email, password });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const changePassword = async (req, res) => {
	try {
		const { currentPassword, newPassword, confirmPassword } = req.body;

		if (!currentPassword || !newPassword || !confirmPassword) {
			return res.status(400).json({ message: "All fields are required" });
		}

		if (newPassword !== confirmPassword) {
			return res.status(400).json({ message: "New passwords do not match" });
		}

		if (newPassword.length < 6) {
			return res.status(400).json({ message: "Password must be at least 6 characters" });
		}

		const user = await User.findById(req.user.id);

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		const isMatch = await bcrypt.compare(currentPassword, user.password);

		if (!isMatch) {
			return res.status(400).json({ message: "Current password is incorrect" });
		}

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({ message: "Password must contain at least 6 characters, including uppercase, lowercase, number and special character" });
    }

		const salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(newPassword, salt);

		await user.save();

		res.json({ message: "Password changed successfully" });

	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export { registerUser, loginUser, changePassword }; 