const { GoogleGenAI } = require("@google/genai");

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const generateCaption = async (imagefile) => {
    const imageBase64 = new Buffer.from(imagefile.buffer).toString('base64');
    const prompt = "Describe this image in one short caption.";
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
            systemInstruction: "You are an image captioning assistant. Analyze the image carefully and respond with one short, clear caption describing it. Do not include extra commentary."
        }


    })
    return generatedImageCaption;
}
module.exports = generateCaption;