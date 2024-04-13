import { createSlice } from "@reduxjs/toolkit";

const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    personality: "normal",
  },
  reducers: {
    setItem: (state, action) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
  },
});

export const { setItem } = settingsSlice.actions;
export default settingsSlice.reducer;
