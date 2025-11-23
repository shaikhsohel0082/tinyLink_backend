import Link from "../model/links.js";
import generateCode from "../utils/generateCode.js"


// POST /api/links
export const createLink = async (req, res) => {
  try {
    const { url, code } = req.body;

    // Validate URL
    try {
      new URL(url);
    } catch {
      return res.status(400).json({ message: "Invalid URL" });
    }

    // custom code exists?
    if (code) {
      const exists = await Link.findOne({ code });
      if (exists)
        return res.status(409).json({error:true, message: "Code already exists" });
    }
    
    const finalCode = code || generateCode(6);

    const newLink = await Link.create({
      code: finalCode,
      url,
    });

    res.status(201).json(newLink);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/links
export const getAllLinks = async (req, res) => {
  try {
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 5;

    const skip = (page - 1) * limit;

    const totalLinks = await Link.countDocuments();

    const links = await Link.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

   

    const totalPages = Math.ceil(totalLinks / limit);

    res.json({
      links,
      totalPages,
      currentPage: page,
      limit
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};


// GET /api/links/:code
export const getSingleLink = async (req, res) => {
  const { code } = req.params;

  const link = await Link.findOne({ code });
  if (!link) return res.status(404).json({ message: "Not found" });

  res.json(link);
};

// DELETE /api/links/:code
export const deleteLink = async (req, res) => {
  const { code } = req.params;

  const deleted = await Link.findOneAndDelete({ code });
  if (!deleted) return res.status(404).json({ message: "Not found" });

  res.json({ message: "Deleted successfully" });
};
