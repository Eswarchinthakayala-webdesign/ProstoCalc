
import fs from 'fs';

async function verifyLive() {
    const url = 'https://prosto-calc.vercel.app/api/ai-chat';
    const payload = {
        messages: [{ 
            role: "user", 
            content: "Treatments: Dental Cleaning\nTotal Estimated Cost: $100\nClinic Type: Standard\nCountry: USA" 
        }]
    };

    console.log("Testing live URL...");
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const text = await response.text();
        console.log("Status:", response.status);
        
        try {
            const data = JSON.parse(text);
            fs.writeFileSync('live_verify.json', JSON.stringify({ status: response.status, data }, null, 2));
        } catch (e) {
            fs.writeFileSync('live_verify.json', JSON.stringify({ status: response.status, rawText: text.substring(0, 500) }, null, 2));
        }
    } catch (error) {
        fs.writeFileSync('live_verify.json', JSON.stringify({ error: error.message }, null, 2));
    }
}

verifyLive();
