import { StructuredCompilerPlanRequest, GoalRequirement, PlanningConstraints } from '@/types/compiler';

export class GeminiCompiler {
  static async compileRequirements(
    naturalLanguagePrompt: string,
    defaultBudgetInr: number = 5000000
  ): Promise<StructuredCompilerPlanRequest> {
    const geminiKey = process.env.GEMINI_API_KEY;
    const groqKey = process.env.GROQ_API_KEY;

    // 1. Primary: Try Google Gemini AI (with 4.5s fast timeout to prevent demo freeze)
    if (geminiKey) {
      try {
        console.log('[COMPILER] Attempting compilation via Gemini...');
        const geminiResult = await this.compileWithGemini(naturalLanguagePrompt, geminiKey, defaultBudgetInr);
        if (geminiResult) {
          console.log('[COMPILER] Successfully compiled via Gemini AI!');
          return geminiResult;
        }
      } catch (err: any) {
        console.warn('[COMPILER] Gemini API error/timeout, automatically switching to Groq fallback:', err?.message || err);
      }
    }

    // 2. High-Speed Failover: Try Groq API (Instant 400ms-600ms response)
    if (groqKey) {
      try {
        console.log('[COMPILER] Engaging Groq LLM High-Speed Fallback...');
        const groqResult = await this.compileWithGroq(naturalLanguagePrompt, groqKey, defaultBudgetInr);
        if (groqResult) {
          console.log('[COMPILER] Successfully compiled via Groq fallback!');
          return groqResult;
        }
      } catch (err: any) {
        console.warn('[COMPILER] Groq API fallback encountered an error:', err?.message || err);
      }
    }

    // 3. Ultra-Safe Offline Fallback: Deterministic Rule-Based Parser (Guaranteed Zero-Downtime)
    console.log('[COMPILER] Utilizing deterministic offline fallback parser.');
    return this.deterministicFallbackParser(naturalLanguagePrompt, defaultBudgetInr);
  }

  private static async compileWithGemini(
    prompt: string,
    apiKey: string,
    defaultBudgetInr: number
  ): Promise<StructuredCompilerPlanRequest | null> {
    const systemPrompt = `
You are the EcoPlanar Requirement Parser.
Convert the user's natural-language urban ecological planning requirements into a strict JSON object.

Allowed goal names:
- "flood_resilience" (monsoon, stormwater, waterlogging, drainage, sponge city)
- "heat_reduction" (urban heat island, cooling, shade, thermal comfort)
- "biodiversity" (wildlife, native trees, birds, pollinators, Miyawaki, rewilding)
- "groundwater_recharge" (aquifer, percolation, infiltration)
- "air_quality" (PM2.5, dust, pollution buffer)
- "recreational_green" (parks, community walkways, scenic)

Output must be strict JSON matching this structure:
{
  "goals": [
    { "name": "flood_resilience", "priority": 1, "description": "Reduce monsoon flooding" },
    { "name": "heat_reduction", "priority": 2, "description": "Mitigate extreme summer heat" },
    { "name": "biodiversity", "priority": 3, "description": "Restore native Western Ghats habitat" }
  ],
  "constraints": {
    "budget_inr": 5000000,
    "demolition_allowed": false,
    "preserve_roads": true,
    "prioritize_native_species": true
  },
  "parsedSummary": "Priority ranking: Flooding (P1) > Heat (P2) > Biodiversity (P3) with strict $600,000 USD budget and zero building demolition.",
  "tradeoffAnalysis": "High investment in bioswales and rain gardens will absorb 80%+ monsoon runoff while delivering secondary cooling and pollinator corridors."
}

User input: "${prompt}"
`;

    const models = ['gemini-3.8-flash', 'gemini-flash-latest'];
    for (const model of models) {
      try {
        const resp = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: systemPrompt }] }],
              generationConfig: {
                responseMimeType: 'application/json',
                temperature: 0.1
              }
            }),
            signal: AbortSignal.timeout(4500)
          }
        );

        if (!resp.ok) continue;
        const data = await resp.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!text) continue;

        const parsed = JSON.parse(text);
        if (parsed.goals && Array.isArray(parsed.goals) && parsed.constraints) {
          return {
            naturalLanguagePrompt: prompt,
            goals: parsed.goals,
            constraints: {
              budget_inr: parsed.constraints.budget_inr || defaultBudgetInr,
              demolition_allowed: parsed.constraints.demolition_allowed ?? false,
              preserve_roads: parsed.constraints.preserve_roads ?? true,
              prioritize_native_species: parsed.constraints.prioritize_native_species ?? true,
              ...parsed.constraints
            },
            parsedSummary: parsed.parsedSummary || 'Parsed goals and constraints successfully via Gemini AI.',
            tradeoffAnalysis: parsed.tradeoffAnalysis || 'Balanced allocation across spatial intervention types.'
          };
        }
      } catch {
        // Continue to next model or fallback
      }
    }
    return null;
  }

  private static async compileWithGroq(
    prompt: string,
    apiKey: string,
    defaultBudgetInr: number
  ): Promise<StructuredCompilerPlanRequest | null> {
    const systemPrompt = `
You are the EcoPlanar Requirement Parser.
Convert the user's natural-language urban ecological planning requirements into a strict JSON object.

Allowed goal names:
- "flood_resilience" (monsoon, stormwater, waterlogging, drainage, sponge city)
- "heat_reduction" (urban heat island, cooling, shade, thermal comfort)
- "biodiversity" (wildlife, native trees, birds, pollinators, Miyawaki, rewilding)
- "groundwater_recharge" (aquifer, percolation, infiltration)
- "air_quality" (PM2.5, dust, pollution buffer)
- "recreational_green" (parks, community walkways, scenic)

Output must be strict JSON matching this structure:
{
  "goals": [
    { "name": "flood_resilience", "priority": 1, "description": "Reduce monsoon flooding" },
    { "name": "heat_reduction", "priority": 2, "description": "Mitigate extreme summer heat" },
    { "name": "biodiversity", "priority": 3, "description": "Restore native Western Ghats habitat" }
  ],
  "constraints": {
    "budget_inr": 5000000,
    "demolition_allowed": false,
    "preserve_roads": true,
    "prioritize_native_species": true
  },
  "parsedSummary": "Priority ranking: Flooding (P1) > Heat (P2) > Biodiversity (P3) with strict $600,000 USD budget.",
  "tradeoffAnalysis": "High investment in bioswales and rain gardens will absorb 80%+ monsoon runoff while delivering secondary cooling."
}
`;

    const modelsToTry = ['openai/gpt-oss-120b', 'openai/gpt-oss-20b', 'qwen/qwen3.8-27b'];

    for (const model of modelsToTry) {
      try {
        const resp = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model,
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: prompt }
            ],
            response_format: { type: 'json_object' },
            temperature: 0.1
          }),
          signal: AbortSignal.timeout(5000)
        });

        if (!resp.ok) continue;

        const data = await resp.json();
        const content = data.choices?.[0]?.message?.content;
        if (!content) continue;

        const parsed = JSON.parse(content);
        if (parsed.goals && Array.isArray(parsed.goals) && parsed.constraints) {
          return {
            naturalLanguagePrompt: prompt,
            goals: parsed.goals,
            constraints: {
              budget_inr: parsed.constraints.budget_inr || defaultBudgetInr,
              demolition_allowed: parsed.constraints.demolition_allowed ?? false,
              preserve_roads: parsed.constraints.preserve_roads ?? true,
              prioritize_native_species: parsed.constraints.prioritize_native_species ?? true,
              ...parsed.constraints
            },
            parsedSummary:
              (parsed.parsedSummary || 'Parsed goals and constraints successfully.') +
              ' (Groq High-Speed Active)',
            tradeoffAnalysis: parsed.tradeoffAnalysis || 'Balanced allocation across spatial intervention types.'
          };
        }
      } catch (e: any) {
        console.warn(`[COMPILER] Error with Groq model ${model}:`, e?.message || e);
      }
    }

    return null;
  }

  private static deterministicFallbackParser(
    prompt: string,
    defaultBudgetInr: number
  ): StructuredCompilerPlanRequest {
    const text = prompt.toLowerCase();
    const goals: GoalRequirement[] = [];

    // Detect Budget in USD ($ / K / M) or Lakhs / Crores / INR
    let budget = defaultBudgetInr;
    const usdKMatch = text.match(/\$\s*(\d+(?:\.\d+)?)\s*(?:k|thousand)/);
    const usdMMatch = text.match(/\$\s*(\d+(?:\.\d+)?)\s*(?:m|million)/);
    const usdRawMatch = text.match(/\$\s*(\d+[\d,]*)/);
    const lakhMatch = text.match(/(?:₹|rs\.?|inr)?\s*(\d+(?:\.\d+)?)\s*(?:lakh|lacs|lac)/);
    const croreMatch = text.match(/(?:₹|rs\.?|inr)?\s*(\d+(?:\.\d+)?)\s*(?:crore|cr)/);
    const numberMatch = text.match(/(?:₹|rs\.?|inr)\s*(\d+[\d,]*)/);

    if (usdMMatch) {
      budget = parseFloat(usdMMatch[1]) * 1e6 * 83;
    } else if (usdKMatch) {
      budget = parseFloat(usdKMatch[1]) * 1e3 * 83;
    } else if (usdRawMatch) {
      budget = parseInt(usdRawMatch[1].replace(/,/g, ''), 10) * 83;
    } else if (lakhMatch) {
      budget = parseFloat(lakhMatch[1]) * 100000;
    } else if (croreMatch) {
      budget = parseFloat(croreMatch[1]) * 10000000;
    } else if (numberMatch) {
      budget = parseInt(numberMatch[1].replace(/,/g, ''), 10);
    }

    // Demolition constraint
    const noDemolition =
      text.includes('no demolish') ||
      text.includes("don't demolish") ||
      text.includes('preserve building') ||
      text.includes('without demolishing');

    // Priority ordering detection
    const hasFlood =
      text.includes('flood') ||
      text.includes('waterlog') ||
      text.includes('drain') ||
      text.includes('monsoon') ||
      text.includes('sponge');
    const hasHeat =
      text.includes('heat') ||
      text.includes('cool') ||
      text.includes('temperature') ||
      text.includes('shade');
    const hasBio =
      text.includes('bio') ||
      text.includes('tree') ||
      text.includes('forest') ||
      text.includes('pollinator') ||
      text.includes('native') ||
      text.includes('nature');

    let p = 1;
    if (text.indexOf('flood') !== -1 && (!hasHeat || text.indexOf('flood') < text.indexOf('heat'))) {
      if (hasFlood)
        goals.push({
          name: 'flood_resilience',
          priority: p++,
          description: 'Primary mitigation of monsoon flooding and street ponding'
        });
      if (hasHeat)
        goals.push({
          name: 'heat_reduction',
          priority: p++,
          description: 'Secondary microclimatic urban heat island reduction'
        });
      if (hasBio)
        goals.push({
          name: 'biodiversity',
          priority: p++,
          description: 'Ecological habitat restoration and pollinator corridors'
        });
    } else if (hasBio && (!hasFlood || text.indexOf('bio') < text.indexOf('flood'))) {
      goals.push({
        name: 'biodiversity',
        priority: p++,
        description: 'Primary biodiversity restoration and native pocket forests'
      });
      if (hasHeat)
        goals.push({
          name: 'heat_reduction',
          priority: p++,
          description: 'Secondary canopy shade and heat mitigation'
        });
      if (hasFlood)
        goals.push({
          name: 'flood_resilience',
          priority: p++,
          description: 'Stormwater infiltration and runoff reduction'
        });
    } else {
      if (hasFlood)
        goals.push({ name: 'flood_resilience', priority: p++, description: 'Monsoon flood mitigation' });
      if (hasHeat)
        goals.push({ name: 'heat_reduction', priority: p++, description: 'Urban heat island cooling' });
      if (hasBio)
        goals.push({ name: 'biodiversity', priority: p++, description: 'Native biodiversity corridors' });
    }

    if (goals.length === 0) {
      goals.push({ name: 'flood_resilience', priority: 1, description: 'Monsoon stormwater resilience' });
      goals.push({ name: 'heat_reduction', priority: 2, description: 'Urban canopy cooling' });
      goals.push({ name: 'biodiversity', priority: 3, description: 'Urban biodiversity stepping stones' });
    }

    const usdEquiv = Math.round(budget / 83);
    const budgetFormatted =
      usdEquiv >= 1000000
        ? `$${(usdEquiv / 1000000).toFixed(2)}M USD`
        : `$${Math.round(usdEquiv / 1000)}k USD`;

    return {
      naturalLanguagePrompt: prompt,
      goals,
      constraints: {
        budget_inr: budget,
        demolition_allowed: !noDemolition,
        preserve_roads: true,
        prioritize_native_species: true
      },
      parsedSummary: `Compiled ${goals.length} prioritized goals within ${budgetFormatted} budget cap (${noDemolition ? 'No demolition permitted' : 'Standard constraints'}). (Deterministic Fallback)`,
      tradeoffAnalysis: `Allocated maximum budget toward highest priority (${goals[0]?.name.replace('_', ' ')}) while preserving minimum baseline coverage for secondary objectives.`
    };
  }
}
