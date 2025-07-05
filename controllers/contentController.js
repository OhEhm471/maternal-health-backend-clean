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

// Get all content (with optional category filter)
export const getAllContent = async (req, res) => {
  try {
    const filter = req.query.category
      ? { category: req.query.category }
      : {};

    const contents = await Content.find(filter).sort({ createdAt: -1 });

    res.json(contents);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Failed to fetch content' });
  }
};

// Admin: Delete content
export const deleteContent = async (req, res) => {
  try {
    await Content.findByIdAndDelete(req.params.id);
    res.json({ message: 'Content deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Failed to delete content' });
  }
};
