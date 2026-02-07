
import fs from 'fs';

async function testLiveApiFixed() {
  const url = 'https://prosto-calc.vercel.app/api/ai-chat';
  const payload = {
    messages: [
      { 
        role: "user", 
        content: "Treatments: Dental Cleaning\nTotal Estimated Cost: $100 - $200\nClinic Type: Standard\nCountry: USA" 
      }
    ]
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (response.status === 404) {
      fs.writeFileSync('live_api_check.json', JSON.stringify({ success: false, status: 404, message: "Endpoint NOT found (Not deployed yet?)" }, null, 2));
      return;
    }

    const data = await response.json();
    fs.writeFileSync('live_api_check.json', JSON.stringify({ success: response.ok, status: response.status, data }, null, 2));
  } catch (error) {
    fs.writeFileSync('live_api_check.json', JSON.stringify({ success: false, error: error.message }, null, 2));
  }
}

testLiveApiFixed();
