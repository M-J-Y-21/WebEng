import { ChangeEvent } from 'react';

interface PaginationProps {
  setSkip: React.Dispatch<React.SetStateAction<number>>;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  limit: number;
  skip: number;
}
/**
 * The pagination function which deals with the pagination in RetrieveTopArtists. 
 * @param param0 Pagination parameters 
 * @returns a but for pagination
 */
function Pagination({ setSkip, setLimit, limit, skip }: PaginationProps) {
  /**
   * Handle the next button
   */
  function handleNext(): void {
    setSkip((currentSkip) => currentSkip + limit);
  }

  /**
   * handles the previous button
   */
  function handlePrevious(): void {
    setSkip((currentSkip) => currentSkip - limit);
  }

  /**
   * Handles the results per page select
   *
   * @param event the change event coming from the select
   */
  function handleResultsChange(event: ChangeEvent<HTMLSelectElement>): void {
    const newValue = parseInt(event.target.value);
    setLimit(newValue);
    setSkip((currentSkip) => Math.floor(currentSkip / newValue) * newValue);
  }

  return (
    // the <> </> is a fragment, it is used to wrap multiple elements without adding a div to the DOM
    <>
      <button disabled={skip <= 0} type="button" onClick={handlePrevious}>
        Previous
      </button>
      <button type="button" onClick={handleNext}>
        Next
      </button>

      <label htmlFor="results">Results Per Page</label>
      <select id="results" name="results" onChange={handleResultsChange}>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </>
  );
}

export { Pagination };
