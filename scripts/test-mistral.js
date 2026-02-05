import 'dotenv/config';
import { Mistral } from '@mistralai/mistralai';

async function testMistralConnection() {
  console.log("🔹 Testing Mistral AI Connection...");

  const apiKey = process.env.MISTRAL_API_KEY;

  if (!apiKey) {
    console.error("❌ Error: MISTRAL_API_KEY is missing from .env file");
    process.exit(1);
  }

  try {
    const client = new Mistral({ apiKey: apiKey });

    console.log("🔹 Sending request to Mistral...");
    
    // Test payload similar to what the API sends
    const userPrompt = "How much does a dental implant typically cost in the US?";

    const chatResponse = await client.chat.complete({
      model: 'mistral-tiny', 
      messages: [
        {
          role: 'system',
          content: `You are an expert medical billing and treatment cost estimator.` // Simplified system prompt for test
        },
        {
          role: 'user',
          content: userPrompt
        }
      ],
    });

    console.log("\n✅ Success! Received response from Mistral:");
    console.log("---------------------------------------------------");
    console.log(chatResponse.choices[0].message.content);
    console.log("---------------------------------------------------");
    console.log("\nYour API Key and mistral-tiny model are working correctly.");

  } catch (error) {
    console.error("\n❌ Request Failed:");
    console.error(error);
  }
}

testMistralConnection();
