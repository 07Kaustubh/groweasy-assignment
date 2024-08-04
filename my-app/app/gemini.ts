const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI("AIzaSyDhpQT2ddMYmnQhcEHD7ASLOdEvjommqrU");

async function run(query: string) {
  // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

  const prompt = `Give 8 sets of title, description and call to action for the banner "${query}". give as only json array without markdown.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  const jsonData = JSON.parse(text);
  return jsonData;
}

export { run };