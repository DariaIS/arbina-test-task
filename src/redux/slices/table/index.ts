import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { makeTableDate } from './tableData'
import { tableType } from "@types";

interface tableState {
    table: tableType[];
}

const initialState: tableState = {
    table: makeTableDate(100)
}

const tableSlice = createSlice({
    name: "table",
    initialState,
    reducers: {
        remove: (state, action: PayloadAction<tableType>) => {
            const index = state.table.findIndex(object => {
                return (object.username === action.payload.username
                    && object.action === action.payload.action
                    && object.action_created_at === action.payload.action_created_at);
            });
            state.table = [
                ...state.table.slice(0, index),
                ...state.table.slice(index + 1)
            ]
        }
    },
});

export const { remove } = tableSlice.actions;

export default tableSlice.reducer;
