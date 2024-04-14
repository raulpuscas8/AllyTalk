import { createSlice } from "@reduxjs/toolkit";

const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    personality: "normal",
    mood: "normal",
    responseSize: "medium",
    advanced: {},
  },
  reducers: {
    setItem: (state, action) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
    setAdvancedItem: (state, action) => {
      const { key, value } = action.payload;
      state.advanced[key] = value;
    },
  },
});

export const { setItem, setAdvancedItem } = settingsSlice.actions;
export default settingsSlice.reducer;
