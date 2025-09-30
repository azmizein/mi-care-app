const db = require("../models");
const post = db.Post;
const admin = db.Admin;

module.exports = {
  getAll: async (req, res) => {
    try {
      const posts = await post.findAll({ raw: true });
      return res.status(200).send(posts);
    } catch (err) {
      res.status(400).send(err);
    }
  },
  getBy: async (req, res) => {
    try {
      const posts = await post.findOne({
        where: {
          id: req.params.id,
        },
        include: [{ model: admin, attributes: ["username"] }],
      });
      res.status(200).send(posts);
    } catch (err) {
      res.status(400).send(err);
    }
  },
  addPost: async (req, res) => {
    try {
      const { title, description, AdminId } = req.body;

      const imageFilename = req.file.filename;

      const newPost = await post.create({
        title,
        description,
        image: imageFilename,
        AdminId,
      });

      res.status(201).json({
        message: "Postingan Berhasil Dibuat",
        newPost,
      });
    } catch (error) {
      console.error("Error creating post:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  remove: async (req, res) => {
    try {
      const postToRemove = await post.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (!postToRemove) {
        res.status(404).send("Post not found");
        return;
      }

      await postToRemove.destroy();
      const posts = await post.findAll();
      res.status(200).send(posts);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  editPost: async (req, res) => {
    try {
      const updatedFields = {
        title: req.body.title,
        description: req.body.description,
      };

      if (req.file) {
        updatedFields.image = req.file.filename;
      }

      const update = await post.update(updatedFields, {
        where: {
          id: req.params.id,
        },
      });

      res.status(200).send({
        message: "Ubah Produk Berhasil",
        update,
      });
    } catch (err) {
      console.error(err);
      res.status(400).send(err);
    }
  },
};
