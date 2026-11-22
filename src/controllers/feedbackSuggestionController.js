
import { generateText, Output } from 'ai';
import { google } from '@ai-sdk/google';
import { z } from 'zod';
import { success, error } from '../utils/responseHandler.js';


export const generateFeedbackSuggestions = async (req, res) => {
    try {
        console.log('Generating feedback suggestions...');
        const { topicTitle, topicDescription } = req.body;

        if (!topicTitle || !topicDescription) {
            return error(res, 'Topic title and description are required', 400);
        }

        const { output } = await generateText({
            model: google('gemini-3.5-flash-lite'),

            output: Output.object({
                schema: z.object({
                    suggestions: z.array(z.string()).length(3)
                })
            }),

            system: `
        You are a feedback suggestion generator.

        Generate exactly 3 short and meaningful feedback
        suggestions based on the provided topic title
        and topic description.

        Rules:
        - Generate exactly 3 suggestions.
        - Each suggestion must be a complete sentence.
        - Keep each suggestion concise and easy to understand.
        - Make all 3 suggestions relevant to the topic.
        - Suggestions must be different from each other.
        - Use natural, user-friendly language.
        - Do not generate generic or unrelated suggestions.
      `,

            prompt: `
        Topic Title: ${topicTitle}

        Topic Description: ${topicDescription}

        Generate 3 feedback suggestions for this topic.
      `,

            maxOutputTokens: 250,
        });

        // Keep exactly the same frontend response structure
        // res.json(output.suggestions);
        return success(res, output.suggestions, 'Feedback suggestions generated successfully');


    } catch (error) {
        console.error('Feedback AI Error:', error);

        return error(res, error.message, 500);
    }
};
