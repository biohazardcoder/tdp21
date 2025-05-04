import Partner from '../models/partner-model.js';

export const getAllPartners = async (req, res) => {
    try {
        const partners = await Partner.find();
        res.status(200).json(partners);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}   

export const getPartnerById = async (req, res) => { 
    try {
        const partner = await Partner.findById(req.params.id);
        if (!partner) return res.status(404).json({ message: 'Partner not found' });
        res.status(200).json(partner);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const createPartner = async (req, res) => {
    const { title, description, link } = req.body;
    const images = req.uploadedImages;
    const partner = new Partner({ title, description, images, link });
    try {
        await partner.save();
        res.status(201).json(partner);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const updatePartner = async (req, res) => {
    const { title, description,  link } = req.body;
    const images = req.uploadedImages
    try {
        const partner = await Partner.findByIdAndUpdate(req.params.id, { title, description, images, link }, { new: true });
        if (!partner) return res.status(404).json({ message: 'Partner not found' });
        res.status(200).json(partner);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const deletePartner = async (req, res) => {
    try {
        const partner = await Partner.findByIdAndDelete(req.params.id);
        if (!partner) return res.status(404).json({ message: 'Partner not found' });
        res.status(200).json({ message: 'Partner deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


