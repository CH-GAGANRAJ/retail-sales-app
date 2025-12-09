import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import SortingControls from './components/SortingControls';
import SalesTable from './components/SalesTable';
import Pagination from './components/Pagination';
import { fetchSalesData, fetchFilterOptions } from './services/api';
import './styles/App.css';

function App() {
  const [salesData, setSalesData] = useState([]);
  const [filterOptions, setFilterOptions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  // Calculate totals from data
  const totalUnits = salesData.reduce((acc, item) => acc + (parseInt(item.quantity) || 0), 0);
  const totalAmount = salesData.reduce((acc, item) => acc + (parseFloat(item.totalAmount) || 0), 0);

  const [filters, setFilters] = useState({
    customerRegion: [],
    gender: [],
    productCategory: [],
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    loadFilterOptions();
  }, []);

  useEffect(() => {
    loadSalesData();
  }, [searchTerm, currentPage, sortBy, sortOrder, filters]);

  const loadFilterOptions = async () => {
    try {
      const options = await fetchFilterOptions();
      setFilterOptions(options);
    } catch (err) {
      console.error(err);
    }
  };

  const loadSalesData = async () => {
    setLoading(true);
    try {
      const response = await fetchSalesData({
        search: searchTerm,
        page: currentPage,
        sortBy,
        sortOrder,
        ...filters
      });
      setSalesData(response.data);
      setTotalPages(response.pagination.totalPages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Sales Management System</h1>
        <div style={{ width: '300px' }}>
          <SearchBar onSearch={setSearchTerm} searchTerm={searchTerm} />
        </div>
      </header>

      <div className="app-container">
        <Sidebar />

        <main className="main-content">
          {filterOptions && (
            <div style={{display: 'flex', justifyContent:'space-between', alignItems:'center', marginBottom: '1rem'}}>
              <FilterPanel
                filterOptions={filterOptions}
                filters={filters}
                onFilterChange={setFilters}
              />
              <SortingControls 
                 sortBy={sortBy} 
                 sortOrder={sortOrder}
                 onSortChange={(field, order) => { setSortBy(field); setSortOrder(order); }} 
              />
            </div>
          )}

          <div className="summary-cards">
            <div className="summary-card">
              <div className="card-title">Total units sold ⓘ</div>
              <div className="card-value">{totalUnits}</div>
            </div>
            <div className="summary-card">
              <div className="card-title">Total Amount ⓘ</div>
              <div className="card-value">₹{totalAmount.toLocaleString()}</div>
            </div>
            <div className="summary-card">
              <div className="card-title">Total Discount ⓘ</div>
              <div className="card-value">₹15,000</div>
            </div>
          </div>

          {loading ? (
            <div className="loading">Loading...</div>
          ) : (
            <>
              <SalesTable data={salesData} />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;