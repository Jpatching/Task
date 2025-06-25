import { HealthcareProfessional } from '../types';

export const healthcareProfessionals: HealthcareProfessional[] = [
  {
    id: 'emily-carter',
    name: 'Dr. Emily Carter',
    specialty: 'Cardiologist',
    education: 'Harvard Medical University',
    workplaces: ['Massachusetts General Hospital', 'Boston Medical Center'],
    experience: 'Experienced and compassionate doctor specializing in cardiology with over 15 years of practice.',
    publications: ['Cardiovascular Health in Modern Practice', 'Advanced Cardiac Procedures', 'Heart Disease Prevention'],
    peersCount: 232,
    followingCount: 124,
    patientsServed: 1000,
    successRate: 95,
    about: 'Dr. Emily Carter is a board-certified cardiologist with extensive experience in treating complex cardiovascular conditions. She specializes in interventional cardiology and has published numerous research papers on heart disease prevention.',
    connections: [
      {
        id: 'michael-johnson',
        type: 'co-author',
        description: 'Co-authored 5 publications on cardiovascular-neurological connections',
        strength: 4,
        details: ['Cardiovascular Risk in Stroke Patients', 'Heart-Brain Axis Research', 'Multidisciplinary Care Protocols']
      },
      {
        id: 'sarah-williams',
        type: 'referral',
        description: 'Frequent referrals for pediatric cardiac cases',
        strength: 3,
        details: ['15+ pediatric referrals', 'Collaborative care plans', 'Family consultation meetings']
      },
      {
        id: 'david-lee',
        type: 'workplace',
        description: 'Colleagues at Massachusetts General Hospital',
        strength: 5,
        details: ['Same department', 'Joint surgical procedures', 'Research collaboration']
      },
      {
        id: 'lisa-chen',
        type: 'co-author',
        description: 'Imaging research collaboration',
        strength: 3,
        details: ['Advanced Cardiac Imaging Studies', 'Diagnostic Protocol Development']
      }
    ],
    avatar: '❤️',
    position: { x: 0, y: 0 },
    yearsExperience: 15,
    certifications: ['Board Certified Cardiologist', 'Interventional Cardiology', 'Nuclear Cardiology'],
    researchAreas: ['Interventional Cardiology', 'Heart Disease Prevention', 'Cardiac Imaging']
  },
  {
    id: 'michael-johnson',
    name: 'Dr. Michael Johnson',
    specialty: 'Neurologist',
    education: 'Johns Hopkins University',
    workplaces: ['Johns Hopkins Hospital', 'NIH Clinical Center'],
    experience: 'Specialist in neurological disorders and brain health with focus on stroke prevention.',
    publications: ['Neuroscience Advances', 'Brain Health Research', 'Stroke Prevention Protocols'],
    peersCount: 189,
    followingCount: 98,
    patientsServed: 850,
    successRate: 92,
    about: 'Dr. Michael Johnson is a leading neurologist specializing in stroke prevention and brain health. His research has contributed significantly to understanding neurological disorders.',
    connections: [
      {
        id: 'emily-carter',
        type: 'co-author',
        description: 'Cardiovascular-neurological research collaboration',
        strength: 4,
        details: ['Heart-Brain Axis Studies', 'Stroke Prevention Guidelines']
      },
      {
        id: 'robert-brown',
        type: 'education',
        description: 'Alumni network from Johns Hopkins',
        strength: 2,
        details: ['Same medical school', 'Joint conferences']
      },
      {
        id: 'maria-rodriguez',
        type: 'referral',
        description: 'Neuropsychiatry referrals',
        strength: 3,
        details: ['Complex neurological cases', 'Mental health consultations']
      }
    ],
    avatar: '🧠',
    position: { x: -250, y: -150 },
    yearsExperience: 12,
    certifications: ['Board Certified Neurologist', 'Stroke Medicine', 'Neurophysiology'],
    researchAreas: ['Stroke Prevention', 'Neuroplasticity', 'Brain Health']
  },
  {
    id: 'sarah-williams',
    name: 'Dr. Sarah Williams',
    specialty: 'Pediatrician',
    education: 'Stanford Medical School',
    workplaces: ['Stanford Children\'s Hospital', 'Lucile Packard Children\'s Hospital'],
    experience: 'Dedicated to children\'s health and development with expertise in pediatric care.',
    publications: ['Pediatric Care Guidelines', 'Child Development Studies', 'Immunization Research'],
    peersCount: 156,
    followingCount: 87,
    patientsServed: 1200,
    successRate: 98,
    about: 'Dr. Sarah Williams is a compassionate pediatrician dedicated to providing comprehensive healthcare for children from infancy through adolescence.',
    connections: [
      {
        id: 'emily-carter',
        type: 'referral',
        description: 'Receives pediatric cardiac referrals from cardiologist',
        strength: 3,
        details: ['Congenital heart defect cases', 'Pediatric cardiology consultations', 'Family-centered care coordination']
      },
      {
        id: 'james-wilson',
        type: 'referral',
        description: 'Sports injury referrals for young athletes',
        strength: 4,
        details: ['Adolescent sports medicine', 'Growth plate injury consultations', 'Return-to-play clearances']
      },
      {
        id: 'anna-thompson',
        type: 'co-author',
        description: 'Pediatric dermatology research collaboration',
        strength: 3,
        details: ['Childhood skin condition studies', 'Pediatric dermatitis research', 'Adolescent acne treatment protocols']
      }
    ],
    avatar: '👶',
    position: { x: 250, y: -150 },
    yearsExperience: 10,
    certifications: ['Board Certified Pediatrician', 'Pediatric Advanced Life Support', 'Adolescent Medicine'],
    researchAreas: ['Child Development', 'Pediatric Immunology', 'Adolescent Health']
  },
  {
    id: 'david-lee',
    name: 'Dr. David Lee',
    specialty: 'Surgeon',
    education: 'Mayo Clinic',
    workplaces: ['Massachusetts General Hospital', 'Mayo Clinic Rochester'],
    experience: 'Expert in minimally invasive surgical procedures with focus on patient safety.',
    publications: ['Modern Surgical Techniques', 'Patient Safety Protocols', 'Minimally Invasive Surgery'],
    peersCount: 203,
    followingCount: 156,
    patientsServed: 750,
    successRate: 94,
    about: 'Dr. David Lee is a skilled surgeon known for his expertise in minimally invasive procedures and commitment to patient safety and recovery.',
    connections: [
      {
        id: 'emily-carter',
        type: 'workplace',
        description: 'Surgical colleagues at Massachusetts General Hospital',
        strength: 5,
        details: ['Cardiac surgery team', 'Joint procedures', 'Multidisciplinary rounds']
      },
      {
        id: 'kevin-martinez',
        type: 'referral',
        description: 'Ophthalmology surgical consultations',
        strength: 3,
        details: ['Orbital surgery cases', 'Trauma reconstruction', 'Surgical planning consultations']
      },
      {
        id: 'susan-davis',
        type: 'co-author',
        description: 'Metabolic surgery research collaboration',
        strength: 4,
        details: ['Bariatric surgery outcomes', 'Diabetes surgery protocols', 'Post-operative endocrine management']
      }
    ],
    avatar: '🔬',
    position: { x: 0, y: 200 },
    yearsExperience: 18,
    certifications: ['Board Certified General Surgeon', 'Minimally Invasive Surgery', 'Robotic Surgery'],
    researchAreas: ['Minimally Invasive Surgery', 'Surgical Safety', 'Robotic Surgery']
  },
  {
    id: 'lisa-chen',
    name: 'Dr. Lisa Chen',
    specialty: 'Radiologist',
    education: 'UCSF Medical Center',
    workplaces: ['UCSF Medical Center', 'Stanford Radiology Department'],
    experience: 'Advanced imaging and diagnostic expertise with focus on early disease detection.',
    publications: ['Imaging Innovations', 'Diagnostic Accuracy Studies', 'Radiology Technology'],
    peersCount: 134,
    followingCount: 76,
    patientsServed: 2000,
    successRate: 96,
    about: 'Dr. Lisa Chen is a board-certified radiologist specializing in advanced imaging techniques and early disease detection.',
    connections: [
      {
        id: 'emily-carter',
        type: 'co-author',
        description: 'Cardiac imaging research and diagnostic collaboration',
        strength: 3,
        details: ['Cardiac CT angiography studies', 'Advanced cardiac imaging protocols', 'Diagnostic accuracy research']
      },
      {
        id: 'michael-johnson',
        type: 'referral',
        description: 'Neuroimaging consultations for stroke patients',
        strength: 4,
        details: ['Acute stroke imaging', 'Brain perfusion studies', 'Neurological emergency consultations']
      }
    ],
    avatar: '📊',
    position: { x: -200, y: 100 },
    yearsExperience: 8,
    certifications: ['Board Certified Radiologist', 'Cardiac Imaging', 'Neuroradiology'],
    researchAreas: ['Advanced Imaging Techniques', 'Cardiac Imaging', 'AI in Radiology']
  },
  {
    id: 'robert-brown',
    name: 'Dr. Robert Brown',
    specialty: 'Oncologist',
    education: 'MD Anderson Cancer Center',
    workplaces: ['MD Anderson Cancer Center', 'Johns Hopkins Sidney Kimmel Cancer Center'],
    experience: 'Cancer treatment and research specialist with focus on personalized therapy.',
    publications: ['Cancer Research Breakthrough', 'Treatment Protocols', 'Personalized Medicine'],
    peersCount: 167,
    followingCount: 134,
    patientsServed: 600,
    successRate: 89,
    about: 'Dr. Robert Brown is an oncologist dedicated to providing cutting-edge cancer treatment and advancing personalized therapy approaches.',
    connections: [
      {
        id: 'michael-johnson',
        type: 'education',
        description: 'Alumni network and neurological oncology consultations',
        strength: 3,
        details: ['Brain tumor cases', 'Neurological complications of cancer', 'Johns Hopkins alumni network']
      },
      {
        id: 'maria-rodriguez',
        type: 'referral',
        description: 'Mental health support for cancer patients',
        strength: 4,
        details: ['Cancer patient depression', 'Anxiety management', 'End-of-life counseling']
      }
    ],
    avatar: '🎗️',
    position: { x: -300, y: 50 },
    yearsExperience: 14,
    certifications: ['Board Certified Medical Oncologist', 'Hematology-Oncology', 'Palliative Care'],
    researchAreas: ['Personalized Medicine', 'Immunotherapy', 'Cancer Genetics']
  },
  {
    id: 'maria-rodriguez',
    name: 'Dr. Maria Rodriguez',
    specialty: 'Psychiatrist',
    education: 'Columbia University',
    workplaces: ['NewYork-Presbyterian Hospital', 'Columbia University Medical Center'],
    experience: 'Mental health and behavioral therapy expert with focus on anxiety and depression.',
    publications: ['Mental Health Innovations', 'Therapy Effectiveness', 'Behavioral Medicine'],
    peersCount: 145,
    followingCount: 89,
    patientsServed: 900,
    successRate: 93,
    about: 'Dr. Maria Rodriguez is a psychiatrist specializing in treating anxiety, depression, and other mental health conditions using evidence-based approaches.',
    connections: [
      {
        id: 'michael-johnson',
        type: 'referral',
        description: 'Neuropsychiatry collaboration for complex cases',
        strength: 4,
        details: ['Post-stroke depression', 'Neurological behavior changes', 'Cognitive assessment referrals']
      },
      {
        id: 'robert-brown',
        type: 'referral',
        description: 'Psycho-oncology support services',
        strength: 5,
        details: ['Cancer patient mental health', 'Family therapy sessions', 'Grief counseling']
      }
    ],
    avatar: '🧘',
    position: { x: -100, y: -200 },
    yearsExperience: 11,
    certifications: ['Board Certified Psychiatrist', 'Addiction Medicine', 'Psycho-oncology'],
    researchAreas: ['Anxiety Disorders', 'Depression Treatment', 'Psycho-oncology']
  },
  {
    id: 'james-wilson',
    name: 'Dr. James Wilson',
    specialty: 'Orthopedist',
    education: 'Cleveland Clinic',
    workplaces: ['Cleveland Clinic', 'Hospital for Special Surgery'],
    experience: 'Sports medicine and joint replacement specialist with focus on rehabilitation.',
    publications: ['Orthopedic Advances', 'Sports Medicine', 'Joint Replacement'],
    peersCount: 178,
    followingCount: 112,
    patientsServed: 800,
    successRate: 91,
    about: 'Dr. James Wilson is an orthopedic surgeon specializing in sports medicine and joint replacement surgery.',
    connections: [
      {
        id: 'sarah-williams',
        type: 'referral',
        description: 'Pediatric orthopedic consultations and sports injuries',
        strength: 4,
        details: ['Youth sports injuries', 'Growth plate fractures', 'Adolescent orthopedic care']
      },
      {
        id: 'anna-thompson',
        type: 'co-author',
        description: 'Dermatological complications in orthopedic surgery',
        strength: 3,
        details: ['Wound healing research', 'Post-surgical skin care', 'Infection prevention protocols']
      }
    ],
    avatar: '🦴',
    position: { x: 200, y: 100 },
    yearsExperience: 16,
    certifications: ['Board Certified Orthopedic Surgeon', 'Sports Medicine', 'Joint Reconstruction'],
    researchAreas: ['Sports Medicine', 'Joint Replacement', 'Orthopedic Trauma']
  },
  {
    id: 'anna-thompson',
    name: 'Dr. Anna Thompson',
    specialty: 'Dermatologist',
    education: 'UCLA Medical Center',
    workplaces: ['UCLA Medical Center', 'Cedars-Sinai Medical Center'],
    experience: 'Dermatology specialist with focus on skin cancer prevention and cosmetic procedures.',
    publications: ['Dermatology Research', 'Skin Cancer Prevention', 'Cosmetic Procedures'],
    peersCount: 123,
    followingCount: 67,
    patientsServed: 1100,
    successRate: 97,
    about: 'Dr. Anna Thompson is a dermatologist specializing in skin cancer prevention, treatment, and cosmetic dermatology.',
    connections: [
      {
        id: 'sarah-williams',
        type: 'co-author',
        description: 'Pediatric dermatology research and consultations',
        strength: 4,
        details: ['Childhood eczema studies', 'Pediatric skin cancer prevention', 'Birthmark consultations']
      },
      {
        id: 'james-wilson',
        type: 'co-author',
        description: 'Surgical wound care and healing research',
        strength: 3,
        details: ['Post-operative wound management', 'Scar treatment protocols', 'Surgical site infection prevention']
      }
    ],
    avatar: '✨',
    position: { x: 300, y: 0 },
    yearsExperience: 9,
    certifications: ['Board Certified Dermatologist', 'Mohs Surgery', 'Cosmetic Dermatology'],
    researchAreas: ['Skin Cancer Prevention', 'Pediatric Dermatology', 'Cosmetic Dermatology']
  },
  {
    id: 'kevin-martinez',
    name: 'Dr. Kevin Martinez',
    specialty: 'Ophthalmologist',
    education: 'Duke University',
    workplaces: ['Duke Eye Center', 'Bascom Palmer Eye Institute'],
    experience: 'Eye specialist with focus on retinal diseases and vision restoration.',
    publications: ['Ophthalmology Research', 'Retinal Studies', 'Vision Restoration'],
    peersCount: 156,
    followingCount: 94,
    patientsServed: 750,
    successRate: 95,
    about: 'Dr. Kevin Martinez is an ophthalmologist specializing in retinal diseases and advanced vision restoration techniques.',
    connections: [
      {
        id: 'david-lee',
        type: 'referral',
        description: 'Orbital and oculoplastic surgery consultations',
        strength: 4,
        details: ['Orbital trauma cases', 'Eyelid reconstruction', 'Tear duct surgery']
      },
      {
        id: 'susan-davis',
        type: 'co-author',
        description: 'Diabetic retinopathy research collaboration',
        strength: 5,
        details: ['Diabetic eye disease studies', 'Retinal screening protocols', 'Endocrine-ophthalmology interface']
      }
    ],
    avatar: '👁️',
    position: { x: 100, y: 250 },
    yearsExperience: 13,
    certifications: ['Board Certified Ophthalmologist', 'Vitreoretinal Surgery', 'Retinal Diseases'],
    researchAreas: ['Retinal Diseases', 'Diabetic Retinopathy', 'Vision Restoration']
  },
  {
    id: 'susan-davis',
    name: 'Dr. Susan Davis',
    specialty: 'Endocrinologist',
    education: 'Vanderbilt University',
    workplaces: ['Vanderbilt University Medical Center', 'Mayo Clinic'],
    experience: 'Hormone and diabetes specialist with focus on metabolic disorders.',
    publications: ['Endocrinology Advances', 'Diabetes Management', 'Metabolic Research'],
    peersCount: 134,
    followingCount: 78,
    patientsServed: 950,
    successRate: 94,
    about: 'Dr. Susan Davis is an endocrinologist specializing in diabetes management and metabolic disorders.',
    connections: [
      {
        id: 'david-lee',
        type: 'co-author',
        description: 'Metabolic surgery and endocrine outcomes research',
        strength: 4,
        details: ['Bariatric surgery endocrine effects', 'Post-surgical hormone management', 'Diabetes remission studies']
      },
      {
        id: 'kevin-martinez',
        type: 'co-author',
        description: 'Diabetic complications and ophthalmology collaboration',
        strength: 5,
        details: ['Diabetic retinopathy prevention', 'Comprehensive diabetes care', 'Multi-specialty diabetes clinics']
      }
    ],
    avatar: '🩺',
    position: { x: -100, y: 250 },
    yearsExperience: 12,
    certifications: ['Board Certified Endocrinologist', 'Diabetes Technology', 'Obesity Medicine'],
    researchAreas: ['Diabetes Management', 'Metabolic Surgery', 'Hormone Therapy']
  }
];