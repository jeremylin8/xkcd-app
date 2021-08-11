import React, { useState } from 'react';
import PaginationBtn from './PaginationBtn';

const calPaginationList = (pageNum, latestNum) => {
  switch (true) {
    case pageNum === 1:
    case pageNum === 2:
    case pageNum === 3:
      return [1, 2, 3, 4, 5, 6, 7];
    case pageNum === latestNum:
    case pageNum === latestNum - 1:
    case pageNum === latestNum - 2:
      return [
        latestNum - 6,
        latestNum - 5,
        latestNum - 4,
        latestNum - 3,
        latestNum - 2,
        latestNum - 1,
        latestNum,
      ];
    case pageNum - 3 >= 1 && pageNum + 3 <= latestNum:
      return [
        pageNum - 3,
        pageNum - 2,
        pageNum - 1,
        pageNum,
        pageNum + 1,
        pageNum + 2,
        pageNum + 3,
      ];

    default:
      console.log('error');
  }
};

const Pagination = ({ pageNum, latestNum }) => {
  const [paginationList] = useState(calPaginationList(pageNum, latestNum));

  return (
    <nav
      aria-label='Pagination Navigation'
      className='comic__pagination u-margin-bottom-medium'
    >
      {paginationList.map((num) => (
        <PaginationBtn num={num} key={num} curNum={pageNum} />
      ))}
    </nav>
  );
};

export default Pagination;
