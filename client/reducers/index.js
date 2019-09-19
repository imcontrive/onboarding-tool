import { combineReducers } from "redux";
import currentUser from "./currentUser";

const rootReducer = combineReducers({
  userInfo: currentUser
});

export default rootReducer;
