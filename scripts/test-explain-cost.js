
import fs from 'fs';

async function testExplainCost() {
  const url = 'https://prosto-calc.vercel.app/api/explain-cost';
  const payload = {
    userPrompt: "Explain dental crown costs",
    locale: "en-US"
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    fs.writeFileSync('explain_cost_live_response.json', JSON.stringify({ success: response.ok, status: response.status, data }, null, 2));
  } catch (error) {
    fs.writeFileSync('explain_cost_live_response.json', JSON.stringify({ success: false, error: error.message }, null, 2));
  }
}

testExplainCost();
