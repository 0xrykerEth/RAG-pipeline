# AI Document Q&A System (RAG Backend)

An AI-powered backend that allows users to upload PDF documents and ask questions about their contents using Retrieval-Augmented Generation (RAG). The system extracts text from uploaded PDFs, generates embeddings with Ollama, stores them in MongoDB Atlas Vector Search, and retrieves relevant context to generate accurate answers.

User Uploads PDF
        │
        ▼
Multer
        │
        ▼
BullMQ Queue
        │
        ▼
Worker
        │
        ▼
Extract PDF Text
        │
        ▼
Chunking
        │
        ▼
Generate Embeddings (Ollama)
        │
        ▼
MongoDB Atlas Vector Search

--------------------------------

User Question
        │
        ▼
Generate Query Embedding
        │
        ▼
Vector Search
        │
        ▼
Retrieve Context
        │
        ▼
Llama 3.2
        │
        ▼
Answer


## Features

- PDF Upload API
- Background processing using BullMQ
- PDF text extraction
- Custom chunking
- Ollama embeddings
- MongoDB Atlas Vector Search
- Semantic Search
- Retrieval-Augmented Generation (RAG)
- Redis Rate Limiting

## Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- MongoDB Atlas Vector Search
- Mongoose
- Redis
- BullMQ
- Multer
- PDF.js
- Ollama

## API

POST /upload
Upload a PDF document.

POST /ask
Ask questions about an uploaded document.

MONGO_URI=

REDIS_HOST=

OLLAMA_URL=http://localhost:11434