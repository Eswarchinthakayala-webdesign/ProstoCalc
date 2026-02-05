
async function testLiveEndpoint() {
  const url = 'https://prosto-calc.vercel.app/api/explain-cost';
  console.log(`Testing URL: ${url}`);
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userPrompt: "How much does a dental crown cost?" })
    });

    if (!response.ok) {
      console.error(`Error: ${response.status} ${response.statusText}`);
      const text = await response.text();
      console.error('Response body:', text);
      return;
    }

    const data = await response.json();
    console.log("Success! API Response:");
    console.log(data);
  } catch (err) {
    console.error("Network error:", err);
  }
}

testLiveEndpoint();
