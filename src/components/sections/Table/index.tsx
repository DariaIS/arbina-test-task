import React, { useState } from 'react';

import { Input } from "../../UIElements/Input";
import { Button } from "../../UIElements/Button";

import { useTable } from './hooks/index';

import styles from './index.module.scss';

export const Table: React.FC = () => {
    const [page, setPage] = useState(1);
    const {
        table,
        slice,
        range,
        rowsPerPage,
        minRows,
        maxRows,
        handleChangeSearch,
        handleChangeRowsNum,
        handleClickRemove
    } = useTable({ page });

    return (
        <div className='pageContainer section'>
            {table.length !== 0 &&
                <>
                    <div className={styles.inputSec}>
                        <label className={styles.label}>Rows per page -</label>
                        <Input type='number'
                            min={minRows} max={maxRows}
                            value={rowsPerPage}
                            onChange={(e) => handleChangeRowsNum(e)}
                        />
                    </div>
                    <table className={styles.table}>
                        <thead>
                            <tr className={`${styles.tr} ${styles.header}`}>
                                {(Object.keys(table[0]) as (keyof typeof table[0])[]).map((elem, index) =>
                                    <th key={index} className={styles.th}>
                                        {elem}
                                        <Input type={typeof table[0][elem] === 'number' ? 'date' : 'text'}
                                            placeholder='Search...'
                                            name={elem} onChange={(e) => handleChangeSearch(e)}
                                        />
                                    </th>
                                )}
                            </tr>
                        </thead>
                        {slice.length !== 0 ?
                            <tbody>
                                {slice.map((obj, index) => (
                                    <tr key={index} className={`${styles.tr} ${styles.row}`}>
                                        {(Object.keys(obj) as (keyof typeof obj)[]).map((elem, i) => (
                                            elem in obj &&
                                            <td key={i} className={styles.td}>
                                                {typeof obj[elem] === 'number' ? new Date(obj[elem]).toDateString() : obj[elem]}
                                                {i === 0 &&
                                                    <div className={styles.remove} onClick={() => handleClickRemove(obj)}>Remove</div>
                                                }
                                            </td>
                                        ))}
                                    </tr>
                                ))
                                }
                            </tbody> :
                            <tbody>
                                <tr><td>No rows found</td></tr>
                            </tbody>
                        }
                    </table>
                    <div className={styles.pagination}>
                        <Button
                            className={styles.paginationButton}
                            isDisabled={page === 1}
                            onClick={() => setPage(1)}
                        >
                            {1}
                        </Button>
                        <Button
                            className={styles.paginationButton}
                            isDisabled={page === 1}
                            onClick={() => setPage(prev => prev - 1)}
                        >
                            {'<'}
                        </Button>
                        <Button
                            className={styles.paginationButton}
                            isDisabled={page === range || range === 0}
                            onClick={() => setPage(prev => prev + 1)}
                        >
                            {'>'}
                        </Button>
                        <Button
                            className={styles.paginationButton}
                            isDisabled={page === range || range === 0}
                            onClick={() => setPage(range)}
                        >
                            {range}
                        </Button>
                    </div>
                </>
            }
        </div>
    );
};
