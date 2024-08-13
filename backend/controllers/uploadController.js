const uploadAvatar = (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json("No file uploaded");
    res.status(200).json(file);
  } catch (error) {
    res.status(500).json(error);
  }
};

const uploadProductImgs = (req, res) => {
  try {
    const files = req.files;
    if (!files || files.length === 0)
      return res.status(400).json("No files uploaded");
    res.status(200).json(files);
  } catch (error) {
    res.status(500).json(error);
  }
};
export { uploadAvatar, uploadProductImgs };
