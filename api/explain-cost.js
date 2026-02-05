
import { Mistral } from '@mistralai/mistralai';

export default async function handler(request, response) {
  // Handle CORS preflight request
  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }

  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const apiKey = "ij8rdq5QHDdhzmU3hmUcwa5DLJVpAhbW";

    if (!apiKey) {
      return response.status(500).json({ error: 'Mistral API key not configured' });
    }

    const { userPrompt, locale = 'en-US' } = request.body;

    if (!userPrompt) {
      return response.status(400).json({ error: 'User prompt is required' });
    }

    const client = new Mistral({ apiKey: apiKey });

    const chatResponse = await client.chat.complete({
      model: 'mistral-tiny', 
      messages: [
        {
          role: 'system',
          content: `You are an expert medical billing and treatment cost estimator. 
          Your goal is to explain treatment costs in detail based on the provided input. 
          Break down potential costs, insurance factors, and out-of-pocket expenses where possible. 
          Be clear, professional, and empathetic. 
          Disclaimer: You must state that these are estimates and actual costs may vary.`
        },
        {
          role: 'user',
          content: userPrompt
        }
      ],
    });

    return response.status(200).json({ 
      result: chatResponse.choices[0].message.content 
    });

  } catch (error) {
    console.error('Error calling Mistral API:', error);
    return response.status(500).json({ error: 'Failed to process request', details: error.message });
  }
}
