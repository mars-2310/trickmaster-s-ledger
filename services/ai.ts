import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: 'https://api.perplexity.ai',
  apiKey: process.env.PERPLEXITY_API_KEY
});

async function expandSpark(content : string, category : string) {
  const systemPrompt = `You are a creative director for circus performances. 
Your job is to take brief performance ideas and expand them into detailed, 
actionable routines with timing, props, safety notes, and audience engagement tips.

Focus on:
- Detailed step-by-step breakdown
- Timing for each segment
- Required props and setup
- Safety considerations
- Audience interaction moments
- Comedy/dramatic beats (depending on category)

Format the output with clear markdown headers and bullet points.`;
  const userPrompt = `Expand this ${category.toLowerCase()} performance idea into a complete 2-3 minute routine:

"${content}"

Provide a comprehensive routine that a performer could actually use.`;

  try{
    const completion = await openai.chat.completions.create({
      messages: [
        {role: 'system', content: systemPrompt},
        {role: 'user', content: userPrompt}
      ],
      model: "sonar",
      temperature: 0.75,
      max_tokens: 1000
    });

    return {
      expandedContent: completion.choices[0].message.content || '',
      tokensUsed: completion.usage?.total_tokens || 0
    };
  } catch(e) {
    console.log("Perplexity API error: ", e);
    throw new Error('Failed to expand spark with AI');
  }
};

async function Summarize(description: string, category: string) {

  const userPrompt = `Summarize the following spark in 2-3 sentences, highlighting the key points and purpose:\n"${description}".`
  try{
    const completion = await openai.chat.completions.create({
      messages: [
        {role: 'user', content: userPrompt}
      ],
      model: "sonar",
      temperature: 0.75,
      max_tokens: 1000
    });

    return {
      expandedContent: completion.choices[0].message.content || '',
      tokensUsed: completion.usage?.total_tokens || 0
    };
  } catch(e) {
    console.log("Perplexity API error: ", e);
    throw new Error('Failed to expand spark with AI');
  }
}