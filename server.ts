import express from 'express';
import path from 'path';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client server-side
const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({
  apiKey: apiKey || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// 1. AI Orchestration Pipeline Endpoint
app.post('/api/orchestrate', async (req, res) => {
  try {
    const { symptoms, duration, age, gender, vitals } = req.body;

    if (!symptoms || typeof symptoms !== 'string') {
      return res.status(400).json({ error: 'Symptoms description is required.' });
    }

    if (!process.env.GEMINI_API_KEY) {
      // Fallback AI simulation if key not configured yet
      return res.json({
        id: 'triage-' + Date.now(),
        timestamp: new Date().toISOString(),
        symptomsText: symptoms,
        duration: duration || 'Not specified',
        severity: symptoms.toLowerCase().includes('chest') || symptoms.toLowerCase().includes('breath') ? 'critical' : 'moderate',
        extractedSymptoms: symptoms.split(',').map(s => s.trim()),
        possibleConditions: [
          { condition: 'Acute Coronary Syndrome / Angina', probability: 82, description: 'Requires immediate ECG and troponin evaluation.' },
          { condition: 'Musculoskeletal Chest Pain', probability: 18, description: 'Non-cardiac sharp muscle wall origin.' }
        ],
        recommendedDepartment: symptoms.toLowerCase().includes('chest') ? 'Cardiology' : 'General Medicine',
        urgencyLevel: symptoms.toLowerCase().includes('chest') ? 'EMERGENCY' : 'URGENT',
        suggestedAction: 'Proceed immediately to Triage Bay / Emergency Room. Avoid physical exertion.',
        recommendedTests: ['12-Lead ECG', 'Cardiac Enzymes (Troponin T/I)', 'Chest X-Ray'],
        vitalSignsWarning: vitals ? `Vitals recorded: ${vitals}` : undefined
      });
    }

    const prompt = `
Act as the AI Medical Orchestrator for MediFlow Healthcare Management System.
Analyze the following patient clinical presentation and perform multi-stage triage:

Patient Profile:
- Age: ${age || 'Unknown'}
- Gender: ${gender || 'Unknown'}
- Symptom Duration: ${duration || 'Not specified'}
- Vital Signs/Notes: ${vitals || 'None recorded'}
- Reported Symptoms: "${symptoms}"

Tasks:
1. Extract key clinical symptoms.
2. Predict top 2-3 differential diagnoses/conditions with probability percentage (summing close to 100%).
3. Determine the best medical department (Cardiology, Neurology, Emergency & Trauma, Pulmonology, Orthopedics, Gastroenterology, General Medicine, Dermatology, Pediatrics).
4. Classify Urgency Level strictly into one of: 'EMERGENCY' (life-threatening, immediate care), 'URGENT' (needs care within hours), or 'ROUTINE' (standard appointment).
5. Suggest immediate actionable clinical advice and 2-4 recommended diagnostic tests.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        systemInstruction: 'You are an advanced medical triage AI assistant. Always prioritize safety, accuracy, and structured clinical reasoning.',
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            severity: { type: Type.STRING, description: 'mild | moderate | severe | critical' },
            extractedSymptoms: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'List of extracted clinical symptom tags'
            },
            possibleConditions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  condition: { type: Type.STRING },
                  probability: { type: Type.NUMBER, description: 'Percentage from 1 to 100' },
                  description: { type: Type.STRING }
                },
                required: ['condition', 'probability', 'description']
              }
            },
            recommendedDepartment: { type: Type.STRING },
            urgencyLevel: { type: Type.STRING, description: 'EMERGENCY or URGENT or ROUTINE' },
            suggestedAction: { type: Type.STRING },
            recommendedTests: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            vitalSignsWarning: { type: Type.STRING }
          },
          required: ['severity', 'extractedSymptoms', 'possibleConditions', 'recommendedDepartment', 'urgencyLevel', 'suggestedAction', 'recommendedTests']
        }
      }
    });

    const parsed = JSON.parse(response.text || '{}');

    res.json({
      id: 'triage-' + Date.now(),
      timestamp: new Date().toISOString(),
      symptomsText: symptoms,
      duration: duration || 'Recent onset',
      severity: parsed.severity || 'moderate',
      extractedSymptoms: parsed.extractedSymptoms || [symptoms],
      possibleConditions: parsed.possibleConditions || [],
      recommendedDepartment: parsed.recommendedDepartment || 'General Medicine',
      urgencyLevel: parsed.urgencyLevel === 'EMERGENCY' ? 'EMERGENCY' : parsed.urgencyLevel === 'URGENT' ? 'URGENT' : 'ROUTINE',
      suggestedAction: parsed.suggestedAction || 'Please consult with a doctor for full evaluation.',
      recommendedTests: parsed.recommendedTests || [],
      vitalSignsWarning: parsed.vitalSignsWarning
    });

  } catch (error: any) {
    console.error('Orchestration AI Error:', error);
    res.status(500).json({
      error: 'AI Triage processing failed.',
      details: error.message
    });
  }
});

// 2. AI Chatbot Endpoint
app.post('/api/chatbot', async (req, res) => {
  try {
    const { message, chatHistory } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required.' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.json({
        reply: "MediFlow AI Assistant is operating in standby mode. For chest pain, shortness of breath, or sudden weakness, please seek EMERGENCY care immediately. How else can I assist with hospital scheduling or department info?",
        departmentRecommendation: undefined,
        highlights: [
          "Emergency Hotline: Call 911 / 112 for severe trauma or cardiac events.",
          "Cardiology: Room 302, North Wing.",
          "Emergency Room: Floor 1, East Wing."
        ]
      });
    }

    const systemPrompt = `
You are "MediBot", the AI Healthcare Assistant for MediFlow AI Hospital System.
Your job is to assist patients with:
1. Hospital FAQs (Visiting hours: 8am-8pm, OPD timings: 9am-5pm, Emergency: 24/7).
2. Department Routing & Specialist Guidance.
3. Basic health symptom queries (Always include appropriate medical disclaimer).
4. Appointment booking guidance.

Rules:
- Be concise, compassionate, and structured.
- Highlight key takeaways or bullet points clearly.
- If symptoms sound severe, emphasize Emergency / ER routing.
- Keep output formatted in clean JSON.
`;

    const userPrompt = `
User Question: "${message}"

Respond with JSON containing:
1. "reply": clear, helpful, short conversational answer.
2. "departmentRecommendation": string or null if relevant department identified.
3. "highlights": 2-4 key bullet points or actionable recommendations.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            reply: { type: Type.STRING },
            departmentRecommendation: { type: Type.STRING },
            highlights: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ['reply', 'highlights']
        }
      }
    });

    const result = JSON.parse(response.text || '{}');
    res.json(result);

  } catch (error: any) {
    console.error('Chatbot AI Error:', error);
    res.status(500).json({
      reply: 'Apologies, I encountered an issue processing your query. Please consult hospital reception or try again.',
      highlights: ['Contact Hospital Desk: +1 (800) MEDI-FLOW']
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

async function start() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`MediFlow AI Server listening on http://0.0.0.0:${PORT}`);
  });
}

start();
