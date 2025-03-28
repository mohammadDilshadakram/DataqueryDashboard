import { GoogleGenerativeAI } from "@google/generative-ai"

// Initialize the Gemini API client with the correct class name
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "")

// Get the generative model with the correct method
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })

export interface GeminiResponse {
  data: Array<{ name: string; value: number }>
  analysis: string
}

/**
 * Process a query using the Gemini API
 * @param query The user's query about data
 * @returns Structured data and analysis
 */
export async function processQueryWithGemini(query: string): Promise<GeminiResponse> {
  try {
    // Create a prompt that instructs Gemini to return structured data
    const prompt = `
      You are a data analytics assistant. Based on the following query, generate:
      1. A data array with 5-8 data points in JSON format with "name" and "value" properties
      2. A brief analysis of the data (2-3 sentences)
      
      The data should be realistic and relevant to the query. Values should be numbers between 1 and 1000.
      
      Query: "${query}"
      
      Return your response in the following JSON format only:
      {
        "data": [
          {"name": "Category1", "value": 100},
          {"name": "Category2", "value": 200},
          ...
        ],
        "analysis": "Your analysis text here."
      }
    `

    // Generate content with Gemini using the correct API
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.4,
        topK: 32,
        topP: 0.8,
        maxOutputTokens: 1024,
      },
    })

    const response = result.response
    const text = response.text()

    // Extract the JSON part from the response
    let parsedData

    try {
      // First try to parse the entire response as JSON
      parsedData = JSON.parse(text)
    } catch (e) {
      // If that fails, try to extract JSON from markdown code blocks or plain text
      const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/) || text.match(/{[\s\S]*}/) || null

      if (jsonMatch) {
        const jsonStr = jsonMatch[1] || jsonMatch[0]
        parsedData = JSON.parse(jsonStr.trim())
      } else {
        throw new Error("Could not parse JSON from response")
      }
    }

    // Validate the parsed data has the expected structure
    if (!parsedData || !Array.isArray(parsedData.data) || !parsedData.analysis) {
      throw new Error("Invalid response format from Gemini API")
    }

    return {
      data: parsedData.data,
      analysis: parsedData.analysis,
    }
  } catch (error) {
    console.error("Error processing query with Gemini:", error)

    // Return fallback data
    return {
      data: [
        { name: "Sample 1", value: 100 },
        { name: "Sample 2", value: 150 },
        { name: "Sample 3", value: 200 },
        { name: "Sample 4", value: 120 },
        { name: "Sample 5", value: 180 },
      ],
      analysis: "Could not generate AI analysis. Here is sample data instead.",
    }
  }
}

