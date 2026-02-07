
import { init } from "@heyputer/puter.js/src/init.cjs";
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

async function testDentalEstimator() {
    console.log("-----------------------------------------");
    console.log("Testing Dental Cost Estimator (Puter)");
    console.log("-----------------------------------------");

    const token = process.env.puterAuthToken || process.env.PUTER_API_KEY;

    if (!token) {
        console.error("❌ Error: puterAuthToken not found in .env file.");
        return;
    }

    try {
        console.log("Initializing Puter SDK...");
        const puter = init(token);

        // This mimics the logic in your updated api/ai-chat.js
        const testContent = `Treatments: Dental Implant, Bone Graft
Total Estimated Cost: $3,000 - $5,000
Clinic Type: Standard
Country: UK`;

        const messages = [{ role: "user", content: testContent }];
        
        const enrichedMessages = [
            {
                role: "system",
                content: `You are a professional Dental Treatment Cost Estimator. 
                When user provides treatment details, structure your response as follows:

                Guidelines:
                1. Explain why each treatment is required.
                2. Show a clear cost breakdown.
                3. Mention expected treatment duration.
                4. Use simple, reassuring, professional language.
                5. Do NOT give medical advice or diagnosis.
                6. Add a short disclaimer that costs may vary.

                Output Format:
                - Short heading
                - Bullet points
                - Friendly tone
                - Mobile-friendly length

                Specifically, when given data in the format:
                - Treatments: [list]
                - Total Estimated Cost: [cost]
                - Clinic Type: [type]
                - Country: [country]

                Use that data to generate the structured response.`
            },
            ...messages
        ];

        console.log("Sending enriched dental query...");
        const chatResponse = await puter.ai.chat(enrichedMessages);

        // Extract result like the API does
        const resultText = typeof chatResponse === 'string' 
            ? chatResponse 
            : (chatResponse.message?.content || chatResponse.toString());

        console.log("\n✅ SUCCESS! Dental Cost Breakdown:");
        console.log("-----------------------------------------");
        console.log(resultText);
        console.log("-----------------------------------------");
    } catch (error) {
        console.error("\n❌ FAILED:");
        console.error("Details:", error.message);
    }
}

testDentalEstimator();
