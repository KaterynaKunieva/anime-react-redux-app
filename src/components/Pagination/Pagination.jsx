import PaginationMUI from '@mui/material/Pagination';
import React from 'react';
import { createUseStyles } from 'react-jss';
import useTheme from 'misc/hooks/useTheme';

const getClasses = createUseStyles(theme => ({
    paginationWrapper: {
        margin: "0 auto",
    }
}));

function Pagination({ totalPages, page, onPageChange, className = "" }) {
    const { theme } = useTheme();
    const classes = getClasses({ theme });

    return (
        totalPages > 0
            ? <div className={`${classes.paginationWrapper}${className ? " " + className : ""}`}>
                <PaginationMUI
                    count={totalPages}
                    page={page + 1}
                    onChange={(_, value) => onPageChange(value - 1)}
                    showFirstButton
                    showLastButton
                />
            </div>
            : null
    );
}

export default Pagination;
