import { useState, useEffect, useMemo, ChangeEventHandler } from 'react';
import { useSelector } from "react-redux";

import { RootState } from "@redux/reducers";

import { tableType } from "@types";

type Props = {
    page: number;
};

export const useTable = (props: Props) => {
    const [range, setRange] = useState(0);
    const [slice, setSlice] = useState<tableType[]>([]);
    const [rowsPerPage, setRowsPerPage] = useState('3');
    const [search, setSearch] = useState({
        username: '',
        action: '',
        action_created_at: new Date(0),
    });

    const [minRows, maxRows] = ['3', '15']

    const table = useSelector((state: RootState) => state.table.table);

    const handleChangeSearch: ChangeEventHandler<HTMLInputElement> = (e) => {
        setSearch(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleChangeRowsNum: ChangeEventHandler<HTMLInputElement> = (e) => {
        console.log('get it', e.target.value)
        const [value, min, max] = [
            e.target.value,
            e.target.min,
            e.target.max
        ];
        const newVal =
            (parseInt(value, 10) < parseInt(min, 10)) && (value !== '') ?
                min :
                parseInt(value, 10) > parseInt(max, 10) ?
                    max :
                    value;
        setRowsPerPage(newVal);
    };

    const searchRows = (data: tableType[], searchObj: {
        username: string,
        action: string,
        action_created_at: Date
    }) => {
        // console.log('search')
        return data.filter(item => {
            const ifInclude = Object.keys(searchObj).every(key => {
                if (item[key] instanceof Date) {
                    const searchDate = new Date(searchObj[key]);
                    if (searchDate.toDateString() === item[key].toDateString() || searchDate.getTime() === 0)
                        return true;
                } else if (item[key].includes(searchObj[key])) {
                    return true;
                }
                return false;
            })
            return ifInclude;
        });
    };

    const calculateRange = (data: tableType[], rowsPerPage: string): number => {
        // console.log('calculateRange')
        return Math.ceil(data.length / parseInt(rowsPerPage, 10));
    };

    const sliceData = (data: tableType[], page: number, rowsPerPage: string) => {
        console.log('sliceData', rowsPerPage)
        return data.slice((page - 1) * parseInt(rowsPerPage, 10), page * parseInt(rowsPerPage, 10));
    };

    let searchTable: tableType[] = useMemo(() => searchRows(table, search), [search, table]);

    useEffect(() => {
        const range = calculateRange(searchTable, rowsPerPage !== '' ? rowsPerPage : minRows);
        setRange(range);

        const tempItems = sliceData(searchTable, props.page, rowsPerPage !== '' ? rowsPerPage : minRows);
        setSlice(tempItems);
    }, [searchTable, search, props.page, rowsPerPage, minRows]);

    return {
        table,
        slice,
        range,
        rowsPerPage,
        minRows,
        maxRows,
        handleChangeSearch,
        handleChangeRowsNum
    };
};