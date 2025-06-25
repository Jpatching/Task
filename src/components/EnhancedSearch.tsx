import React, { useState, useEffect, useMemo } from 'react';
import { HealthcareProfessional } from '../types';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface EnhancedSearchProps {
  professionals: HealthcareProfessional[];
  onSearch: (query: string, results: HealthcareProfessional[]) => void;
  onSelectProfessional: (professional: HealthcareProfessional) => void;
}

const EnhancedSearch: React.FC<EnhancedSearchProps> = ({
  professionals,
  onSearch,
  onSelectProfessional,
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  // Advanced search with multiple criteria
  const searchResults = useMemo(() => {
    if (!query.trim()) return [];

    const searchTerm = query.toLowerCase();
    
    return professionals.filter(prof => {
      const nameMatch = prof.name.toLowerCase().includes(searchTerm);
      const specialtyMatch = prof.specialty.toLowerCase().includes(searchTerm);
      const workplaceMatch = prof.workplaces?.some(wp => 
        wp.toLowerCase().includes(searchTerm)
      );
      const educationMatch = prof.education.toLowerCase().includes(searchTerm);
      const researchMatch = prof.researchAreas?.some(area =>
        area.toLowerCase().includes(searchTerm)
      );
      
      return nameMatch || specialtyMatch || workplaceMatch || educationMatch || researchMatch;
    }).slice(0, 8); // Limit results
  }, [professionals, query]);

  useEffect(() => {
    onSearch(query, searchResults);
  }, [query, searchResults, onSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setIsOpen(value.length > 0);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || searchResults.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < searchResults.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < searchResults.length) {
          handleSelectProfessional(searchResults[selectedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleSelectProfessional = (professional: HealthcareProfessional) => {
    onSelectProfessional(professional);
    setQuery(professional.name);
    setIsOpen(false);
    setSelectedIndex(-1);
  };

  const clearSearch = () => {
    setQuery('');
    setIsOpen(false);
    setSelectedIndex(-1);
    onSearch('', []);
  };

  const highlightMatch = (text: string, searchTerm: string) => {
    if (!searchTerm) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="bg-yellow-200 font-medium">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="relative">
      <div className="relative">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search healthcare professionals..."
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => query && setIsOpen(true)}
          className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && searchResults.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto">
          <div className="p-2">
            <div className="text-xs text-gray-500 mb-2">
              {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found
            </div>
            
            {searchResults.map((professional, index) => (
              <div
                key={professional.id}
                onClick={() => handleSelectProfessional(professional)}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  index === selectedIndex 
                    ? 'bg-blue-50 border border-blue-200' 
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                    {professional.avatar || professional.name.charAt(0)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900 text-sm">
                      {highlightMatch(professional.name, query)}
                    </div>
                    
                    <div className="text-sm text-gray-600">
                      {highlightMatch(professional.specialty, query)}
                    </div>
                    
                    {professional.workplaces && professional.workplaces.length > 0 && (
                      <div className="text-xs text-gray-500 mt-1">
                        {highlightMatch(professional.workplaces[0], query)}
                      </div>
                    )}
                    
                    <div className="flex items-center space-x-3 mt-2 text-xs text-gray-500">
                      <span>{professional.yearsExperience} years exp.</span>
                      <span>•</span>
                      <span>{professional.patientsServed} patients</span>
                      <span>•</span>
                      <span>{professional.successRate}% success rate</span>
                    </div>

                    {/* Research areas that match */}
                    {professional.researchAreas && professional.researchAreas.some(area => 
                      area.toLowerCase().includes(query.toLowerCase())
                    ) && (
                      <div className="mt-1">
                        <div className="text-xs text-gray-500">Research:</div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {professional.researchAreas
                            .filter(area => area.toLowerCase().includes(query.toLowerCase()))
                            .slice(0, 2)
                            .map((area, idx) => (
                              <span 
                                key={idx}
                                className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded"
                              >
                                {highlightMatch(area, query)}
                              </span>
                            ))
                          }
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="text-right">
                    <div className="text-xs text-gray-500">
                      {professional.connections.length} connections
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {isOpen && query && searchResults.length === 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-4">
          <div className="text-center text-gray-500">
            <MagnifyingGlassIcon className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p className="text-sm">No healthcare professionals found for "{query}"</p>
            <p className="text-xs mt-1">Try searching by name, specialty, workplace, or research area</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedSearch;