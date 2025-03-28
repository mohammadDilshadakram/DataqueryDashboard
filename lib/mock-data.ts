import type { QueryResults } from "./types"

// Generate random data based on the query
export function generateMockData(query: string): QueryResults {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const categories = ["Product A", "Product B", "Product C", "Product D", "Product E"]
  const channels = ["Organic", "Paid Search", "Social", "Email", "Referral"]

  let data = []
  let analysis = ""

  // Generate different data based on query keywords
  if (query.toLowerCase().includes("revenue") || query.toLowerCase().includes("sales")) {
    data = months.slice(0, 6).map((month) => ({
      name: month,
      value: Math.floor(Math.random() * 50000) + 10000,
    }))
    analysis =
      "Revenue shows an upward trend over the last 6 months with a 15% increase compared to the previous period. The highest revenue was recorded in May, potentially due to the seasonal promotion campaign."
  } else if (query.toLowerCase().includes("engagement") || query.toLowerCase().includes("user")) {
    data = channels.map((channel) => ({
      name: channel,
      value: Math.floor(Math.random() * 1000) + 100,
    }))
    analysis =
      "User engagement is highest on Social channels, followed by Email. The recent platform updates have contributed to a 22% increase in overall engagement metrics compared to last quarter."
  } else if (query.toLowerCase().includes("conversion") || query.toLowerCase().includes("rate")) {
    data = channels.map((channel) => ({
      name: channel,
      value: Math.floor(Math.random() * 30) + 5,
    }))
    analysis =
      "Conversion rates vary significantly across marketing channels. Email shows the highest conversion rate at 28%, while Organic search trails at 12%. Consider reallocating budget to higher-performing channels."
  } else if (query.toLowerCase().includes("product") || query.toLowerCase().includes("performance")) {
    data = categories.map((category) => ({
      name: category,
      value: Math.floor(Math.random() * 200) + 50,
    }))
    analysis =
      "Product B outperformed all other products last quarter with 35% higher sales than the next best performer. Product E shows declining performance and may need a marketing strategy review."
  } else if (query.toLowerCase().includes("retention") || query.toLowerCase().includes("customer")) {
    data = ["Segment A", "Segment B", "Segment C", "Segment D"].map((segment) => ({
      name: segment,
      value: Math.floor(Math.random() * 40) + 60,
    }))
    analysis =
      "Customer retention is strongest in Segment A at 87%, likely due to the loyalty program implementation. Segment D shows concerning retention rates and requires immediate attention."
  } else {
    // Default data
    data = months.slice(0, 8).map((month) => ({
      name: month,
      value: Math.floor(Math.random() * 100) + 20,
    }))
    analysis =
      "The data shows fluctuating patterns over the analyzed period. Further investigation into specific metrics may reveal actionable insights for business optimization."
  }

  return {
    data,
    analysis,
  }
}

