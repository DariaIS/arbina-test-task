import { useState, useEffect, useMemo, ChangeEventHandler } from 'react';
import { useSelector } from "react-redux";

import { RootState } from "../../../../redux/reducers";
import { useAppDispatch } from "../../../../redux/hooks";
import { remove } from '../../../../redux/slices/table';

import { tableType } from "@types";

type Props = {
    page: number;
};

export const useTable = (props: Props) => {
    const dispatch = useAppDispatch();

    const [range, setRange] = useState(0);
    const [slice, setSlice] = useState<tableType[]>([]);
    const [rowsPerPage, setRowsPerPage] = useState('3');
    const [search, setSearch] = useState<tableType>({
        username: '',
        action: '',
        action_created_at: 0,
    });

    const [minRows, maxRows] = ['3', '15']

    const table = useSelector((state: RootState) => state.table.table);

    const handleClickRemove = (obj: tableType) => {
        dispatch(remove(obj))
    };

    const handleChangeSearch: ChangeEventHandler<HTMLInputElement> = (e) => {
        const newValue =
            typeof search[e.target.name] !== 'number' ? 
            e.target.value : e.target.value === '' ? 0 : new Date(e.target.value).getTime();

        setSearch(prev => ({ ...prev, [e.target.name]: newValue }));
    };

    const handleChangeRowsNum: ChangeEventHandler<HTMLInputElement> = (e) => {
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

    const searchRows = (data: tableType[], searchObj: tableType) => {
        return data.filter(item => {
            const ifInclude = Object.keys(searchObj).every(key => {
                const tempKey = key as (keyof typeof item);
                if (typeof item[tempKey] === 'number') {
                    const [searchDate, itemDate] = [
                        new Date(searchObj[tempKey]),
                        new Date(item[tempKey])
                    ];
                    if (searchDate.toDateString() === itemDate.toDateString()
                        || searchDate.getTime() === 0
                    )
                        return true;
                } else if ((item[tempKey] as string).includes(searchObj[tempKey] as string)) {
                    return true;
                }
                return false;
            })
            return ifInclude;
        });
    };

    const calculateRange = (data: tableType[], rowsPerPage: string): number => {
        return Math.ceil(data.length / parseInt(rowsPerPage, 10));
    };

    const sliceData = (data: tableType[], page: number, rowsPerPage: string) => {
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
        handleChangeRowsNum,
        handleClickRemove
    };
};