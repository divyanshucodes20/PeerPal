import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/auth";
import api from "./api/api";
import miscSlice from "./reducers/misc";
import chatSlice from "./reducers/chat";
import { roommateAPI } from "./api/roommate";
import { learnerAPI } from "./api/learner";
import { rideAPI } from "./api/ride";
import { projectAPI } from "./api/project";

const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [miscSlice.name]: miscSlice.reducer,
    [chatSlice.name]: chatSlice.reducer,
    [api.reducerPath]: api.reducer,
    [rideAPI.reducerPath]: rideAPI.reducer,
    [roommateAPI.reducerPath]: roommateAPI.reducer,
    [learnerAPI.reducerPath]: learnerAPI.reducer,
    [projectAPI.reducerPath]: projectAPI.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

export default store;
