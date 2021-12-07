import React from "react";
import { PagedResults } from "../../store/archdeaconry/home";

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
        <div>
            {
                results.pageNumber > 0 &&
                <button className="btn btn-secondary" onClick={previousPage}>Previous page</button>
            }
        </div>
        <div>
            <span>Showing results {results.pageSize * results.pageNumber + 1} to {Math.min(results.totalResults, results.pageSize * (results.pageNumber + 1))} of {results.totalResults}</span>
        </div>
        <div>
            {
                results.pageNumber < Math.ceil(results.totalResults / results.pageSize) - 1 &&
                <button className="btn btn-secondary" onClick={nextPage}>Next page</button>
            }
        </div>
    </div>;

export default Paging;