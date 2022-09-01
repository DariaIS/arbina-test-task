import { useState, useEffect, useMemo, ChangeEventHandler } from 'react';
import { useSelector } from "react-redux";

import { RootState } from "@redux/reducers";

import { tableType } from "@types";

type Props = {
    page: number;
    rowsPerPage: number;
};

export const useTable = (props: Props) => {
    const [range, setRange] = useState(0);
    const [slice, setSlice] = useState<tableType[]>([]);
    const [search, setSearch] = useState({
        username: '',
        action: '',
        action_created_at: new Date(0),
    });

    const table = useSelector((state: RootState) => state.table.table);

    const handleChangeInput: ChangeEventHandler<HTMLInputElement> = (e) => {
        setSearch((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const searchRows = (data: tableType[], searchObj: {
        username: string,
        action: string,
        action_created_at: Date
    }) => {
        console.log('search')
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

    const calculateRange = (data: tableType[], rowsPerPage: number): number => {
        return Math.ceil(data.length / rowsPerPage);
    };

    const sliceData = (data: tableType[], page: number, rowsPerPage: number) => {
        return data.slice((page - 1) * rowsPerPage, page * rowsPerPage);
    };

    let searchTable: tableType[] = useMemo(() => searchRows(table, search), [search, table]);

    useEffect(() => {
        const range = calculateRange(searchTable, props.rowsPerPage);
        setRange(range);

        const tempItems = sliceData(searchTable, props.page, props.rowsPerPage);
        setSlice(tempItems);
    }, [searchTable, search, props.page, props.rowsPerPage]);

    return {
        table,
        slice,
        range,
        handleChangeInput
    };
};