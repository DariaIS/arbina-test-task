import { combineReducers } from "redux";

import counter from "@redux/slices/counter";
import table from "@redux/slices/table";

const rootReducer = combineReducers({ counter, table });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
