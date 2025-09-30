"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "Categories",
      [
        {
          categoryName: "Vitamin",
          images:
            "https://res-4.cloudinary.com/dk0z4ums3/image/upload/c_scale,h_150,w_150/v1/production/pharmacy/products/1677784073_96",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          categoryName: "Suplemen Dan Daya Tahan",
          images:
            "https://res-2.cloudinary.com/dk0z4ums3/image/upload/c_scale,h_150,w_150/v1/production/pharmacy/products/1677797953_96%402x",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          categoryName: "Obat Batuk",
          images:
            "https://res-2.cloudinary.com/dk0z4ums3/image/upload/c_scale,h_150,w_150/v1/production/pharmacy/products/1677796819_96%402x",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          categoryName: "Obat Demam",
          images:
            "https://res-5.cloudinary.com/dk0z4ums3/image/upload/c_scale,h_150,w_150/v1/production/pharmacy/products/1677796846_96%402x",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          categoryName: "Obat Flu",
          images:
            "https://res-1.cloudinary.com/dk0z4ums3/image/upload/c_scale,h_150,w_150/v1/production/pharmacy/products/1677796868_96%402x",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          categoryName: "Obat Masuk Angin",
          images:
            "https://res-4.cloudinary.com/dk0z4ums3/image/upload/c_scale,h_150,w_150/v1/production/pharmacy/products/1677796906_96%402x",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          categoryName: "Obat Sakit Kepala",
          images:
            "https://res-3.cloudinary.com/dk0z4ums3/image/upload/c_scale,h_150,w_150/v1/production/pharmacy/products/1677796940_96%402x-1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          categoryName: "Obat Sakit Tenggorokan",
          images:
            "https://res-1.cloudinary.com/dk0z4ums3/image/upload/c_scale,h_150,w_150/v1/production/pharmacy/products/1677797974_96%402x",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          categoryName: "Jamu",
          images:
            "https://res-1.cloudinary.com/dk0z4ums3/image/upload/c_scale,h_150,w_150/v1/production/pharmacy/products/1677796964_96%402x",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          categoryName: "Vitamin Anak",
          images:
            "https://res-1.cloudinary.com/dk0z4ums3/image/upload/c_scale,h_150,w_150/v1/production/pharmacy/products/1677796983_96%402x",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
