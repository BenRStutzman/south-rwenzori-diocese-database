import React from "react";
import { PagedResults } from "../../models/shared";

interface Props {
    results: PagedResults;
    nextPage: () => void;
    previousPage: () => void;
}

const Paging = ({
    results,
    nextPage,
    previousPage,
}: Props) =>
    <div className="paging">
        <div className="paging-button-container">
            {
                results.pageNumber > 0 &&
                <button className="btn btn-link shadow-none" onClick={previousPage}>
                    <i className="bi bi-arrow-left"></i>
                </button>
            }
        </div>
        <div>
            {
                results.pageSize < results.totalResults &&
                <span>Showing results {results.pageSize * results.pageNumber + 1} to {Math.min(results.totalResults, results.pageSize * (results.pageNumber + 1))} of {results.totalResults}</span>
            }
        </div>
        <div className="paging-button-container">
            {
                results.pageNumber < Math.ceil(results.totalResults / results.pageSize) - 1 &&
                <button className="btn btn-link shadow-none" onClick={nextPage}>
                    <i className="bi bi-arrow-right"></i>
                </button>
            }
        </div>
    </div>;

export default Paging;