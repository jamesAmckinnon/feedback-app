import { NextApiHandler } from 'next'
import { query } from '../../lib/db'

const handler: NextApiHandler = async (req, res) => {
  const { user_id } = req.query

  try {
    const results = await query(`
        SELECT request_title, request_note, request_id
        FROM requests
        WHERE requests.user_id = ?`, [user_id])
      return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler