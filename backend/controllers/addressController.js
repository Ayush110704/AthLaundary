import Address from '../models/Address.js';

// GET ALL ADDRESSES FOR A USER
export const getAddresses = async (req, res) => {
    try {
        const { email } = req.query;
        if (!email) {
            return res.status(400).json({ success: false, message: 'Email query parameter is required' });
        }
        const addresses = await Address.find({ userEmail: email.toLowerCase() });
        res.status(200).json({ success: true, data: addresses });
    } catch (error) {
        console.error('Error retrieving addresses:', error);
        res.status(500).json({ success: false, message: 'Server error retrieving addresses' });
    }
};

// ADD A NEW ADDRESS
export const addAddress = async (req, res) => {
    try {
        const { email, fullName, phone, addressLine1, watermark, city, state, pincode, isDefault } = req.body;
        if (!email) {
            return res.status(400).json({ success: false, message: 'Email is required' });
        }

        const defaultVal = isDefault || false;
        if (defaultVal) {
            // Set all other addresses for this user to isDefault: false
            await Address.updateMany({ userEmail: email.toLowerCase() }, { isDefault: false });
        }

        const newAddress = new Address({
            userEmail: email.toLowerCase(),
            fullName,
            phone,
            addressLine1,
            watermark,
            city,
            state,
            pincode,
            isDefault: defaultVal
        });

        await newAddress.save();
        res.status(201).json({ success: true, data: newAddress });
    } catch (error) {
        console.error('Error saving address:', error);
        res.status(500).json({ success: false, message: 'Server error saving address' });
    }
};

// UPDATE AN ADDRESS
export const updateAddress = async (req, res) => {
    try {
        const { id } = req.params;
        const { fullName, phone, addressLine1, watermark, city, state, pincode, isDefault } = req.body;

        const address = await Address.findById(id);
        if (!address) {
            return res.status(404).json({ success: false, message: 'Address not found' });
        }

        if (isDefault) {
            // Set all other addresses for this user to isDefault: false
            await Address.updateMany({ userEmail: address.userEmail }, { isDefault: false });
        }

        address.fullName = fullName || address.fullName;
        address.phone = phone || address.phone;
        address.addressLine1 = addressLine1 || address.addressLine1;
        address.watermark = watermark !== undefined ? watermark : address.watermark;
        address.city = city || address.city;
        address.state = state || address.state;
        address.pincode = pincode || address.pincode;
        address.isDefault = isDefault !== undefined ? isDefault : address.isDefault;

        await address.save();
        res.status(200).json({ success: true, data: address });
    } catch (error) {
        console.error('Error updating address:', error);
        res.status(500).json({ success: false, message: 'Server error updating address' });
    }
};

// DELETE AN ADDRESS
export const deleteAddress = async (req, res) => {
    try {
        const { id } = req.params;
        const address = await Address.findByIdAndDelete(id);
        if (!address) {
            return res.status(404).json({ success: false, message: 'Address not found' });
        }
        res.status(200).json({ success: true, message: 'Address deleted successfully' });
    } catch (error) {
        console.error('Error deleting address:', error);
        res.status(500).json({ success: false, message: 'Server error deleting address' });
    }
};
