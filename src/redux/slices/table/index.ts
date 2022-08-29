import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { tableType } from "@types";

interface tableState {
  table: tableType[];
}

const initialState: tableState = {
  table: [
    {
      username: "user-001",
      action: "logged_in",
      action_created_at: new Date("2022-05-08T07:01:09.171245Z")
    }, {
      username: "user-002",
      action: "button_sign_in_tapped",
      action_created_at: new Date("2022-05-08T07:02:09.171245Z")
    }, {
      username: "user-003",
      action: "button_log_out_tapped",
      action_created_at: new Date("2022-05-08T07:03:09.171245Z")
    }, {
      username: "user-004",
      action: "logged_in",
      action_created_at: new Date("2022-05-08T07:01:09.171245Z")
    }, {
      username: "user-005",
      action: "button_sign_in_tapped",
      action_created_at: new Date("2022-05-08T07:02:09.171245Z")
    }, {
      username: "user-006",
      action: "button_log_out_tapped",
      action_created_at: new Date("2022-05-08T07:03:09.171245Z")
    }, {
      username: "user-007",
      action: "logged_in",
      action_created_at: new Date("2022-05-08T07:01:09.171245Z")
    }, {
      username: "user-008",
      action: "button_sign_in_tapped",
      action_created_at: new Date("2022-05-08T07:02:09.171245Z")
    }, {
      username: "user-009",
      action: "button_log_out_tapped",
      action_created_at: new Date("2022-05-08T07:03:09.171245Z")
    }
  ]
}

const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    remove: (state, action: PayloadAction<tableType>) => {
      const index = state.table.findIndex(object => {
        return (object.username === action.payload.username
          && object.username === action.payload.username
          && object.username === action.payload.username);
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
