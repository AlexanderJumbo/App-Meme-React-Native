const express = require('express');
const app = express();
const multer = require('multer');
const path = require('path');
const cors = require('cors');

app.use(cors({origin: true, credentials: true}));
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, '/images')));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({storage: storage});
app.post('/api/upload', upload.single('file'), (req, res) => {
  res.status(200).json('File has been uploaded');
});
app.get('/', (req, res) => {
  res.status(200).json('Hello');
});

app.listen('5000', () => {
  console.log('Backend is running on port 5000...!');
});
