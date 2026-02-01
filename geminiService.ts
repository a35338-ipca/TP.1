
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";

// Ensure process.env.API_KEY is handled externally as per instructions
const getAIClient = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateSecurityTip = async () => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: 'gemini-flash-lite-latest',
    contents: 'Dá uma dica rápida e crucial de cibersegurança em Português de Portugal. Sê direto e prático.',
    config: {
      temperature: 0.7,
      maxOutputTokens: 100,
    }
  });
  return response.text;
};

export const chatWithPro = async (message: string, history: {role: 'user' | 'model', parts: {text: string}[]}[]) => {
  const ai = getAIClient();
  const chat = ai.chats.create({
    model: 'gemini-3-pro-preview',
    config: {
      systemInstruction: 'És um especialista em cibersegurança sénior. Responde sempre em Português de Portugal. Foca-te em segurança digital, privacidade e boas práticas. Sê profissional e técnico mas acessível.',
    }
  });
  
  // Note: The standard chat usage for Gemini 3 pro
  const result = await chat.sendMessage({ message });
  return result.text;
};

export const generateSecurityIllustration = async (prompt: string, size: "1K" | "2K" | "4K" = "1K") => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-image-preview',
    contents: {
      parts: [
        { text: `A high-tech cybersecurity illustration: ${prompt}. Professional, cinematic lighting, 8k resolution style.` }
      ]
    },
    config: {
      imageConfig: {
        aspectRatio: "16:9",
        imageSize: size
      }
    }
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  return null;
};
