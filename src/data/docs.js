export const DOCS_DATA = [
  {
    id: "prosto-calc",
    title: "ProstoCalc API Documentation",
    modules: [
      {
        id: "getting-started",
        title: "Getting Started",
        lessons: [
          {
            id: "welcome",
            title: "Welcome to ProstoCalc",
            type: "Guide",
            duration: "3 min",
            content: `
# Introduction to ProstoCalc

**ProstoCalc** is an intelligent dental cost estimation engine designed to decode complex Current Dental Terminology (CDT) into patient-friendly narratives. 

By abstracting the complexity of dental billing codes, ProstoCalc enables developers and clinics to build transparent, trust-based financial interfaces for patients.

## Core Value Proposition

Dental care transparency is often hindered by jargon. ProstoCalc solves this through:

* **Contextual Intelligence:** We don't just look up codes; we explain them. Our engine understands the nuance between a *simple extraction* and a *surgical removal*. 
* **Mistral AI Integration:** Powered by the Mistral-tiny architecture, offering low-latency, high-reasoning responses.
* **Stateless Architecture:** Designed for HIPAA compliance, we process queries in-memory without persistent storage of patient data.

> **Note:** ProstoCalc is strictly an *informational* layer. We provide cost context and definitions, not clinical diagnoses.

## Use Cases

| Industry | Application |
| :--- | :--- |
| **Practice Management** | Integrate real-time explanations into treatment plan presentations. |
| **Insurance Tech** | Automatically clarify Explanation of Benefits (EOB) statements for members. |
| **Patient Portals** | Allow patients to query their upcoming procedure codes via chat interfaces. |

---

### Ready to build?
Proceed to the **Core Technology** section to understand our architecture, or jump straight to the **Quick Start** to make your first API call.
`
          },
          {
            id: "overview",
            title: "Architecture & Security",
            type: "Technical",
            duration: "5 min",
            content: `
# Architecture & Security

ProstoCalc operates as a specialized intelligence layer sitting between your application and the complex database of dental terminology.

## The LLM Engine
At the heart of ProstoCalc is a fine-tuned instance of **Mistral AI**. We selected this model for its balance of semantic reasoning and computational efficiency.

* **Model:** Mistral-tiny (Optimized for textual analysis)
* **Context Window:** Specialized RAG (Retrieval-Augmented Generation) pipeline for CDT codes.
* **Latency:** Average response time < 800ms.

## Data Flow & Privacy
Security is paramount in healthcare. ProstoCalc is architected to be **stateless**.

\`\`\`mermaid
sequenceDiagram
    participant User as Client App
    participant API as ProstoCalc API
    participant LLM as Mistral Engine
    
    User->>API: POST /explain-cost (Code + Prompt)
    Note over API: Input Sanitization
    API->>LLM: Contextualize Request
    LLM-->>API: Generated Explanation
    Note over API: Data Discarded (No DB Write)
    API-->>User: JSON Response
\`\`\`

### Privacy Commitments
1.  **Zero Retention:** We do not store input prompts or generated completions.
2.  **No PII Training:** Our models are not trained on user submissions.
3.  **HIPAA Alignment:** Our architecture supports Business Associate Agreement (BAA) workflows for enterprise clients.

---
### Infrastructure
The API is deployed on **Vercel Edge Functions**, ensuring global low-latency access and automatic scaling during high-traffic periods.
`
          },
          {
            id: "integration",
            title: "Quick Start Integration",
            type: "Reference",
            duration: "4 min",
            content: `
# Quick Start Integration

This guide will walk you through integrating the ProstoCalc Cost Explanation API into your application.

## API Endpoint

All requests should be made via **HTTPS** to the following endpoint:

\`\`\`http
POST https://prostocalc.vercel.app/api/explain-cost
\`\`\`

---

## 1. Constructing a Request

The API accepts a JSON payload. The \`userPrompt\` is required.

### cURL Example
\`\`\`bash
curl -X POST https://prostocalc.vercel.app/api/explain-cost \\
  -H "Content-Type: application/json" \\
  -d '{
    "userPrompt": "Explain code D6010 for a patient worried about pain.",
    "locale": "en-US"
  }'
\`\`\`

### Node.js Example
\`\`\`javascript
async function getExplanation(prompt) {
  try {
    const response = await fetch('https://prostocalc.vercel.app/api/explain-cost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userPrompt: prompt,
        locale: 'en-US' // Optional, defaults to en-US
      })
    });

    if (!response.ok) {
      throw new Error(\`API Error: \${response.status}\`);
    }

    const data = await response.json();
    return data.result;

  } catch (error) {
    console.error("Failed to fetch explanation:", error);
    return null;
  }
}
\`\`\`

---

## 2. Response Schema

The API returns a standard JSON response.

| Field | Type | Description |
| :--- | :--- | :--- |
| \`result\` | \`string\` | The natural language explanation generated by the AI. |
| \`tokens\` | \`number\` | (Optional) Token usage count for the request. |

### Example Success Response
\`\`\`json
{
  "result": "Code D6010 refers to the surgical placement of an implant body. This is essentially the artificial root placed into the jawbone. While it sounds intense, it is done under local anesthesia, meaning you shouldn't feel pain during the procedure.",
  "tokens": 42
}
\`\`\`


![Dental Implant structure showing screw, abutment, and crown](C:/Users/hp/.gemini/antigravity/brain/de8482cd-98b5-4058-86a7-c97b0be980be/dental_implant_structure_1770319523024.png)

`
          }
        ]
      },
      {
        id: "advanced-usage",
        title: "Advanced Usage",
        lessons: [
          {
            id: "localization",
            title: "Localization",
            type: "Guide",
            duration: "5 min",
            content: `
# Localization & Multi-Language Support

ProstoCalc is designed for a global patient base. The API supports dynamic translation and cultural contextualization of dental procedures.

## Supported Locales
We currently optimize for the following locales, handling both language translation and currency formatting nuances.

| Code | Language | Region |
| :--- | :--- | :--- |
| \`en-US\` | English | United States (Default) |
| \`es-MX\` | Spanish | Mexico / Latin America |
| \`fr-CA\` | French | Canada |
| \`de-DE\` | German | Germany |

## Implementation
Pass the \`locale\` string in your request body. The AI will automatically adjust the output language.

\`\`\`json
{
  "userPrompt": "Explain a root canal (D3330)",
  "locale": "es-MX"
}
\`\`\`


![Detailed anatomical view of a root canal procedure](C:/Users/hp/.gemini/antigravity/brain/de8482cd-98b5-4058-86a7-c97b0be980be/root_canal_procedure_1770319538856.png)


### Response Example (Spanish)
> "El código D3330 se refiere a un tratamiento de conducto en un molar..."

---

## Tone Adjustment (Beta)
You can guide the "persona" of the AI using the optional \`tone\` parameter.

* **\`clinical\`**: Precise, medical terminology. Best for insurance adjusters.
* **\`empathetic\`**: Softer language, reassuring. Best for nervous patients.
* **\`simple\`**: 5th-grade reading level. Best for general public.

\`\`\`javascript
// Example: Requesting a simple explanation for a child
const body = {
  userPrompt: "What is a sealant?",
  locale: "en-US",
  tone: "simple"
};
\`\`\`
`
          },
          {
            id: "prompt-engineering",
            title: "Dental Prompt Engineering",
            type: "Guide",
            duration: "6 min",
            content: `
# Prompt Engineering for Dental Context

While ProstoCalc is powered by an LLM, the quality of the explanation depends heavily on the specificity of your prompt. 

## Structure of a Good Prompt
For the most accurate results, we recommend a structure that includes the **Code**, the **Patient Context**, and the **Specific Concern**.

\`\`\`text
[CDT Code] + [Patient Demographics] + [Specific Question/Fear]
\`\`\`

## Examples

### ❌ Weak Prompt
> "Tell me about D2740."

**Result:** A generic definition of a porcelain crown.

### ✅ Strong Prompt
> "Explain code D2740 for an elderly patient who is worried about how long the crown will last."

**Result:** A specific explanation focusing on the durability of zirconia/porcelain crowns and maintenance for seniors. 

![High-end porcelain dental crown (D2740) mockup](C:/Users/hp/.gemini/antigravity/brain/de8482cd-98b5-4058-86a7-c97b0be980be/porcelain_crown_mockup_1770319558514.png)


### ✅ Comparative Prompt
> "What is the difference in cost and procedure between D2391 (Composite) and D2140 (Amalgam)?"

**Result:** A comparative analysis highlighting aesthetics vs. durability.

---

## Handling Unknown Codes
If a user submits a non-existent or deprecated CDT code, the API will return a \`404\` style message in the \`result\` string, rather than hallucinating a procedure.

> "I cannot find a standard dental procedure matching code D9999. Please verify the code on your treatment plan."
`
          }
        ]
      },
      {
        id: "api-reference",
        title: "API Reference",
        lessons: [
          {
            id: "request-body",
            title: "Request Parameters",
            type: "Reference",
            duration: "3 min",
            content: `
# API Reference

## Request Body Parameters

The following parameters are accepted in the POST body.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| \`userPrompt\` | String | **Yes** | - | The raw text query or CDT code to explain. Max 2000 chars. |
| \`locale\` | String | No | \`en-US\` | The ISO language code for the response. |
| \`tone\` | String | No | \`simple\` | The desired voice: \`simple\`, \`clinical\`, or \`empathetic\`. |
| \`includePricing\` | Boolean | No | \`false\` | If true, provides a national average price range estimate. |

## Response Object

| Property | Type | Description |
| :--- | :--- | :--- |
| \`id\` | String | Unique request ID for support tracing. |
| \`result\` | String | The markdown-formatted explanation. |
| \`meta\` | Object | Metadata including processing time and token usage. |

---

## Status Codes

| Code | Status | Description |
| :--- | :--- | :--- |
| \`200\` | OK | Request processed successfully. |
| \`400\` | Bad Request | Missing \`userPrompt\` or invalid JSON. |
| \`401\` | Unauthorized | Invalid API Key (Enterprise only). |
| \`422\` | Unprocessable | The prompt contained prohibited content. |
| \`500\` | Server Error | An issue occurred on the ProstoCalc engine. |
`
          },
          {
            id: "best-practices",
            title: "Best Practices",
            type: "Technical",
            duration: "4 min",
            content: `
# Best Practices & Security

## 1. Server-Side Implementation
**Never call the ProstoCalc API directly from a client-side browser** (e.g., inside a React \`useEffect\` without a proxy). 

Although our public tier is free, exposing your logic allows others to abuse your rate limits. Always route requests through your own backend API.

\`\`\`mermaid
graph LR
    Client[Browser/App] -- X No --> Prosto[ProstoCalc API]
    Client -- Yes --> YourServer[Your Backend]
    YourServer --> Prosto
\`\`\`

## 2. Caching Responses
Dental definitions rarely change. To improve your application's speed and reduce API usage:

1.  **Cache the Result:** If a user asks about "D1110" (Prophylaxis), store that explanation.
2.  **Serve from Cache:** If another user asks for "D1110" with the same parameters, serve the cached version.

## 3. Fallback UI
AI services can occasionally experience latency. 
* Implement a "Skeleton Loader" or "Thinking..." state in your UI while waiting for the response.
* Set a client-side timeout of **8 seconds** to prevent UI hanging.
`
          }
        ]
      }
    ]
  }
];