import '../styles/Pagination.css';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const getPageNumbers = () => {
    const pages = [];
    const showPages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(showPages / 2));
    let endPage = Math.min(totalPages, startPage + showPages - 1);
    
    if (endPage - startPage < showPages - 1) {
      startPage = Math.max(1, endPage - showPages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  return (
    <div className="pagination">
      <button
        type="button"                                   // 👈 add this
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="pagination-btn"
      >
        Previous
      </button>

      <div className="page-numbers">
        {currentPage > 3 && (
          <>
            <button
              type="button"                             // 👈 add this
              onClick={() => onPageChange(1)}
              className="page-btn"
            >
              1
            </button>
            {currentPage > 4 && <span className="ellipsis">...</span>}
          </>
        )}

        {getPageNumbers().map((page) => (
          <button
            key={page}
            type="button"                               // 👈 and here
            onClick={() => onPageChange(page)}
            className={`page-btn ${page === currentPage ? 'active' : ''}`}
          >
            {page}
          </button>
        ))}

        {currentPage < totalPages - 2 && (
          <>
            {currentPage < totalPages - 3 && <span className="ellipsis">...</span>}
            <button
              type="button"                             // 👈 and here
              onClick={() => onPageChange(totalPages)}
              className="page-btn"
            >
              {totalPages}
            </button>
          </>
        )}
      </div>

      <button
        type="button"                                   // 👈 and here
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="pagination-btn"
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
