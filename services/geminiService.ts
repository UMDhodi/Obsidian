import { GoogleGenAI, Type } from "@google/genai";
import { ConsultationResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getSkinConsultation = async (skinType: string, concerns: string): Promise<ConsultationResponse> => {
  const prompt = `Act as Obsidian Men's Care Skin Strategist. Provide a high-end, premium, macho-toned skincare routine for a user with ${skinType} skin and these field concerns: ${concerns}. Return valid JSON only.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          routine: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Step-by-step skincare routine steps, with punchy masculine titles."
          },
          advice: {
            type: Type.STRING,
            description: "A bold, short, masculine motivational advice quote."
          },
          recommendedProducts: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Recommended specific product categories from the Obsidian line."
          }
        },
        required: ["routine", "advice", "recommendedProducts"]
      }
    }
  });

  const text = response.text || '{}';
  try {
    return JSON.parse(text) as ConsultationResponse;
  } catch (e) {
    console.error("Failed to parse AI response", e);
    throw new Error("Strategy calculation failed.");
  }
};
