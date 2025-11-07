
import { GoogleGenAI, Chat, Type } from "@google/genai";
import { StaffMember, ShiftAssignment } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const startChat = (): Chat => {
    return ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: 'You are a helpful assistant for a hospital staffing manager. You can answer questions about scheduling, staffing best practices, and hospital management. Keep your answers concise and helpful.',
        },
    });
};

export const generateOptimalRoster = async (
    staff: StaffMember[], 
    currentRoster: ShiftAssignment[], 
    constraints: string
): Promise<ShiftAssignment[]> => {
    const prompt = `
        You are an expert hospital rostering AI. Your task is to create an optimal 7-day schedule for an Emergency Department based on the provided data and constraints.

        **Current Staff Members (with skills and contracted hours):**
        ${JSON.stringify(staff, null, 2)}

        **Current Roster (for reference, you should create a new one):**
        ${JSON.stringify(currentRoster, null, 2)}

        **Optimization Constraints & Goals:**
        ${constraints}
        - Ensure every staff member works as close to their contracted hours as possible, but do not exceed them unless "overtime is allowed" is specified.
        - Ensure fair distribution of night shifts.
        - Every shift must have at least one 'Charge Nurse'.
        - Every shift must have at least one 'Trauma Certified' nurse.
        - Minimum 4 staff members per shift (Day and Night).
        - A staff member cannot work a Day shift the day after a Night shift.

        Please provide the optimized roster as a JSON array of shift assignments for the next 7 days.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            staffId: { type: Type.STRING },
                            date: { type: Type.STRING, description: "Date in YYYY-MM-DD format" },
                            shiftType: { type: Type.STRING, enum: ["Day (7a-7p)", "Night (7p-7a)", "Off"] }
                        },
                        required: ["staffId", "date", "shiftType"]
                    }
                }
            }
        });

        const jsonText = response.text.trim();
        const result = JSON.parse(jsonText);
        return result as ShiftAssignment[];
    } catch (error) {
        console.error("Error generating optimal roster:", error);
        throw new Error("Failed to generate roster from AI. The model may have returned an invalid format.");
    }
};
