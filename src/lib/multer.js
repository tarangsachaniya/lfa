
import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads'); // Specify your upload directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Use a timestamp to avoid naming conflicts
  },
});

const upload = multer({ storage: storage });

export default upload;
