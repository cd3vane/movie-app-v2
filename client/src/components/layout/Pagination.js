import React from 'react';

const Pagination = ({ paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i < 500; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className='container mt-5'>
      <nav>
        <ul className='pagination'>
          {pageNumbers.map((number) => {
            return (
              <li className='page-item' key={number}>
                <a
                  href='!#'
                  onClick={(e) => {
                    paginate(number);
                    e.preventDefault();
                  }}
                  className='page-link'
                >
                  {number}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
