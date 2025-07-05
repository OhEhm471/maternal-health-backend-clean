import dictionary from '../data/symptomDictionary.js';

export const checkSymptoms = async (req, res) => {
  try {
    const input = req.body.symptoms; // can be comma-separated string or array
    if (!input) return res.status(400).json({ message: 'Symptoms required' });

    const symptoms = Array.isArray(input)
      ? input.map(s => s.toLowerCase().trim())
      : input.toLowerCase().split(',').map(s => s.trim());

    const results = symptoms.map(symptom => {
      if (dictionary[symptom]) {
        return {
          symptom,
          level: dictionary[symptom].level,
          advice: dictionary[symptom].advice,
        };
      } else {
        return {
          symptom,
          level: 'unknown',
          advice: 'No specific advice available. Contact a provider if you feel unwell.',
        };
      }
    });

    res.json({ symptoms: results });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Symptom check failed' });
  }
};
