import React, { useRef, useEffect, useState, useCallback } from 'react';
import { HealthcareProfessional, Connection } from '../types';

interface HoverInfo {
  type: 'node' | 'connection';
  data: HealthcareProfessional | { connection: Connection; source: HealthcareProfessional; target: HealthcareProfessional };
  x: number;
  y: number;
}

interface EnhancedNetworkGraphProps {
  professionals: HealthcareProfessional[];
  selectedProfessional: HealthcareProfessional | null;
  onNodeClick: (professional: HealthcareProfessional) => void;
  searchQuery: string;
  searchResults: HealthcareProfessional[];
}

const EnhancedNetworkGraph: React.FC<EnhancedNetworkGraphProps> = ({
  professionals,
  selectedProfessional,
  onNodeClick,
  searchQuery,
  searchResults,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoverInfo, setHoverInfo] = useState<HoverInfo | null>(null);
  const [selectedConnection, setSelectedConnection] = useState<{connection: Connection; source: HealthcareProfessional; target: HealthcareProfessional} | null>(null);
  const [showLegend, setShowLegend] = useState<boolean>(false);

  // Dynamic layout calculation based on selected professional
  const calculateLayout = useCallback((centerProfessional: HealthcareProfessional) => {
    const layoutProfessionals = [...professionals];
    
    // Place center professional at origin
    const centerIndex = layoutProfessionals.findIndex(p => p.id === centerProfessional.id);
    if (centerIndex !== -1) {
      layoutProfessionals[centerIndex] = { ...centerProfessional, position: { x: 0, y: 0 } };
    }

    // Position connected professionals in concentric circles
    const connected = centerProfessional.connections.map(conn => 
      professionals.find(p => p.id === conn.id)
    ).filter(Boolean) as HealthcareProfessional[];

    const directRadius = 200;
    const indirectRadius = 350;

    // First circle: Direct connections
    connected.forEach((prof, index) => {
      const angle = (2 * Math.PI * index) / connected.length;
      const profIndex = layoutProfessionals.findIndex(p => p.id === prof.id);
      if (profIndex !== -1) {
        layoutProfessionals[profIndex] = {
          ...prof,
          position: {
            x: Math.cos(angle) * directRadius,
            y: Math.sin(angle) * directRadius
          }
        };
      }
    });

    // Second circle: Indirect connections
    const indirect = professionals.filter(p => 
      p.id !== centerProfessional.id && 
      !connected.find(c => c.id === p.id)
    );

    indirect.forEach((prof, index) => {
      const angle = (2 * Math.PI * index) / indirect.length;
      const profIndex = layoutProfessionals.findIndex(p => p.id === prof.id);
      if (profIndex !== -1) {
        layoutProfessionals[profIndex] = {
          ...prof,
          position: {
            x: Math.cos(angle) * indirectRadius,
            y: Math.sin(angle) * indirectRadius
          }
        };
      }
    });

    return layoutProfessionals;
  }, [professionals]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !selectedProfessional) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const layoutProfessionals = calculateLayout(selectedProfessional);

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) {
        setTimeout(resizeCanvas, 100);
        return;
      }
      
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      drawNetwork();
    };

    const drawNetwork = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Draw connections with labels
      layoutProfessionals.forEach(prof => {
        prof.connections.forEach(connData => {
          const connected = layoutProfessionals.find(p => p.id === connData.id);
          if (connected) {
            const isHighlighted = selectedProfessional.id === prof.id || selectedProfessional.id === connected.id;
            
            // Connection line
            ctx.strokeStyle = getConnectionColor(connData.type);
            ctx.lineWidth = connData.strength + 1;
            ctx.globalAlpha = isHighlighted ? 0.8 : 0.4;
            
            ctx.beginPath();
            ctx.moveTo(centerX + prof.position.x, centerY + prof.position.y);
            ctx.lineTo(centerX + connected.position.x, centerY + connected.position.y);
            ctx.stroke();
            
            // Connection label
            if (isHighlighted) {
              const midX = centerX + (prof.position.x + connected.position.x) / 2;
              const midY = centerY + (prof.position.y + connected.position.y) / 2;
              
              ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
              ctx.fillRect(midX - 30, midY - 8, 60, 16);
              
              ctx.fillStyle = '#374151';
              ctx.font = '10px Inter, sans-serif';
              ctx.textAlign = 'center';
              ctx.fillText(connData.type, midX, midY + 3);
            }
            
            ctx.globalAlpha = 1;
          }
        });
      });

      // Draw professional nodes
      layoutProfessionals.forEach(prof => {
        const isSelected = selectedProfessional.id === prof.id;
        const isSearchResult = searchResults.some(sr => sr.id === prof.id);
        const size = isSelected ? 50 : 35;
        
        const x = centerX + prof.position.x;
        const y = centerY + prof.position.y;

        // Search highlight
        if (isSearchResult && searchQuery) {
          ctx.beginPath();
          ctx.arc(x, y, size + 15, 0, 2 * Math.PI);
          ctx.strokeStyle = '#fbbf24';
          ctx.lineWidth = 4;
          ctx.setLineDash([5, 5]);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        // Outer ring with specialty color
        ctx.beginPath();
        ctx.arc(x, y, size + 4, 0, 2 * Math.PI);
        ctx.fillStyle = getSpecialtyColor(prof.specialty);
        ctx.fill();

        // Inner white ring
        ctx.beginPath();
        ctx.arc(x, y, size + 2, 0, 2 * Math.PI);
        ctx.fillStyle = 'white';
        ctx.fill();
        
        // Profile circle
        ctx.beginPath();
        ctx.arc(x, y, size, 0, 2 * Math.PI);
        
        const gradient = ctx.createLinearGradient(x - size, y - size, x + size, y + size);
        gradient.addColorStop(0, '#f3f4f6');
        gradient.addColorStop(1, '#d1d5db');
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Avatar
        ctx.fillStyle = '#6b7280';
        ctx.font = `${Math.floor(size * 0.6)}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(prof.avatar || prof.name.charAt(0), x, y);
        
        // Selection glow
        if (isSelected) {
          ctx.beginPath();
          ctx.arc(x, y, size + 10, 0, 2 * Math.PI);
          ctx.strokeStyle = 'rgba(59, 130, 246, 0.6)';
          ctx.lineWidth = 6;
          ctx.stroke();
        }

        // Name label for important nodes
        if (isSelected || isSearchResult) {
          ctx.fillStyle = '#1f2937';
          ctx.font = 'bold 12px Inter, sans-serif';
          const firstName = prof.name.split(' ')[1] || prof.name;
          ctx.fillText(firstName, x, y + size + 20);
          
          ctx.fillStyle = '#6b7280';
          ctx.font = '10px Inter, sans-serif';
          ctx.fillText(prof.specialty, x, y + size + 35);
        }
      });
    };

    const getConnectionColor = (type: Connection['type']): string => {
      const colors = {
        'co-author': '#3b82f6',
        'workplace': '#10b981',
        'education': '#8b5cf6',
        'referral': '#f59e0b',
        'mentor': '#ef4444'
      };
      return colors[type] || '#6b7280';
    };

    const getSpecialtyColor = (specialty: string): string => {
      const colors: { [key: string]: string } = {
        'Cardiologist': '#f97316',
        'Neurologist': '#8b5cf6',
        'Pediatrician': '#06b6d4',
        'Surgeon': '#10b981',
        'Radiologist': '#3b82f6',
        'Oncologist': '#ec4899',
        'Psychiatrist': '#84cc16',
        'Orthopedist': '#f59e0b',
        'Dermatologist': '#ef4444',
        'Ophthalmologist': '#6366f1',
        'Endocrinologist': '#14b8a6',
      };
      return colors[specialty] || '#6b7280';
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;

      // Check for node hover
      const hoveredNode = layoutProfessionals.find(prof => {
        const dist = Math.sqrt((x - prof.position.x) ** 2 + (y - prof.position.y) ** 2);
        const size = selectedProfessional.id === prof.id ? 50 : 35;
        return dist <= size + 4;
      });

      if (hoveredNode) {
        setHoverInfo({
          type: 'node',
          data: hoveredNode,
          x: event.clientX,
          y: event.clientY
        });
        canvas.style.cursor = 'pointer';
        return;
      }

      // Check for connection hover
      let hoveredConnection = null;
      for (const prof of layoutProfessionals) {
        for (const connData of prof.connections) {
          const connected = layoutProfessionals.find(p => p.id === connData.id);
          if (connected) {
            const dist = distanceToLine(
              x, y,
              prof.position.x, prof.position.y,
              connected.position.x, connected.position.y
            );
            if (dist < 10) {
              hoveredConnection = { connection: connData, source: prof, target: connected };
              break;
            }
          }
        }
        if (hoveredConnection) break;
      }

      if (hoveredConnection) {
        setHoverInfo({
          type: 'connection',
          data: hoveredConnection,
          x: event.clientX,
          y: event.clientY
        });
        canvas.style.cursor = 'pointer';
      } else {
        setHoverInfo(null);
        canvas.style.cursor = 'default';
      }
    };

    const handleInteraction = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left - rect.width / 2;
      const y = clientY - rect.top - rect.height / 2;

      // Check for node click
      const clicked = layoutProfessionals.find(prof => {
        const dist = Math.sqrt((x - prof.position.x) ** 2 + (y - prof.position.y) ** 2);
        const size = selectedProfessional.id === prof.id ? 50 : 35;
        return dist <= size + 4;
      });

      if (clicked) {
        onNodeClick(clicked);
        return;
      }

      // Check for connection click
      for (const prof of layoutProfessionals) {
        for (const connData of prof.connections) {
          const connected = layoutProfessionals.find(p => p.id === connData.id);
          if (connected) {
            const dist = distanceToLine(
              x, y,
              prof.position.x, prof.position.y,
              connected.position.x, connected.position.y
            );
            if (dist < 10) {
              setSelectedConnection({ connection: connData, source: prof, target: connected });
              return;
            }
          }
        }
      }
    };

    const distanceToLine = (px: number, py: number, x1: number, y1: number, x2: number, y2: number): number => {
      const A = px - x1;
      const B = py - y1;
      const C = x2 - x1;
      const D = y2 - y1;

      const dot = A * C + B * D;
      const lenSq = C * C + D * D;
      let param = -1;
      if (lenSq !== 0) param = dot / lenSq;

      let xx, yy;
      if (param < 0) {
        xx = x1;
        yy = y1;
      } else if (param > 1) {
        xx = x2;
        yy = y2;
      } else {
        xx = x1 + param * C;
        yy = y1 + param * D;
      }

      const dx = px - xx;
      const dy = py - yy;
      return Math.sqrt(dx * dx + dy * dy);
    };

    const handleClick = (event: MouseEvent) => {
      handleInteraction(event.clientX, event.clientY);
    };

    const handleTouchStart = (event: TouchEvent) => {
      event.preventDefault();
      if (event.touches.length === 1) {
        const touch = event.touches[0];
        handleInteraction(touch.clientX, touch.clientY);
      }
    };

    // Desktop events
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('click', handleClick);
    
    // Mobile touch events
    canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
    
    window.addEventListener('resize', resizeCanvas);
    
    setTimeout(resizeCanvas, 10);

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('click', handleClick);
      canvas.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [professionals, selectedProfessional, onNodeClick, searchQuery, searchResults, calculateLayout]);

  return (
    <div className="w-full h-full relative bg-gray-50">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        width={800}
        height={600}
      />
      
      {/* Hover Tooltip - Optimized for Mobile */}
      {hoverInfo && (
        <div 
          className="absolute z-10 bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-xs pointer-events-none"
          style={{ 
            left: Math.min(hoverInfo.x + 10, window.innerWidth - 250), 
            top: Math.max(hoverInfo.y - 10, 50),
            transform: hoverInfo.y > window.innerHeight / 2 ? 'translateY(-100%)' : 'translateY(0)'
          }}
        >
          {hoverInfo.type === 'node' ? (
            <div>
              <h4 className="font-semibold text-gray-900 text-base">{(hoverInfo.data as HealthcareProfessional).name}</h4>
              <p className="text-sm text-gray-600">{(hoverInfo.data as HealthcareProfessional).specialty}</p>
              <p className="text-sm text-gray-500 mt-1">{(hoverInfo.data as HealthcareProfessional).yearsExperience} years experience</p>
              <p className="text-sm text-gray-500">{(hoverInfo.data as HealthcareProfessional).workplaces?.[0]}</p>
              <div className="mt-2 text-xs text-gray-400">Tap to select</div>
            </div>
          ) : (
            <div>
              <h4 className="font-semibold text-gray-900 text-sm">Connection</h4>
              <p className="text-sm text-gray-600">{(hoverInfo.data as any).connection.description}</p>
              <p className="text-sm text-gray-500 mt-1">Strength: {(hoverInfo.data as any).connection.strength}/5</p>
              <div className="mt-1 text-xs text-gray-400">Tap for details</div>
            </div>
          )}
        </div>
      )}

      {/* Connection Details Modal */}
      {selectedConnection && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Connection Details</h3>
              <button 
                onClick={() => setSelectedConnection(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-lg font-bold">
                    {selectedConnection.source.avatar || selectedConnection.source.name.charAt(0)}
                  </div>
                  <p className="text-sm font-medium mt-1">{selectedConnection.source.name}</p>
                </div>
                
                <div className="flex-1 text-center">
                  <div className="text-sm text-gray-500 mb-1">{selectedConnection.connection.type}</div>
                  <div className="h-1 bg-gray-200 rounded">
                    <div 
                      className="h-1 bg-blue-500 rounded" 
                      style={{ width: `${(selectedConnection.connection.strength / 5) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Strength: {selectedConnection.connection.strength}/5
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white text-lg font-bold">
                    {selectedConnection.target.avatar || selectedConnection.target.name.charAt(0)}
                  </div>
                  <p className="text-sm font-medium mt-1">{selectedConnection.target.name}</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                <p className="text-sm text-gray-600">{selectedConnection.connection.description}</p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Details</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {selectedConnection.connection.details.map((detail, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Mobile-Friendly Controls */}
      <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
        <button className="w-12 h-12 md:w-8 md:h-8 bg-white border border-gray-300 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-50 shadow-lg font-bold text-lg md:text-base">
          +
        </button>
        <button className="w-12 h-12 md:w-8 md:h-8 bg-white border border-gray-300 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-50 shadow-lg font-bold text-lg md:text-base">
          −
        </button>
      </div>

      {/* Mobile Toggle for Legend */}
      <div className="absolute top-4 right-4">
        <button 
          onClick={() => setShowLegend(!showLegend)}
          className="lg:hidden w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-50 shadow-lg"
        >
          ?
        </button>
        
        {/* Legend - Always visible on desktop, toggle on mobile */}
        <div className={`${showLegend ? 'block' : 'hidden lg:block'} lg:relative absolute top-12 right-0 lg:top-0 lg:right-0 bg-white border border-gray-200 rounded-lg p-3 text-xs shadow-lg lg:shadow-none z-10`}>
          <div className="flex items-center justify-between mb-2 lg:mb-2">
            <h4 className="font-semibold text-gray-900">Connection Types</h4>
            <button 
              onClick={() => setShowLegend(false)}
              className="lg:hidden text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-0.5 bg-blue-500"></div>
              <span>Co-author</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-0.5 bg-green-500"></div>
              <span>Workplace</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-0.5 bg-purple-500"></div>
              <span>Education</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-0.5 bg-yellow-500"></div>
              <span>Referral</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-0.5 bg-red-500"></div>
              <span>Mentor</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedNetworkGraph;