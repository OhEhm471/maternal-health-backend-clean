// server/data/symptomDictionary.js
const dictionary = {
  bleeding: {
    level: 'critical',
    advice: 'Seek immediate medical attention or use the SOS feature.',
  },
  headache: {
    level: 'moderate',
    advice: 'Rest and stay hydrated. If persistent or severe, consult a doctor.',
  },
  swelling: {
    level: 'moderate',
    advice: 'This can be normal, but if it’s sudden or severe, contact a provider.',
  },
  dizziness: {
    level: 'moderate',
    advice: 'Could be due to low blood pressure. Sit down and rest. Monitor your condition.',
  },
  fever: {
    level: 'critical',
    advice: 'High fever in pregnancy is dangerous. Go to the clinic immediately.',
  },
  contractions: {
    level: 'moderate',
    advice: 'May be normal. If frequent and painful, visit a healthcare provider.',
  },
  vomiting: {
    level: 'low',
    advice: 'Common in early pregnancy. If excessive, consult a provider.',
  },
};

export default dictionary;
