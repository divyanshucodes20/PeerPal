import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/auth";
import api from "./api/api";
import miscSlice from "./reducers/misc";
import chatSlice from "./reducers/chat";
import { learnerAPI } from "./api/learner";
import { rideAPI } from "./api/ride";
import { projectAPI } from "./api/project";
import { goalAPI } from "./api/goals";
import { roommateAPI } from "./api/roommate";

const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [miscSlice.name]: miscSlice.reducer,
    [chatSlice.name]: chatSlice.reducer,
    [api.reducerPath]: api.reducer,
    [rideAPI.reducerPath]: rideAPI.reducer,
    [learnerAPI.reducerPath]: learnerAPI.reducer,
    [projectAPI.reducerPath]: projectAPI.reducer,
    [goalAPI.reducerPath]: goalAPI.reducer,
    [roommateAPI.reducerPath]: roommateAPI.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
  .concat(rideAPI.middleware).concat(learnerAPI.middleware).concat(projectAPI.middleware).concat(goalAPI.middleware).concat(roommateAPI.middleware),

});

export default store;
