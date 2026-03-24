
import { GoogleGenAI, Type } from "@google/genai";

export class GeminiService {
  private ai: GoogleGenAI | null = null;

  constructor() {
    // Intentionally lazy-init client so missing env vars never crash app render.
  }

  private getClient(): GoogleGenAI | null {
    if (this.ai) return this.ai;

    const viteKey = (import.meta as any)?.env?.VITE_GEMINI_API_KEY;
    const processKey = typeof process !== 'undefined' ? process.env?.API_KEY : undefined;
    const apiKey = viteKey || processKey;

    if (!apiKey) {
      return null;
    }

    this.ai = new GoogleGenAI({ apiKey });
    return this.ai;
  }

  async getPlantCareAdvice(plantName: string, query: string) {
    try {
      const client = this.getClient();
      if (!client) {
        return "AI assistant is not configured yet. Add VITE_GEMINI_API_KEY to your .env file.";
      }

      // Use ai.models.generateContent with model and contents together as per guidelines
      const response = await client.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `You are a professional botanist and plant care expert for the brand "Room Plant". 
        A customer is asking about their ${plantName}.
        Customer Query: ${query}
        Provide helpful, friendly, and practical advice in a concise manner (max 3 sentences).`,
        config: {
          temperature: 0.7,
        },
      });
      // Extracting text from GenerateContentResponse using the .text property
      return response.text || "I'm sorry, I couldn't process that request right now. Try again later!";
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "Oops! I'm having trouble connecting to my plant database. Please try again later.";
    }
  }

  async getPlantSuggestions(roomType: string, lighting: string) {
    try {
      const client = this.getClient();
      if (!client) {
        return [];
      }

      const response = await client.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Suggest 3 indoor plants for a ${roomType} with ${lighting} lighting conditions. 
        Format as a JSON array of objects with keys: name, reason.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                reason: { type: Type.STRING }
              },
              required: ["name", "reason"]
            }
          }
        },
      });
      // Extracting text from GenerateContentResponse using the .text property
      return JSON.parse(response.text || "[]");
    } catch (error) {
      console.error("Gemini API Error:", error);
      return [];
    }
  }
}

export const geminiService = new GeminiService();
