import { Dispatch, SetStateAction } from "react";

interface Props {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  indexOfLastPlayer: number;
  itemsLength: number;
}

const Pagination = ({
  currentPage,
  setCurrentPage,
  indexOfLastPlayer,
  itemsLength,
}: Props) => {
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  return (
    <div className="pagination flex justify-center gap-5 py-2">
      <button
        className="btn btn-primary"
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      <button
        className="btn btn-primary"
        onClick={() => paginate(currentPage + 1)}
        disabled={indexOfLastPlayer >= itemsLength}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
