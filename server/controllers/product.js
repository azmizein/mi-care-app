const db = require("../models");
const category = db.Category;
const product = db.Product;

module.exports = {
  getAll: async (req, res) => {
    try {
      const products = await product.findAll({ raw: true });
      return res.status(200).send(products);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  getBy: async (req, res) => {
    try {
      const users = await product.findOne({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).send(users);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  getProductByCategory: async (req, res) => {
    const categoryId = req.params.CategoryId;

    try {
      const products = await product.findAll({
        where: {
          CategoryId: categoryId,
        },
      });

      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  getAllCategory: async (req, res) => {
    try {
      const result = await category.findAll({
        attributes: ["id", "categoryName", "images"],
      });
      res.status(200).send(result);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  editProduct: async (req, res) => {
    try {
      const updatedFields = {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        composition: req.body.composition,
        dosis: req.body.dosis,
        contra: req.body.contra,
        effect: req.body.effect,
        sachet: req.body.sachet,
        manufacture: req.body.manufacture,
        registration: req.body.registration,
      };

      if (req.file) {
        updatedFields.images = req.file.filename;
      }

      const update = await product.update(updatedFields, {
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

  addProduct: async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No image file uploaded" });
      }

      const imageFilename = req.file.filename;

      const createFields = {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        composition: req.body.composition,
        dosis: req.body.dosis,
        contra: req.body.contra,
        effect: req.body.effect,
        sachet: req.body.sachet,
        manufacture: req.body.manufacture,
        registration: req.body.registration,
        images: imageFilename,
        CategoryId: req.body.CategoryId,
      };

      const created = await product.create(createFields);

      res.status(200).send({
        message: "Ubah Produk Berhasil",
        created,
      });
    } catch (err) {
      console.error(err);
      res.status(400).send(err);
    }
  },
  remove: async (req, res) => {
    try {
      const productToRemove = await product.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (!productToRemove) {
        res.status(404).send("User not found");
        return;
      }

      await productToRemove.destroy();
      const productss = await product.findAll();
      res.status(200).send(productss);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
};
