import Contact from "../models/contact-model.js";


const createContact = async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const newContact = new Contact({ name, email, message });
        await newContact.save();
        res.status(201).json({ message: "Your message has been sent successfully" });
    } catch (error) {
        res.status(500).json({ message:"Problem in send a message", error: error.message });
    }
}

const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: "Problem in fetching messages", error: error.message });
    }
}

const getContactById = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({ message: "Contact not found" });
        }
        res.status(200).json(contact);
    } catch (error) {
        res.status(500).json({ message: "Problem in fetching message", error: error.message });
    }
}

const updateContact = async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const contact = await Contact.findByIdAndUpdate(req.params.id, { name, email, message }, { new: true });
        if (!contact) {
            return res.status(404).json({ message: "Contact not found" });
        }
        res.status(200).json(contact);       
    } catch (error) {
        res.status(500).json({ message: "Problem in updating message", error: error.message });
    }
}

const deleteContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        if (!contact) {
            return res.status(404).json({ message: "Contact not found" });
        }
        res.status(200).json({ message: "Contact deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Problem in deleting message", error: error.message });
    }
}

export { createContact, getAllContacts, getContactById, updateContact, deleteContact };