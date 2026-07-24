const db = require("../models");
const User = db.User;

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json({ success: true, count: users.length, data: users });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Gagal mengambil data user",
        error: error.message,
      });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User tidak ditemukan" });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Gagal mengambil data user",
        error: error.message,
      });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { email, username, password, is_active } = req.body;
    const newUser = await User.create({ email, username, password, is_active });
    res
      .status(201)
      .json({ success: true, message: "User berhasil dibuat", data: newUser });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Gagal membuat user baru",
        error: error.message,
      });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User tidak ditemukan" });
    }
    const { email, username, password, is_active } = req.body;
    await user.update({ email, username, password, is_active });
    res
      .status(200)
      .json({
        success: true,
        message: "Data user berhasil diperbarui",
        data: user,
      });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Gagal memperbarui data user",
        error: error.message,
      });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User tidak ditemukan" });
    }
    await user.destroy();
    res.status(200).json({ success: true, message: "User berhasil dihapus" });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Gagal menghapus user",
        error: error.message,
      });
  }
};
