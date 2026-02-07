
import puter from "@heyputer/puter.js";
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

async function verifyFix() {
    console.log("-----------------------------------------");
    console.log("Verifying ESM + Puter SDK Fix");
    console.log("-----------------------------------------");

    const token = process.env.puterAuthToken || process.env.PUTER_API_KEY;

    if (!token) {
        console.error("❌ Error: puterAuthToken not found in .env file.");
        return;
    }

    try {
        console.log("Initializing Puter directly via ESM import...");
        puter.setAuthToken(token);

        const testContent = `Treatments: Root Canal
Total Estimated Cost: $1,200
Clinic Type: Standard
Country: Canada`;

        const messages = [{ role: "user", content: testContent }];
        
        const enrichedMessages = [
            {
                role: "system",
                content: `You are a professional Dental Treatment Cost Estimator. 
                Guidelines:
                1. Explain why each treatment is required.
                2. Show a clear cost breakdown.
                3. Mention expected treatment duration.
                4. Use simple, reassuring, professional language.
                5. Do NOT give medical advice or diagnosis.
                6. Add a short disclaimer that costs may vary.

                Output Format: - Short heading, Bullet points, Friendly tone.`
            },
            ...messages
        ];

        console.log("Sending query via puter.ai.chat...");
        const response = await puter.ai.chat(enrichedMessages);

        console.log("\n✅ SUCCESS! Response received:");
        console.log("-----------------------------------------");
        console.log(response.toString());
        console.log("-----------------------------------------");
    } catch (error) {
        console.error("\n❌ FAILED:");
        console.error("Details:", error.message);
    }
}

verifyFix();
