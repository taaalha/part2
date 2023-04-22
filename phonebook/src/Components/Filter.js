import React from 'react';

const Filter = ({ searchName, handleSearch }) => {
  return (
    <div>
      Filter shown with a <input value={searchName} onChange={handleSearch} />
    </div>
  );
};

export default Filter;
