import { combineReducers } from "redux";

import counter from "./slices/counter";
import table from "./slices/table";

const rootReducer = combineReducers({ counter, table });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
