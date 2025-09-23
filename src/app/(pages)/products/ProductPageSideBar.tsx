"use client";
import { useState } from 'react';

const ProductPageSideBar = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [selectedFilters, setSelectedFilters] = useState({
    materials: [] as string[],
    sizes: [] as string[],
    prices: [] as string[],
  });

  // Fake data
  const filterOptions = {
    materials: [
      { id: 'fabric', name: 'Fabric', count: 124 },
      { id: 'wood', name: 'Wood', count: 87 },
      { id: 'steel', name: 'Steel', count: 64 },
      { id: 'cotton', name: 'Cotton', count: 92 },
      { id: 'garjon-board', name: 'Garjon Board', count: 43 },
      { id: 'transparent-glass', name: 'Transparent Glass', count: 56 },
      { id: 'textured-glass', name: 'Vertical Textured Glass', count: 38 },
      { id: 'golden-metal', name: 'Golden color Metal', count: 29 },
      { id: 'metal', name: 'Metal', count: 76 }
    ],
    sizes: [
      { id: 'smaller-60', name: 'Smaller than 60°', count: 45 },
      { id: '60-69', name: '60° - 69°', count: 78 },
      { id: '70-79', name: '70° - 79°', count: 112 },
      { id: '80-89', name: '80° - 89°', count: 95 },
      { id: '90-99', name: '90° - 99°', count: 63 }
    ],
    prices: [
      { id: 'below-1000', name: 'Below 1000TK', count: 156 },
      { id: '1000-4999', name: '1000TK to 4999TK', count: 234 },
      { id: '5000-9999', name: '5000TK to 9999TK', count: 187 },
      { id: '10000-19999', name: '10000TK to 19999TK', count: 142 },
      { id: '20000-29999', name: '20000TK to 29999 TK', count: 89 },
      { id: '30000-above', name: '30000TK and Above', count: 67 }
    ]
  };

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleFilterChange = (category: keyof typeof selectedFilters, value: string) => {
    setSelectedFilters(prev => {
      const currentFilters = [...prev[category]];
      const index = currentFilters.indexOf(value);
      
      if (index > -1) {
        currentFilters.splice(index, 1);
      } else {
        currentFilters.push(value);
      }
      
      return {
        ...prev,
        [category]: currentFilters
      };
    });
  };

  const clearAllFilters = () => {
    setSelectedFilters({
      materials: [],
      sizes: [],
      prices: []
    });
  };

  return (
    <div className="w-64 bg-white p-4 h-screen overflow-y-auto sticky top-0 border-r text-black">
      <div className="flex justify-between items-center mb-4 border-b pb-2">
        <h2 className="text-xl font-bold">Catalogue</h2>
        <button 
          onClick={clearAllFilters}
          className="text-black text-sm font-medium hover:text-gray-700"
        >
          Clear all
        </button>
      </div>
      
      {/* Materials Section */}
      <div className="mb-4">
        <div 
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection('materials')}
        >
          <h3 className="text-md font-semibold">Materials</h3>
          <svg 
            className={`w-4 h-4 transform transition-transform ${openSection === 'materials' ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        
        <div className={`overflow-hidden transition-all duration-300 ${openSection === 'materials' ? 'max-h-96' : 'max-h-0'}`}>
          <div className="pt-2 space-y-1">
            {filterOptions.materials.map((material) => (
              <div key={material.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id={material.id}
                    checked={selectedFilters.materials.includes(material.name)}
                    onChange={() => handleFilterChange('materials', material.name)}
                    className="h-3 w-3 text-black rounded focus:ring-black"
                  />
                  <label htmlFor={material.id} className="ml-2 text-sm cursor-pointer">
                    {material.name}
                  </label>
                </div>
                <span className="text-xs text-gray-500">({material.count})</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-300 my-3"></div>
      
      {/* Sizes Section */}
      <div className="mb-4">
        <div 
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection('sizes')}
        >
          <h3 className="text-md font-semibold">Sizes</h3>
          <svg 
            className={`w-4 h-4 transform transition-transform ${openSection === 'sizes' ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        
        <div className={`overflow-hidden transition-all duration-300 ${openSection === 'sizes' ? 'max-h-96' : 'max-h-0'}`}>
          <div className="pt-2 space-y-1">
            {filterOptions.sizes.map((size) => (
              <div key={size.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id={size.id}
                    checked={selectedFilters.sizes.includes(size.name)}
                    onChange={() => handleFilterChange('sizes', size.name)}
                    className="h-3 w-3 text-black rounded focus:ring-black"
                  />
                  <label htmlFor={size.id} className="ml-2 text-sm cursor-pointer">
                    {size.name}
                  </label>
                </div>
                <span className="text-xs text-gray-500">({size.count})</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-300 my-3"></div>
      
      {/* Price Range Section */}
      <div className="mb-4">
        <div 
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection('prices')}
        >
          <h3 className="text-md font-semibold">Price Range</h3>
          <svg 
            className={`w-4 h-4 transform transition-transform ${openSection === 'prices' ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        
        <div className={`overflow-hidden transition-all duration-300 ${openSection === 'prices' ? 'max-h-96' : 'max-h-0'}`}>
          <div className="pt-2 space-y-1">
            {filterOptions.prices.map((price) => (
              <div key={price.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id={price.id}
                    checked={selectedFilters.prices.includes(price.name)}
                    onChange={() => handleFilterChange('prices', price.name)}
                    className="h-3 w-3 text-black rounded focus:ring-black"
                  />
                  <label htmlFor={price.id} className="ml-2 text-sm cursor-pointer">
                    {price.name}
                  </label>
                </div>
                <span className="text-xs text-gray-500">({price.count})</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-300 my-3"></div>
      
      {/* Copy Filter Button */}
      <button className="w-full bg-black text-white py-1.5 px-4 rounded text-sm font-medium hover:bg-gray-800 transition-colors">
        Copy Filter
      </button>
    </div>
  );
};

export default ProductPageSideBar;