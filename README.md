# PeerSpace Healthcare Network

A modern web application for visualizing and exploring professional networks in healthcare. This interactive platform allows healthcare professionals to discover connections, explore collaboration opportunities, and build their professional network.

## Features

- **Interactive Network Visualization**: Dynamic graph showing relationships between healthcare professionals
- **Real-time Search**: Quickly find professionals by name or specialty
- **Connection Types**: Visualize different relationship types (co-authorship, workplace, education, referrals, mentorship)
- **Professional Profiles**: Detailed profiles with experience, education, and metrics
- **Mobile Responsive**: Fully optimized for both desktop and mobile devices
- **Modern UI**: Clean, intuitive interface built with Tailwind CSS

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Visualization**: Custom Canvas-based network graph
- **Icons**: Heroicons and Lucide React
- **Build Tool**: Create React App
- **Deployment**: Vercel-ready configuration

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd healthcare-network-graph
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will open at [http://localhost:3000](http://localhost:3000).

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## Project Structure

```
src/
├── components/          # React components
│   ├── EnhancedNetworkGraph.tsx    # Main network visualization
│   ├── EnhancedSearch.tsx          # Search functionality
│   ├── LeftSidebar.tsx             # Navigation sidebar
│   └── ProfilePanel.tsx            # Professional profile display
├── data/               # Mock data
│   └── professionals.ts
├── types.ts            # TypeScript type definitions
├── utils/              # Utility functions
│   ├── dataParser.js
│   └── graphmlParser.js
└── App.tsx             # Main application component
```

## Key Features Explained

### Network Graph
The network visualization uses a custom Canvas implementation for optimal performance with large datasets. Professionals are positioned using a concentric circle layout based on their connections to the selected professional.

### Connection Types
- **Co-author** (Blue): Research collaboration
- **Workplace** (Green): Current or past colleagues
- **Education** (Purple): Shared educational background
- **Referral** (Yellow): Professional referrals
- **Mentor** (Red): Mentorship relationships

### Search Functionality
Real-time search with highlighting of matching professionals in the network graph. Search by name or filter by specialty.

## Performance Considerations

- Canvas-based rendering for smooth interaction with hundreds of nodes
- Efficient layout algorithms for network visualization
- Debounced search for optimal performance
- Mobile-optimized touch interactions

## Deployment

The project includes a `vercel.json` configuration for easy deployment to Vercel. Simply connect your GitHub repository to Vercel for automatic deployments.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome for Android)

## Contributing

This project follows standard React and TypeScript best practices. Please ensure all code is properly typed and follows the existing code style.

## License

This project is proprietary and confidential.
