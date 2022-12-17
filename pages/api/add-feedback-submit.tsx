import { NextApiHandler } from 'next'
import { query } from '../../lib/db'

const handler: NextApiHandler = async (req, res) => {
  const { request_id, userEmail, receiveEmail, feedback_submission, first_name, last_name } = req.body
  
  try {
    const results = await query(`
      INSERT INTO feedback (request_id, user_id_receive, user_id_give, feedback_submission, first_name, last_name)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [request_id, receiveEmail, userEmail, feedback_submission, first_name, last_name])

    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler