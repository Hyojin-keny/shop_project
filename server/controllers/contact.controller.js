import Contact from "../models/contact.model.js";
import errorHandler from "./error.controller.js";

const create = async (req, res) => {
  try {
    const { firstname, lastname, email, number, message } = req.body;

    // Validate required fields
    if (!firstname || !lastname || !email || !number || !message) {
      return res.status(400).json({
        error: "All fields are required"
      });
    }

    // Additional validation
    if (message.length > 1000) {
      return res.status(400).json({
        error: "Message cannot exceed 1000 characters"
      });
    }

    // Create contact data
    const contactData = {
      firstname: firstname.trim(),
      lastname: lastname.trim(),
      email: email.trim().toLowerCase(),
      number: number.trim(),
      message: message.trim(),
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.get('User-Agent') || ''
    };

    const contact = new Contact(contactData);
    const savedContact = await contact.save();

    return res.status(200).json({
      message: "Contact message sent successfully!",
      contactId: savedContact._id
    });

  } catch (err) {
    console.error("Contact creation error:", err);
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};

const list = async (req, res) => {
  try {
    const { status, page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;

    // Build query filter
    const filter = {};
    if (status && ['new', 'read', 'replied', 'resolved'].includes(status)) {
      filter.status = status;
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Get contacts with pagination
    const contacts = await Contact.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .select('-ipAddress -userAgent'); // Exclude sensitive data

    // Get total count for pagination
    const total = await Contact.countDocuments(filter);

    res.json({
      contacts,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / parseInt(limit)),
        total,
        limit: parseInt(limit)
      }
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};

const read = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.contactId);
    
    if (!contact) {
      return res.status(404).json({
        error: "Contact message not found"
      });
    }
    
    res.json(contact);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};

const update = async (req, res) => {
  try {
    const { status } = req.body;

    // Validate status
    if (status && !['new', 'read', 'replied', 'resolved'].includes(status)) {
      return res.status(400).json({
        error: "Invalid status. Must be one of: new, read, replied, resolved"
      });
    }

    const contact = await Contact.findByIdAndUpdate(
      req.params.contactId,
      { status, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    
    if (!contact) {
      return res.status(404).json({
        error: "Contact message not found"
      });
    }
    
    res.json({
      message: "Contact status updated successfully",
      contact
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};

const remove = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.contactId);
    
    if (!contact) {
      return res.status(404).json({
        error: "Contact message not found"
      });
    }
    
    res.json({ 
      message: "Contact message deleted successfully" 
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};

const contactByID = async (req, res, next, id) => {
  try {
    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).json({
        error: "Contact message not found"
      });
    }
    req.contact = contact;
    next();
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};

// Get contact statistics
const getStats = async (req, res) => {
  try {
    const stats = await Contact.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);

    const totalContacts = await Contact.countDocuments();
    const recentContacts = await Contact.countDocuments({
      createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } // Last 7 days
    });

    res.json({
      totalContacts,
      recentContacts,
      statusBreakdown: stats,
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};

export default {
  create,
  list,
  read,
  update,
  remove,
  contactByID,
  getStats
};