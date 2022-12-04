import { NextApiHandler } from 'next'
import { query } from '../../lib/db'

const handler: NextApiHandler = async (req, res) => {
  const { first_name, last_name, userEmail } = req.body
  
  try {
    const results = await query(
      `
      UPDATE users
      SET first_name = ?, last_name = ?
      WHERE users.user_id = ?
      `, [first_name, last_name, userEmail]
      )
      
    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler