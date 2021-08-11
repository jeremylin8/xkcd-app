import React from 'react';
import { Link } from 'react-router-dom';

const PaginationBtn = ({ num, curNum }) => {
  return (
    <Link
      to={`/${num}`}
      className={`pagination-btn ${num === curNum ? 'current-num' : ''}`}
      aria-label={`${
        num === curNum ? `Current Comic Page, # ${num} ` : `Goto Comic # ${num}`
      }`}
    >
      <span className='comic__pagination-num'>{num}</span>
    </Link>
  );
};

export default PaginationBtn;
