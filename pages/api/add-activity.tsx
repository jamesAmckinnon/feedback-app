import { NextApiHandler } from 'next'
import { query } from '../../lib/db'

const handler: NextApiHandler = async (req, res) => {
  const { date, time, time_spent, activity_type_id } = req.body
  
  try {
    const results = await query(`
        INSERT INTO activity (date, time, time_spent, activity_type_id)
        VALUES (?, ?, ?, ?) `, [date, time, time_spent, activity_type_id])

      return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler