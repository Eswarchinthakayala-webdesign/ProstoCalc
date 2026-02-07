import puter from "@heyputer/puter.js";

export default async function handler(request, response) {
  // Handle CORS preflight request
  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }

  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const token = process.env.puterAuthToken || process.env.PUTER_API_KEY;

    if (!token) {
      return response.status(500).json({ error: 'Puter API key (token) not configured. Please add puterAuthToken to your .env file.' });
    }

    // Initialize Puter with the auth token
    puter.setAuthToken(token);

    const { messages } = request.body;

    if (!messages || !Array.isArray(messages)) {
      return response.status(400).json({ error: 'Messages array is required' });
    }

    // Specialize the assistant for dental cost estimation
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

    // Puter's ai.chat returns a response object
    const chatResponse = await puter.ai.chat(enrichedMessages);

    // Extract just the content string for easier use in the frontend
    const resultText = typeof chatResponse === 'string' 
      ? chatResponse 
      : (chatResponse.message?.content || chatResponse.toString());

    return response.status(200).json({ 
      result: resultText 
    });

  } catch (error) {
    console.error('Error calling Puter AI:', error);
    return response.status(500).json({ error: 'Failed to process AI request', details: error.message });
  }
}
