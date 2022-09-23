import { combineReducers } from "@reduxjs/toolkit";

import getUser from "./getUser";
import getTransactions from "./getTransactions";
import getAllUsers from "./getAllUsers";
import getProfile from "./getProfile";
import getPin from "./getPin";
import updatePin from "./updatePin";
import postTransfer from "./postTransfer";
import updateProfile from "./updateProfile";
import updatePassword from "./updatePassword";

const reducer = combineReducers({
  getUser,
  getProfile,
  getTransactions,
  getAllUsers,
  getPin,
  updatePin,
  postTransfer,
  updateProfile,
  updatePassword
});

export default reducer;