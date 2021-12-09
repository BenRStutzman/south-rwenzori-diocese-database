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
}: Props) => {
    const startingResultNumber = results.pageSize * results.pageNumber + 1;
    const endingResultNumber = Math.min(results.totalResults, results.pageSize * (results.pageNumber + 1));

    return <div className="paging">
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
                startingResultNumber <= endingResultNumber &&
                <span>Showing results {startingResultNumber}&ndash;{endingResultNumber} of {results.totalResults}</span>
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
}

export default Paging;