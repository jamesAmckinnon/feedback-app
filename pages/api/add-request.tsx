import { NextApiHandler } from 'next'
import { query } from '../../lib/db'

const handler: NextApiHandler = async (req, res) => {
  const { request_title, request_note, userEmail } = req.body
  
  try {
    const results = await query(`
        INSERT INTO requests (request_title, request_note, user_id)
        VALUES (?, ?, ?) `, [request_title, request_note, userEmail])

      return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler