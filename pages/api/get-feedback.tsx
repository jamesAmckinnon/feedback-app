import { NextApiHandler } from 'next'
import { query } from '../../lib/db'

const handler: NextApiHandler = async (req, res) => {
  const { request_id } = req.query

  try {
    const results = await query(`
        SELECT feedback_submission, first_name, last_name
        FROM feedback
        WHERE feedback.request_id = ?`, [request_id])
      return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler