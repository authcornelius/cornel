import dotenv from 'dotenv'
import { MongoClient } from 'mongodb'

dotenv.config()

if (!process.env.MONGODB_URI) {
  throw new Error('Add MONGODB_URI to .env.local')
}

const MONGODB_URI = process.env.MONGODB_URI

let cachedClient: MongoClient | null = null
let cachedDb: any = null

export async function connectToDatabase() {
    if (cachedClient && cachedDb) {
        return { client: cachedClient, db: cachedDb }
    }

    try {
        const client = new MongoClient(MONGODB_URI)
        await client.connect()
        
        const db = client.db() // Uses the database name from the connection string
        
        cachedClient = client
        cachedDb = db
        
        console.log('MongoDB connected successfully!')
        return { client, db }
    } catch (error) {
        throw error
    }
}
