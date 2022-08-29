import { useState, useEffect, useCallback, ChangeEventHandler } from 'react';
import { useSelector } from "react-redux";

import { RootState } from "@redux/reducers";

import { tableType } from "@types";

type Props = {
    page: number;
    rowsPerPage: number;
};

export const useTable = (props: Props) => {
    const [range, setRange] = useState([0]);
    const [slice, setSlice] = useState<tableType[]>([]);
    const [search, setSearch] = useState({
        username: '',
        action: '',
        action_created_at: '',
    });

    const table = useSelector((state: RootState) => state.table.table);

    const handleChangeInput: ChangeEventHandler<HTMLInputElement> = (e) => {
        setSearch((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const searchRows = useCallback((data: tableType[]) => {
        return data.filter(item => {
            const ifInclude = Object.keys(search).every(key => {
                if (item[key].toString().includes(search[key])) {
                    return true;
                }
                return false;
            })
            return ifInclude;
        });
    }, [search]);

    const calculateRange = (data: tableType[], rowsPerPage: number) => {
        const range = [];
        const num = Math.ceil(data.length / rowsPerPage);
        for (let i = 1; i <= num; i++) {
            range.push(i);
        }
        return range;
    };

    const sliceData = (data: tableType[], page: number, rowsPerPage: number) => {
        return data.slice((page - 1) * rowsPerPage, page * rowsPerPage);
    };

    useEffect(() => {
        let items = searchRows(table);
        const range = calculateRange(items, props.rowsPerPage);
        setRange([...range]);
        
        items = sliceData(items, props.page, props.rowsPerPage);
        setSlice([...items]);
        console.log(items)
    }, [searchRows, table, search, setRange, props.page, setSlice, props.rowsPerPage]);

    return {
        table,
        slice,
        range,
        handleChangeInput
    };
};