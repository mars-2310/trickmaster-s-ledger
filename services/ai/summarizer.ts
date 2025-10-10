import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: 'https://api.perplexity.ai',
  apiKey: process.env.PERPLEXITY_API_KEY
});

export async function Summarize(description: string, category: string) {

  const userPrompt = `Summarize the following spark in 2-3 sentences, highlighting the key points and purpose:\n"${description}".`
  try{
    const completion = await openai.chat.completions.create({
      messages: [
        {role: 'user', content: userPrompt}
      ],
      model: "sonar",
      temperature: 0.7 + Math.random()*0.2,
      n: 3,
      max_tokens: 1000
    });

    return {
      expandedContent: [
        completion.choices[0]?.message?.content || '',
        completion.choices[1]?.message?.content || '',
        completion.choices[2]?.message?.content || '',
      ],
      tokensUsed: completion.usage?.total_tokens || 0,
    };
  } catch(e) {
    console.log("Perplexity API error: ", e);
    throw new Error('Failed to expand spark with AI');
  }
}