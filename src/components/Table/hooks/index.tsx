import { useState, useEffect, ChangeEventHandler } from 'react';

import { tableType } from "@types";

type Props = {
    table: tableType[];
    page: number;
    rowsPerPage: number;
};

export const useTable = (props: Props) => {
    const [range, setRange] = useState([0]);
    const [slice, setSlice] = useState<tableType[]>([]);
    const [searchName, setSearchName] = useState('');

    const handleChangeInput: ChangeEventHandler<HTMLInputElement> = ({ target: { value } }) => {
        setSearchName(value);
    };

    const calculateRange = (data: tableType[], cardsPerPage: number) => {
        const range = [];
        const num = Math.ceil(data.length / cardsPerPage);
        for (let i = 1; i <= num; i++) {
            range.push(i);
        }
        return range;
    };

    const sliceData = (data: tableType[], page: number, cardsPerPage: number) => {
        return data.slice((page - 1) * cardsPerPage, page * cardsPerPage);
    };

    useEffect(() => {
        const range = calculateRange(props.table, 1);
        setRange([...range]);

        const slice = sliceData(props.table, props.page, 1);
        setSlice([...slice]);
    }, [props.table, setRange, props.page, setSlice, searchName]);

    return {
        slice,
        range,
        handleChangeInput
    };
};