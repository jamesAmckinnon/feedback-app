import { NextApiHandler } from 'next'
import { query } from '../../lib/db'

const handler: NextApiHandler = async (req, res) => {
  const { adaptability, attention_to_detail, business_acumen, confidence, conflict_resolution,
            decision_making, dependability, domain_knowledge, emotional_intelligence, growth_mindset,
            leadership, organization, listening, multitasking, open_mindedness, problem_solving,
            self_care, self_motivation, teamwork, time_management, verbal_communication, work_ethic,
            working_under_pressure, written_communication, userEmail, receiveEmail, userIdCombo} = req.body

  try {
    const results = await query(`
        INSERT INTO areas_for_growth (adaptability, attention_to_detail, business_acumen, confidence,
                                      conflict_resolution,
                                      decision_making, dependability, domain_knowledge, emotional_intelligence,
                                      growth_mindset,
                                      leadership, organization, listening, multitasking, open_mindedness,
                                      problem_solving,
                                      self_care, self_motivation, teamwork, time_management, verbal_communication,
                                      work_ethic,
                                      working_under_pressure, written_communication, user_id_give, user_id_receive,
                                      user_id_combo)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY
        UPDATE adaptability=?, attention_to_detail=?, business_acumen=?, confidence=?, conflict_resolution=?,
            decision_making=?, dependability=?, domain_knowledge=?, emotional_intelligence=?, growth_mindset=?,
            leadership=?, organization=?, listening=?, multitasking=?, open_mindedness=?, problem_solving=?,
            self_care=?, self_motivation=?, teamwork=?, time_management=?, verbal_communication=?, work_ethic=?,
            working_under_pressure=?, written_communication=?, user_id_give=?, user_id_receive=?
    `, [adaptability, attention_to_detail, business_acumen, confidence, conflict_resolution,
        decision_making, dependability, domain_knowledge, emotional_intelligence, growth_mindset,
        leadership, organization, listening, multitasking, open_mindedness, problem_solving,
        self_care, self_motivation, teamwork, time_management, verbal_communication, work_ethic,
        working_under_pressure, written_communication, userEmail, receiveEmail, userIdCombo,
        adaptability, attention_to_detail, business_acumen, confidence, conflict_resolution,
        decision_making, dependability, domain_knowledge, emotional_intelligence, growth_mindset,
        leadership, organization, listening, multitasking, open_mindedness, problem_solving,
        self_care, self_motivation, teamwork, time_management, verbal_communication, work_ethic,
        working_under_pressure, written_communication, userEmail, receiveEmail])

      // UPDATE dbo.ScenarioData
    // SET ScenarioData.FieldValue = DAY(CURRENT_TIMESTAMP)
    // WHERE ScenarioData.FieldName = "CoverStartDateDay";


    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler