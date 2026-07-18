import Contact from '../models/Contact.js';

export const createContactMessage = async (req, res) => {
    try {
        const { firstName, lastName, email, inquiryType, message } = req.body;

        if (!firstName || !lastName || !email || !inquiryType || !message) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        const newContact = new Contact({
            firstName,
            lastName,
            email,
            inquiryType,
            message
        });

        await newContact.save();
        res.status(201).json({ success: true, message: 'Message sent and saved successfully', data: newContact });
    } catch (error) {
        console.error('Error saving contact message:', error);
        res.status(500).json({ success: false, message: 'Server error saving contact message' });
    }
};

export const getContactMessages = async (req, res) => {
    try {
        const contacts = await Contact.find({}).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: contacts });
    } catch (error) {
        console.error('Error fetching contact messages:', error);
        res.status(500).json({ success: false, message: 'Server error fetching messages' });
    }
};

export const updateContactStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!status || !['new', 'in-progress', 'resolved'].includes(status)) {
            return res.status(400).json({ success: false, message: 'Invalid or missing status' });
        }

        const updatedContact = await Contact.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!updatedContact) {
            return res.status(404).json({ success: false, message: 'Contact message not found' });
        }

        res.status(200).json({ success: true, message: 'Status updated successfully', data: updatedContact });
    } catch (error) {
        console.error('Error updating contact status:', error);
        res.status(500).json({ success: false, message: 'Server error updating status' });
    }
};

export const deleteContactMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedContact = await Contact.findByIdAndDelete(id);

        if (!deletedContact) {
            return res.status(404).json({ success: false, message: 'Contact message not found' });
        }

        res.status(200).json({ success: true, message: 'Contact message deleted successfully' });
    } catch (error) {
        console.error('Error deleting contact message:', error);
        res.status(500).json({ success: false, message: 'Server error deleting contact message' });
    }
};
