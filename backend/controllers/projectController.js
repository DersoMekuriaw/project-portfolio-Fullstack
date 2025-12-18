
const Project = require("../models/Project");

exports.createProject = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    if (!req.file) {
      return res.status(400).json({ message: "Screenshot is required" });
    }

    const { title, description, price } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const imageUrl = `/uploads/${req.file.filename}`;

    const project = await Project.create({
      title,
      description,
      price,
      screenshot: imageUrl,
      developerId: req.user.id
    });

    res.status(201).json({
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    console.error("Create project error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


exports.getAll = async (req, res) => {
  try {
    const projects = await Project.find().populate("developerId", "name email");
    res.json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate(
      "developerId",
      "name email"
    );
    if (!project) return res.status(404).json({ message: "Not found" });
    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getByDeveloper = async (req, res) => {
  try {
    const projects = await Project.find({
      developerId: req.params.developerId,
    });
    res.json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
