import userModel from "../models/user.model.js";

/**
 * @desc    Submit application to become a vendor
 * @route   PUT /api/vendor/apply
 * @access  Private
 */
export const applyToSell = async (req, res) => {
  try {
    const userId = req.user.id;
    const storeName = req.body.storeName?.trim();
    const storeDescription = req.body.storeDescription?.trim();

    if (!storeName || !storeDescription) {
      return res.status(400).json({
        success: false,
        message: "Store name and store description are required.",
      });
    }

    const user = await userModel.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (user.role === "Vendor") {
      return res.status(400).json({
        success: false,
        message: "You have already applied to be a vendor.",
      });
    }

    user.role = "Vendor";
    user.vendorDetails = {
      ...user.vendorDetails,
      storeName,
      storeDescription,
      isApproved: true,
    };

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Application received successfully.",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
        vendorDetails: user.vendorDetails,
      },
    });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern?.["vendorDetails.storeName"]) {
      return res.status(400).json({
        success: false,
        message: "This store name is already taken. Please choose another.",
      });
    }

    console.error("Vendor Application Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
