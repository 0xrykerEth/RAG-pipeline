import { ask } from "../services/ragService.js";

export async function askQuestion(req, res) {

    const { question } = req.body;

    try {

        const answer = await ask(question);

        res.status(200).json({
            answer
        });

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

}