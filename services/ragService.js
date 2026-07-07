import { text } from "express";
import { generateEmbedding } from "./embeddingService.js";
import RagSchema from "../model/ragSchema.js";
import mongoose from "mongoose";

const Rag = mongoose.model('rag',RagSchema)

export async function ask(text) {

    const questionEmbedding = await generateEmbedding(text);

    console.log(questionEmbedding);
    console.log(questionEmbedding.length);

    const aggregate = await Rag.aggregate([
        {
        $vectorSearch: {
            index: "embedding",
            path: "embedding",
            queryVector: questionEmbedding,
            numCandidates: 50,
            limit: 3
        }
    },
    {
        $project: {
            text: 1,
            chunkNumber: 1,
            score: {
                $meta: "vectorSearchScore"
            }
        }
    }
    ])

    const context = aggregate
    .map(chunk => chunk.text)
    .join("\n\n");

    const prompt = `
        You are a helpful assistant.

        Use ONLY the information provided in the context below.

        If the answer cannot be found in the context, reply exactly:

        "I couldn't find that information in the uploaded document."

        Do not make up facts.

        Context:
        ${context}

        Question:
        ${text}
        `;

    const response = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "llama3.2",   // or whichever model you have pulled
            prompt,
            stream: false
        })
    });

    const data = await response.json();

    return data.response;

}