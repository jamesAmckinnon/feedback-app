import { NextApiHandler } from 'next'
import { query } from '../../lib/db'

const handler: NextApiHandler = async (req, res) => {
  const { userEmail, first_name, last_name } = req.body
  
  try {
    const results = await query(`
        INSERT INTO users (user_id, first_name, last_name)
        VALUES (?, ?, ?)
    `, [userEmail, first_name, last_name])

      return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler