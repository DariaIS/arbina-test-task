import React, { useState } from 'react';

import { useTable } from './hooks/index';

import s from './index.module.scss';

export const NewTable: React.FC = () => {
    const [page, setPage] = useState(1);
    const {
        table,
        slice,
        range,
        handleChangeInput
    } = useTable({ page, rowsPerPage: 3 });

    return (
        <>
            {table.length !== 0 &&
                <>
                    <table className={s.table}>
                        <thead>
                            <tr className={`${s.tr} ${s.header}`}>
                                {Object.keys(table[0]).map((elem, index) =>
                                    <th key={index} className={s.th}>
                                        {elem}
                                        <input type={table[0][elem] instanceof Date ? 'date' : 'text'} placeholder='Search...' name={elem} onChange={(e) => handleChangeInput(e)} />
                                    </th>
                                )}
                            </tr>
                        </thead>
                        {slice.length !== 0 ?
                            <tbody>
                                {slice.map((obj, index) => (
                                    <tr key={index} className={`${s.tr} ${s.row}`}>
                                        {(Object.keys(slice[0]) as (keyof typeof obj)[]).map((elem, i) => (
                                            elem in obj && <td key={i} className={s.td}>{obj[elem].toString()}</td>
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
                    <div className={s.pagination}>
                        <button className={`${s.paginationButton} ${page === 1 ? s.active : s.inactive}`}
                            onClick={() => setPage(1)}
                            disabled={page === 1}
                        >
                            {1}
                        </button>
                        <button className={s.paginationButton}
                            onClick={() => setPage(prev => prev - 1)}
                            disabled={page === 1}
                        >
                            {'<'}
                        </button>
                        <button className={s.paginationButton}
                            onClick={() => setPage(prev => prev + 1)}
                            disabled={page === range}
                        >
                            {'>'}
                        </button>
                        <button className={`${s.paginationButton} ${page === range ? s.active : s.inactive}`}
                            onClick={() => setPage(range)}
                            disabled={page === range}
                        >
                            {range}
                        </button>
                        {console.log(range)}
                    </div>
                </>
            }
        </>
    );
};
