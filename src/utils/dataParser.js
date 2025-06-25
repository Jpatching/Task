import { parseGraphMLToJSON } from './graphmlParser';

// Parse GraphML data to extract nodes and edges for visualization
export const parseGraphMLData = async () => {
  try {
    // Load the real GraphML file
    const response = await fetch('/interesting_candidates_v5.graphml');
    if (response.ok) {
      const graphmlText = await response.text();
      return parseGraphMLToJSON(graphmlText);
    } else {
      throw new Error('Failed to load GraphML file');
    }
  } catch (error) {
    console.warn('Failed to load real data, using mock data:', error);
    // Fallback to enhanced mock data
    return getMockData();
  }
};

function getMockData() {
  const mockNodes = [
    {
      id: "researcher_1",
      name: "Dr. Sarah Johnson",
      fullName: "Dr. Sarah Johnson",
      type: "Researcher",
      education: "PhD in Biochemistry, Harvard University",
      experience: "15+ years in nutrition research",
      publications: ["Anthocyanins and Cancer Prevention", "Phytochemicals in Health", "Dietary Antioxidants"],
      group: 1
    },
    {
      id: "researcher_2", 
      name: "Dr. Michael Chen",
      fullName: "Dr. Michael Chen",
      type: "Researcher",
      education: "MD PhD, Johns Hopkins",
      experience: "12 years in cardiovascular research",
      publications: ["Pistachios and CVD Risk", "Lipid Metabolism Studies", "Heart Disease Prevention"],
      group: 1
    },
    {
      id: "researcher_3",
      name: "Dr. Emily Rodriguez",
      fullName: "Dr. Emily Rodriguez",
      type: "Researcher", 
      education: "PhD in Nutrition Science, Stanford",
      experience: "8 years in metabolomics research",
      publications: ["Flavanol Metabolites", "Dietary Bioactives", "Metabolic Pathways"],
      group: 1
    },
    {
      id: "researcher_4",
      name: "Dr. James Wilson",
      fullName: "Dr. James Wilson",
      type: "Researcher",
      education: "PhD in Molecular Biology, MIT",
      experience: "20 years in cancer research",
      publications: ["Cell Signaling Pathways", "Oncogene Expression", "Cancer Therapeutics"],
      group: 1
    },
    {
      id: "researcher_5",
      name: "Dr. Lisa Wang",
      fullName: "Dr. Lisa Wang",
      type: "Researcher",
      education: "MD PhD, UCSF",
      experience: "14 years in immunology",
      publications: ["Immune Response Mechanisms", "Autoimmune Disorders", "Vaccine Development"],
      group: 1
    },
    {
      id: "publication_1",
      name: "Anthocyanins and Cancer Prevention",
      fullName: "Anthocyanins and Cancer Prevention: A Comprehensive Review",
      type: "Publication",
      year: 2023,
      citations: 45,
      group: 2
    },
    {
      id: "publication_2", 
      name: "Pistachios and CVD Risk Factors",
      fullName: "Pistachios and Cardiovascular Disease Risk Factors: Meta-Analysis",
      type: "Publication",
      year: 2022,
      citations: 67,
      group: 2
    },
    {
      id: "publication_3",
      name: "Flavanol Metabolites Study",
      fullName: "Flavanol Metabolites and Their Bioactive Effects",
      type: "Publication",
      year: 2024,
      citations: 23,
      group: 2
    },
    {
      id: "publication_4",
      name: "Cell Signaling Pathways",
      fullName: "Novel Cell Signaling Pathways in Cancer Progression",
      type: "Publication",
      year: 2023,
      citations: 89,
      group: 2
    },
    {
      id: "institution_1",
      name: "Harvard Medical School",
      fullName: "Harvard Medical School",
      type: "Institution",
      location: "Boston, MA",
      established: 1782,
      group: 3
    },
    {
      id: "institution_2",
      name: "Johns Hopkins University",
      fullName: "Johns Hopkins University School of Medicine",
      type: "Institution",
      location: "Baltimore, MD",
      established: 1893,
      group: 3
    },
    {
      id: "institution_3",
      name: "Stanford University",
      fullName: "Stanford University School of Medicine",
      type: "Institution",
      location: "Palo Alto, CA",
      established: 1959,
      group: 3
    }
  ];

  const mockLinks = [
    {
      source: "researcher_1",
      target: "publication_1", 
      type: "AUTHORED",
      details: "Lead author on this publication",
      strength: 1.0
    },
    {
      source: "researcher_2",
      target: "publication_2",
      type: "AUTHORED", 
      details: "Principal investigator",
      strength: 1.0
    },
    {
      source: "researcher_3",
      target: "publication_3",
      type: "AUTHORED",
      details: "First author",
      strength: 1.0
    },
    {
      source: "researcher_4",
      target: "publication_4",
      type: "AUTHORED",
      details: "Senior author",
      strength: 1.0
    },
    {
      source: "researcher_1",
      target: "researcher_3",
      type: "COLLABORATED",
      details: "Co-authored 3 publications together",
      strength: 0.8
    },
    {
      source: "researcher_2",
      target: "researcher_4",
      type: "COLLABORATED",
      details: "Joint research grant on cardiovascular health",
      strength: 0.7
    },
    {
      source: "researcher_4",
      target: "researcher_5",
      type: "COLLABORATED",
      details: "Cancer immunotherapy research partnership",
      strength: 0.9
    },
    {
      source: "researcher_1",
      target: "institution_1",
      type: "AFFILIATED",
      details: "Professor at Harvard Medical School",
      strength: 0.95
    },
    {
      source: "researcher_2",
      target: "institution_2",
      type: "AFFILIATED",
      details: "Associate Professor at Johns Hopkins",
      strength: 0.9
    },
    {
      source: "researcher_3",
      target: "institution_3",
      type: "AFFILIATED",
      details: "Research Scientist at Stanford",
      strength: 0.85
    },
    {
      source: "publication_1",
      target: "institution_1",
      type: "PUBLISHED_BY",
      details: "Published through Harvard Medical School",
      strength: 0.6
    },
    {
      source: "publication_2",
      target: "institution_2",
      type: "PUBLISHED_BY",
      details: "Published through Johns Hopkins",
      strength: 0.6
    }
  ];

  return { nodes: mockNodes, links: mockLinks };
}

export const searchNodes = (nodes, searchTerm) => {
  if (!searchTerm) return nodes;
  
  return nodes.filter(node => 
    node.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    node.education?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    node.experience?.toLowerCase().includes(searchTerm.toLowerCase())
  );
};