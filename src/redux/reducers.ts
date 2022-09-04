import { combineReducers } from "redux";

import table from "./slices/table";

const rootReducer = combineReducers({ table });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
