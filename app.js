import express from 'express';
import storage from './multer.js'
import multer from 'multer';
import { uploadPdf } from './controller/upload.js';
import { askQuestion } from './controller/ask.js';
import ConnectDB from './util/ConnectDB.js';
import { rateLimiter } from './util/rateLimiter.js';
import RagSchema from './model/ragSchema.js';

const app = express();
app.use(express.json());
ConnectDB();


const upload = multer({
    storage: storage
});


app.post("/upload",rateLimiter, upload.single("pdf"), uploadPdf);
app.post("/ask", rateLimiter,askQuestion);


app.listen(3000, ()=> {
    console.log('Server is running on port 3000')
})
