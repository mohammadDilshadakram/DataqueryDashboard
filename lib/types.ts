export interface DataPoint {
  name: string
  value: number
}

export interface QueryResults {
  data: DataPoint[]
  analysis: string
}

export interface Query {
  id: string
  text: string
  timestamp: number
  results: QueryResults
}

