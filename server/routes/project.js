const express = require('express');
const router = express.Router();
const Project = require('../models/project');

// GET all projects (OPTIMIZED - only essential fields for listing)
router.get('/', async (req, res) => {
  try {
    // Set cache headers (5 minutes)
    res.set('Cache-Control', 'public, max-age=300');

    const projects = await Project
      .find()
      .select('title description img tags techStack github live order') // Only fields needed for cards
      .sort({ order: 1 })
      .lean(); // Convert to plain JS objects (much faster)

    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ message: error.message });
  }
});

// GET single project (full details)
router.get('/:id', async (req, res) => {
  try {
    // Cache individual projects for longer (10 minutes)
    res.set('Cache-Control', 'public, max-age=600');

    const project = await Project
      .findById(req.params.id)
      .lean(); // Faster plain object

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(project);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid project ID' });
    }
    console.error('Error fetching project:', error);
    res.status(500).json({ message: error.message });
  }
});

// CREATE project
router.post('/', async (req, res) => {
  try {
    const project = new Project(req.body);
    const newProject = await project.save();
    res.status(201).json(newProject);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(400).json({ message: error.message });
  }
});

// UPDATE project
router.put('/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(project);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid project ID' });
    }
    console.error('Error updating project:', error);
    res.status(400).json({ message: error.message });
  }
});

// DELETE project
router.delete('/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json({ message: 'Project deleted', id: req.params.id });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid project ID' });
    }
    console.error('Error deleting project:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
