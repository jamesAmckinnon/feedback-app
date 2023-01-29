import { NextApiHandler } from 'next'
import { query } from '../../lib/db'

const handler: NextApiHandler = async (req, res) => {
  const { userEmail } = req.query

  try {
    const results = await query(`
        SELECT adaptability,
               attention_to_detail,
               business_acumen,
               confidence,
               conflict_resolution,
               decision_making,
               dependability,
               domain_knowledge,
               emotional_intelligence,
               growth_mindset,
               leadership,
               listening,
               multitasking,
               open_mindedness,
               organization,
               problem_solving,
               self_care,
               self_motivation,
               teamwork,
               time_management,
               verbal_communication,
               work_ethic,
               working_under_pressure,
               written_communication
        FROM areas_for_growth
        WHERE areas_for_growth.user_id_receive = ?`, [userEmail])
      return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler

