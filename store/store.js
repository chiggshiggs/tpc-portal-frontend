import { configureStore } from "@reduxjs/toolkit";

// Slices
import counterSlice from "./states/counterSlice.js";

export default configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
});
