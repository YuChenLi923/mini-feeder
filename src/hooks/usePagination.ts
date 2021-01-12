import {useState, useCallback } from 'react';
const usePagination = function (initPage = 1, callback: Function): {
  page: number;
  onPageChange(page: number): void;
} {
  const [page, setPage] = useState(initPage);
  const onPageChange = useCallback((page) => {
    setPage(page);
    callback(page);
  }, [callback]);
  return {
    page,
    onPageChange
  };
};

export default usePagination;
