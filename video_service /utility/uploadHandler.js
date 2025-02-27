import multer from 'multer';
import path from 'path';
import fs from 'fs';


//saving video locally as of now if we are going to use any cloud storage and we implement that code accordingly

const uploadDir = 'uploads/';

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname.replace(/\s/g, '')}`);
    }
});


const upload = multer({
    storage,
    limits: { fileSize: 200 * 1024 * 1024 } // 200MB
});

export default upload;
