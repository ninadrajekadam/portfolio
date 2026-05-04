import Profile from "../models/Profile.js";

export const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const saveProfile = async (req, res) => {
  try {
    const { name, email, role, about } = req.body;

    const profileImage = req.files?.profileImage?.[0]? `profile/${req.files.profileImage[0].filename}`: undefined;
    const cvFile = req.files?.cvFile?.[0]? `pdf/${req.files.cvFile[0].filename}`: undefined;

    let profile = await Profile.findOne();

    if (profile) {
      profile.name = name;
      profile.email = email;
      profile.role = role;
      profile.about = about;

      if (profileImage) profile.profileImage = profileImage;
      if (cvFile) profile.cvFile = cvFile;

      await profile.save();
    } else {
      profile = await Profile.create({
        name,
        email,
        role,
        about,
        profileImage,
        cvFile,
      });
    }

    res.json({
      success: true,
      message: "Profile saved successfully",
      profile,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, email, role, about } = req.body;

    const profileImage = req.files?.profileImage?.[0]?.filename;
    const cvFile = req.files?.cvFile?.[0]?.filename;

    let profile = await Profile.findOne();

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    profile.name = name;
    profile.email = email;
    profile.role = role;
    profile.about = about;

    if (profileImage) profile.profileImage = profileImage;
    if (cvFile) profile.cvFile = cvFile;

    await profile.save();

    res.json({
      success: true,
      message: "Profile updated successfully",
      profile,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};