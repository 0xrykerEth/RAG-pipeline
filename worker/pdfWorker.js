import { Worker } from "bullmq";
import Redis from "ioredis";
import fs from "fs/promises";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import { chunkText } from "../services/chunkText.js";
import { generateEmbedding } from "../services/embeddingService.js";
import mongoose from 'mongoose';
import RagSchema from "../model/ragSchema.js";
import ConnectDB from "../util/ConnectDB.js";

ConnectDB();
const Rag = mongoose.model('rag',RagSchema)

const connection = new Redis({
    maxRetriesPerRequest: null
});

const worker = new Worker(
    "pdf-processing",

    async (job) => {

        console.log(job.data);

        
        const data = await fs.readFile(job.data.filePath);

        
        const pdf = await pdfjsLib.getDocument({
            data: new Uint8Array(data)
        }).promise;

        let docs = "";

        // Extract text from every page
        for (let i = 1; i <= pdf.numPages; i++) {

            const page = await pdf.getPage(i);

            const content = await page.getTextContent();

            const pageText = content.items
                .map(item => item.str)
                .join(" ");

            docs += pageText + "\n\n";
        }

        console.log(docs);

        const chunks = chunkText(docs, 500);

        for (let i = 0; i < chunks.length; i++) {

        const embedding = await generateEmbedding(chunks[i]);

        console.log(embedding)

        await Rag.create({
            document: job.data.fileName,
            chunkNumber: i + 1,
            text: chunks[i],
            embedding
        });

        }

    },

    {
        connection
    }
);


worker.on("ready", () => {
    console.log("Worker Ready");
});

worker.on("completed", (job) => {
    console.log("Completed:", job.id);
});

worker.on("failed", (job, err) => {
    console.log("Failed:", err);
});

worker.on("error", (err) => {
    console.log(err);
});