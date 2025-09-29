const { GoogleGenAI } = require("@google/genai");

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const generateCaption = async (imagefile, tone, language, additionalInfo) => {
    const imageBase64 = new Buffer.from(imagefile.buffer).toString('base64');

    // Build dynamic prompt based on parameters
    let prompt = "Describe this image in one short caption";

    // Add tone if specified
    if (tone && tone !== 'neutral') {
        prompt += ` with a ${tone} tone`;
    }

    // Add language requirement if specified
    if (language && language !== 'english') {
        prompt += ` in ${language}`;
    }

    // Add additional context if provided
    if (additionalInfo && additionalInfo.trim()) {
        prompt += `. Additional context: ${additionalInfo.trim()}`;
    }

    prompt += ".";

    const generatedImageCaption = await genAI.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
            {
                inlineData: {
                    mimeType: imagefile.mimetype,
                    data: imageBase64,
                },
            },
            prompt
        ],
        config: {
            systemInstruction: `You are an advanced image captioning assistant. Analyze the image carefully and respond with one short, clear caption describing it. 
            
            Guidelines:
            - Keep captions concise but descriptive (2-3 sentences maximum)
            - Match the requested tone if specified (formal, casual, creative, humorous, etc.)
            - Respond in the requested language if specified
            - Incorporate any additional context provided by the user
            - Focus on the most important visual elements
            - Do not include extra commentary or explanations beyond the caption
            - Be accurate and objective in your descriptions`
        }


    })
    return generatedImageCaption;
}
module.exports = generateCaption;