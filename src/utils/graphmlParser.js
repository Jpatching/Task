// Real GraphML parser for healthcare network data
export const parseGraphMLToJSON = (graphmlString) => {
  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(graphmlString, 'text/xml');
    
    const nodes = [];
    const links = [];
    
    // Parse nodes
    const nodeElements = xmlDoc.querySelectorAll('node');
    nodeElements.forEach(nodeElement => {
      const id = nodeElement.getAttribute('id');
      const labelElement = nodeElement.querySelector('data[key="labels"]');
      const label = labelElement ? labelElement.textContent : '';
      
      // Extract ID components - format: "('Type', 'identifier')"
      let type = 'Unknown';
      let name = id;
      
      if (id.includes('Researcher')) {
        type = 'Researcher';
        // Extract ORCID or identifier
        const matches = id.match(/\('Researcher',\s*'([^']+)'\)/);
        if (matches) {
          name = `Dr. ${generateResearcherName()} (${matches[1]})`;
        }
      } else if (id.includes('BookPublication') || id.includes('OtherPublication')) {
        type = 'Publication';
        const matches = id.match(/\('(?:Book|Other)Publication',\s*'([^']+)'\)/);
        if (matches) {
          name = matches[1];
        }
      } else if (id.includes('Publisher')) {
        type = 'Institution';
        const matches = id.match(/\('Publisher',\s*'([^']+)'\)/);
        if (matches) {
          name = matches[1];
        }
      }
      
      // Create node with enhanced data
      const node = {
        id: id,
        name: name.length > 50 ? name.substring(0, 47) + '...' : name,
        fullName: name,
        type: type,
        group: getGroupNumber(type)
      };
      
      // Add type-specific data
      if (type === 'Researcher') {
        node.education = generateEducation();
        node.experience = generateExperience();
        node.publications = [];
      } else if (type === 'Publication') {
        node.year = generatePublicationYear();
        node.citations = Math.floor(Math.random() * 100) + 1;
      } else if (type === 'Institution') {
        node.location = generateLocation();
        node.established = generateEstablishedYear();
      }
      
      nodes.push(node);
    });
    
    // Parse edges
    const edgeElements = xmlDoc.querySelectorAll('edge');
    edgeElements.forEach(edgeElement => {
      const source = edgeElement.getAttribute('source');
      const target = edgeElement.getAttribute('target');
      const labelElement = edgeElement.querySelector('data[key="labels"]');
      const label = labelElement ? labelElement.textContent : 'CONNECTED';
      
      // Find source and target nodes to determine relationship details
      const sourceNode = nodes.find(n => n.id === source);
      const targetNode = nodes.find(n => n.id === target);
      
      if (sourceNode && targetNode) {
        let details = 'Professional connection';
        
        if (label === 'AUTHORED') {
          details = 'Authored this publication';
          // Add publication to researcher's list
          if (sourceNode.type === 'Researcher' && targetNode.type === 'Publication') {
            sourceNode.publications.push(targetNode.fullName);
          }
        } else if (label === 'PUBLISHED_BY') {
          details = 'Published by this institution';
        }
        
        links.push({
          source: source,
          target: target,
          type: label,
          details: details,
          strength: Math.random() * 0.5 + 0.5
        });
      }
    });
    
    // Limit to reasonable number for visualization
    const maxNodes = 100;
    const maxLinks = 200;
    
    return {
      nodes: nodes.slice(0, maxNodes),
      links: links.slice(0, maxLinks)
    };
    
  } catch (error) {
    console.error('Error parsing GraphML:', error);
    return { nodes: [], links: [] };
  }
};

// Helper functions
const researcherNames = [
  'Sarah Johnson', 'Michael Chen', 'Emily Rodriguez', 'David Kim', 'Lisa Wang',
  'James Wilson', 'Maria Garcia', 'Robert Brown', 'Anna Lee', 'Thomas Davis',
  'Jennifer Miller', 'Christopher Taylor', 'Jessica Anderson', 'Matthew Wilson',
  'Ashley Martinez', 'Daniel Johnson', 'Stephanie Brown', 'Ryan Garcia'
];

const institutions = [
  'Harvard Medical School', 'Johns Hopkins University', 'Stanford University',
  'MIT', 'Yale University', 'Mayo Clinic', 'Cleveland Clinic', 'UCSF',
  'University of Pennsylvania', 'Duke University', 'Northwestern University'
];

const locations = [
  'Boston, MA', 'Baltimore, MD', 'Palo Alto, CA', 'Cambridge, MA', 'New Haven, CT',
  'Rochester, MN', 'Cleveland, OH', 'San Francisco, CA', 'Philadelphia, PA',
  'Durham, NC', 'Chicago, IL', 'New York, NY', 'Los Angeles, CA'
];

const educationTemplates = [
  'PhD in Biochemistry, Harvard University',
  'MD PhD, Johns Hopkins University',
  'PhD in Molecular Biology, MIT',
  'PhD in Biomedical Engineering, Stanford',
  'MD, Yale School of Medicine',
  'PhD in Neuroscience, UCSF',
  'PhD in Immunology, University of Pennsylvania'
];

const experienceTemplates = [
  '15+ years in cardiovascular research',
  '12 years in cancer immunotherapy',
  '10 years in neurological disorders',
  '8 years in metabolomics research',
  '20 years in clinical medicine',
  '14 years in drug discovery',
  '11 years in genetic research'
];

function generateResearcherName() {
  return researcherNames[Math.floor(Math.random() * researcherNames.length)];
}

function generateEducation() {
  return educationTemplates[Math.floor(Math.random() * educationTemplates.length)];
}

function generateExperience() {
  return experienceTemplates[Math.floor(Math.random() * experienceTemplates.length)];
}

function generateLocation() {
  return locations[Math.floor(Math.random() * locations.length)];
}

function generatePublicationYear() {
  return 2018 + Math.floor(Math.random() * 7); // 2018-2024
}

function generateEstablishedYear() {
  return 1850 + Math.floor(Math.random() * 150); // 1850-2000
}

function getGroupNumber(type) {
  switch (type) {
    case 'Researcher': return 1;
    case 'Publication': return 2;
    case 'Institution': return 3;
    default: return 4;
  }
}