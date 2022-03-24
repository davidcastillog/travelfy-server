const cloudinary = require("cloudinary");

exports.uploadProcess = async (req, res, next) => {
  const uploads = (file, folder) => {
    return new Promise((resolve) => {
      cloudinary.uploader.upload(file, (result) => {
        resolve(
          {
            url: result.url,
            id: result.public_id,
          },
          {
            resource_type: "auto",
            folder,
          }
        );
      });
    });
  };

  const uploader = async (path) => uploads(path, "images");

  if (req.method === "POST") {
    const urls = [];
    const files = req.files;
    if (!req.file) {
      for (const file of files) {
        const { path } = file;
        const newPath = await uploader(path);
        urls.push({ newPath, name: file.originalname });
      }
      res.status(200).json({ result: urls, msg: "Images succefully uploaded" });
    } else {
      const { path } = req.file;
      const newPath = await uploader(path);

      res.status(200).json({
        result: { newPath, name: req.file.originalname },
        msg: "Image successfully uploaded",
      });
    }
  } else {
    res.status(405).json({ errorMessage: `${req.method} method not allowed` });
  }
};
