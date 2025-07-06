import Content from '../models/Content.js';

// Admin: Create new content
export const createContent = async (req, res) => {
  try {
    const { title, body, mediaUrl, category } = req.body;

    const content = await Content.create({
      title,
      body,
      mediaUrl,
      category,
      createdBy: req.user.id,
    });

    res.status(201).json({ message: 'Content created', content });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Failed to create content' });
  }
};

// Get all content (optionally filtered by category)
export const getAllContent = async (req, res) => {
  try {
    const filter = req.query.category ? { category: req.query.category } : {};
    const contents = await Content.find(filter).sort({ createdAt: -1 });
    res.json(contents);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Failed to fetch content' });
  }
};

// Get single content by ID
export const getContentById = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
    if (!content) return res.status(404).json({ message: 'Content not found' });
    res.json(content);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch content' });
  }
};

// Admin: Update content
export const updateContent = async (req, res) => {
  try {
    const updated = await Content.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Content not found' });

    res.json({ message: 'Content updated', content: updated });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update content' });
  }
};

// Admin: Delete content
export const deleteContent = async (req, res) => {
  try {
    const deleted = await Content.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Content not found' });

    res.json({ message: 'Content deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Failed to delete content' });
  }
};

// Get latest content (e.g., for homepage tips or feed)
export const getLatestContent = async (req, res) => {
  try {
    const latest = await Content.findOne().sort({ createdAt: -1 });
    res.json(latest);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch latest content' });
  }
};
