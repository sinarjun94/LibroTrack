import { createSlice } from "@reduxjs/toolkit";

const popupSlice = createSlice({
  name: "popup",
  initialState: {
    settingPopup: false,
    addBookPopup: false,
    readBookPopup: false,
    returnBookPopup: false,
    recordBookPopup: false,
    addNewAdminPopup: false,
    deleteBookPopup: false,
    bookIdToDelete: null,
  },
  reducers: {
    toggleSettingPopup: (state) => {
      state.settingPopup = !state.settingPopup;
    },
    toggleAddBookPopup: (state) => {
      state.addBookPopup = !state.addBookPopup;
    },
    toggleReadBookPopup: (state) => {
      state.readBookPopup = !state.readBookPopup;
    },
    toggleReturnBookPopup: (state) => {
      state.returnBookPopup = !state.returnBookPopup;
    },
    toggleRecordBookPopup: (state) => {
      state.recordBookPopup = !state.recordBookPopup;
    },
    toggleAddNewAdminPopup: (state) => {
      state.addNewAdminPopup = !state.addNewAdminPopup;
    },
    toggleDeleteBookPopup: (state, action) => {
      state.deleteBookPopup = !state.deleteBookPopup;
      state.bookIdToDelete = action?.payload || null;
    },
    closeAllPopups: (state) => {
      state.settingPopup = false;
      state.addBookPopup = false;
      state.readBookPopup = false;
      state.returnBookPopup = false;
      state.recordBookPopup = false;
      state.addNewAdminPopup = false;
    },
  },
});

export const {
  closeAllPopups,
  toggleSettingPopup,
  toggleAddBookPopup,
  toggleReadBookPopup,
  toggleReturnBookPopup,
  toggleRecordBookPopup,
  toggleAddNewAdminPopup,
  toggleDeleteBookPopup,
} = popupSlice.actions;

export default popupSlice.reducer;
