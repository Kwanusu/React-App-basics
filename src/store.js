
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import authReducer from "./slices/authSlice";
import postsReducer from "./slices/postSlice";

// Create store
const store = configureStore({
    reducer: {
        counter : counterReducer,
        auth: authReducer,
        posts: postsReducer,
    }
});

export default store;