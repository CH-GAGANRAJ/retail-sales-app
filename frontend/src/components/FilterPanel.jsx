import { useState } from 'react';
import '../styles/FilterPanel.css';

function FilterPanel({ filterOptions, filters, onFilterChange }) {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (key) => {
    setActiveDropdown(activeDropdown === key ? null : key);
  };

  const handleMultiSelectChange = (filterKey, value) => {
    const current = filters[filterKey] || [];
    const updated = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
    
    onFilterChange({ ...filters, [filterKey]: updated });
  };

  // Helper for Age Range inputs
  const handleAgeChange = (field, value) => {
     onFilterChange({ ...filters, [field]: value });
  };

  return (
    <div className="filter-row">
      {/* 1. Customer Region */}
      <div className="filter-group">
        <button className="filter-trigger" onClick={() => toggleDropdown('region')}>
          Customer Region <span>▼</span>
        </button>
        {activeDropdown === 'region' && (
          <div className="dropdown-content">
            {filterOptions.customerRegions.map(region => (
              <label key={region} className="dropdown-item">
                <input
                  type="checkbox"
                  checked={filters.customerRegion.includes(region)}
                  onChange={() => handleMultiSelectChange('customerRegion', region)}
                />
                {region}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* 2. Gender */}
      <div className="filter-group">
        <button className="filter-trigger" onClick={() => toggleDropdown('gender')}>
          Gender <span>▼</span>
        </button>
        {activeDropdown === 'gender' && (
          <div className="dropdown-content">
            {filterOptions.genders.map(gender => (
              <label key={gender} className="dropdown-item">
                <input
                  type="checkbox"
                  checked={filters.gender.includes(gender)}
                  onChange={() => handleMultiSelectChange('gender', gender)}
                />
                {gender}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* 3. Age Range (MISSING IN YOUR SCREENSHOT) */}
      <div className="filter-group">
        <button className="filter-trigger" onClick={() => toggleDropdown('age')}>
          Age Range <span>▼</span>
        </button>
        {activeDropdown === 'age' && (
          <div className="dropdown-content" style={{padding: '10px', width: '200px'}}>
             <div style={{display:'flex', alignItems:'center', gap:'5px'}}>
                <input 
                  type="number" 
                  placeholder="Min"
                  className="age-input"
                  style={{width: '60px', padding: '5px', border: '1px solid #ddd'}}
                  onChange={(e) => handleAgeChange('minAge', e.target.value)}
                />
                <span>-</span>
                <input 
                  type="number" 
                  placeholder="Max" 
                  className="age-input"
                  style={{width: '60px', padding: '5px', border: '1px solid #ddd'}}
                  onChange={(e) => handleAgeChange('maxAge', e.target.value)}
                />
             </div>
          </div>
        )}
      </div>

      {/* 4. Product Category */}
      <div className="filter-group">
        <button className="filter-trigger" onClick={() => toggleDropdown('category')}>
          Product Category <span>▼</span>
        </button>
        {activeDropdown === 'category' && (
          <div className="dropdown-content">
            {filterOptions.productCategories.map(cat => (
              <label key={cat} className="dropdown-item">
                <input
                  type="checkbox"
                  checked={filters.productCategory.includes(cat)}
                  onChange={() => handleMultiSelectChange('productCategory', cat)}
                />
                {cat}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* 5. Tags (MISSING IN YOUR SCREENSHOT) */}
      <div className="filter-group">
        <button className="filter-trigger" onClick={() => toggleDropdown('tags')}>
          Tags <span>▼</span>
        </button>
        {activeDropdown === 'tags' && (
          <div className="dropdown-content">
            {(filterOptions.tags || []).map(tag => (
              <label key={tag} className="dropdown-item">
                <input
                  type="checkbox"
                  checked={(filters.tags || []).includes(tag)}
                  onChange={() => handleMultiSelectChange('tags', tag)}
                />
                {tag}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* 6. Payment Method (MISSING IN YOUR SCREENSHOT) */}
      <div className="filter-group">
        <button className="filter-trigger" onClick={() => toggleDropdown('payment')}>
          Payment <span>▼</span>
        </button>
        {activeDropdown === 'payment' && (
          <div className="dropdown-content">
            {(filterOptions.paymentMethods || []).map(method => (
              <label key={method} className="dropdown-item">
                <input
                  type="checkbox"
                  checked={(filters.paymentMethod || []).includes(method)}
                  onChange={() => handleMultiSelectChange('paymentMethod', method)}
                />
                {method}
              </label>
            ))}
          </div>
        )}
      </div>
      
       {/* 7. Date */}
       <div className="filter-group">
        <button className="filter-trigger" onClick={() => toggleDropdown('date')}>
           Date <span>▼</span>
        </button>
        {activeDropdown === 'date' && (
          <div className="dropdown-content" style={{padding: '10px'}}>
            <input 
              type="date" 
              style={{padding: '5px', border: '1px solid #ddd', borderRadius: '4px'}}
              onChange={(e) => onFilterChange({...filters, startDate: e.target.value})} 
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default FilterPanel;