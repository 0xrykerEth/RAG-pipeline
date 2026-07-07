export function chunkText(text, size) {

    let chunks = [];

    for (let i = 0; i < text.length; i += size) {

        let chunk = "";

        for (let j = i; j < i + size && j < text.length; j++) {
            chunk += text[j];
        }

        chunks.push(chunk);
    }

    return chunks;
}