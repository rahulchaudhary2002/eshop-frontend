import React, { useState, useEffect } from 'react';

const Pagination = ({ total, current, length, size = 2, setPage }) => {
    const [currentPage, setCurrentPage] = useState(current);

    useEffect(() => {
        setCurrentPage(current);
    }, [current]);

    const getPages = () => {
        let start = currentPage - size;
        let end = currentPage + size;

        if (currentPage >= Math.ceil(total / length) - size) {
            start -= currentPage - Math.ceil(total / length) + size;
        }

        if (currentPage <= size) {
            end += size - currentPage + 1;
        }

        start = Math.max(1, start);
        end = Math.min(Math.ceil(total / length), end);

        return { start, end };
    };

    const handlePageChange = (page) => {
        if (page !== currentPage && page >= 1 && page <= Math.ceil(total / length)) {
            setCurrentPage(page);
            setPage(page);
        }
    };

    const renderPagination = () => {
        const pages = getPages();
        const paginationItems = [];

        paginationItems.push(
            <li key="prev" className={currentPage <= 1 ? 'disabled' : ''}>
                <a href="/" onClick={(e) => { e.preventDefault(); handlePageChange(currentPage - 1) }}><span className='fa fa-angle-left'></span></a>
            </li>
        );

        if (pages.start > 1) {
            paginationItems.push(
                <li key="first">
                    <a href="/" onClick={(e) => { e.preventDefault(); handlePageChange(1) }}>1</a>
                </li>
            );
            paginationItems.push(<li key="ellipsis-1"><span>...</span></li>);
        }

        for (let i = pages.start; i <= pages.end; i++) {
            paginationItems.push(
                <li key={i} className={currentPage === i ? 'active' : ''}>
                    <a href="/" onClick={(e) => { e.preventDefault(); handlePageChange(i) }}>{i}</a>
                </li>
            );
        }

        if (pages.end < Math.ceil(total / length)) {
            paginationItems.push(<li key="ellipsis-2"><span>...</span></li>);
            paginationItems.push(
                <li key="last">
                    <a href="/" onClick={(e) => { e.preventDefault(); handlePageChange(Math.ceil(total / length)) }}>
                        {Math.ceil(total / length)}
                    </a>
                </li>
            );
        }

        paginationItems.push(
            <li key="next" className={currentPage >= Math.ceil(total / length) ? 'disabled' : ''}>
                <a href="/" onClick={(e) => { e.preventDefault(); handlePageChange(currentPage + 1) }}><span className='fa fa-angle-right'></span></a>
            </li>
        );

        return paginationItems;
    };

    return (
        <>
            <ul className="pagination float-end">
                {renderPagination()}
            </ul>
        </>
    );
};

export default Pagination;
