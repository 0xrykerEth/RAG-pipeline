import { pdfQueue } from "../queues/pdfQueue.js";
import path from "path";

export async function uploadPdf(req, res) {

    await pdfQueue.add("process-pdf", {
        filePath: path.resolve(req.file.path),
        fileName: req.file.filename
    });

    console.log("Job added");

    res.json({
        message: "PDF uploaded. Processing started."
    });

}