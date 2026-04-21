import { User } from '../models/User.js';

/**
 * @desc    Submit application to become a vendor
 * @route   PUT /api/vendors/apply
 * @access  Private (Requires JWT Middleware)
 */
export const applyToSell = async (req, res) => {
  try {
    // req.user is populated by your JWT verification middleware
    const userId = req.user.id; 
    const { storeName, storeDescription } = req.body;

    // 1. Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // 2. Prevent re-application if they are already a vendor
    if (user.role === 'Vendor') {
      return res.status(400).json({ message: 'You have already applied to be a vendor.' });
    }

    // 3. Update the user document
    user.role = 'Vendor';
    user.vendorDetails = {
      storeName,
      storeDescription,
      isApproved: true, 
    };

    await user.save();

    // 4. Return success
    return res.status(200).json({
      success: true,
      message: 'Application received successfully.',
      user: {
        id: user._id,
        role: user.role,
        isApproved: user.vendorDetails.isApproved
      }
    });

  } catch (error) {
    // Handle duplicate store name gracefully
    if (error.code === 11000 && error.keyPattern?.['vendorDetails.storeName']) {
      return res.status(400).json({ message: 'This store name is already taken. Please choose another.' });
    }
    
    console.error('Vendor Application Error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};