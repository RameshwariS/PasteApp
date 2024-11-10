import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';
let pastesFromStorage;
try {
  pastesFromStorage = JSON.parse(localStorage.getItem("pastes")) || [];
} catch (e) {
  pastesFromStorage = [];
}

const initialState = {
  pastes: pastesFromStorage,
};

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      const paste = action.payload;

      // Retrieve pastes from localStorage and parse them into an array
      const pastesFromLocalStorage = JSON.parse(localStorage.getItem("pastes")) || [];

      // Check if a paste with the same title already exists
      //The some() method in JavaScript is used to test whether at least one element in an array satisfies a provided condition (callback function). It returns a boolean value (true or false).
      const titleExists = pastesFromLocalStorage.some(existingPaste => existingPaste.title === paste.title);

      if (titleExists) {
        toast.error('Header already exists');
      } else {
        // Add paste to state and localStorage
        state.pastes.push(paste);
        pastesFromLocalStorage.push(paste); // Add to localStorage as well
        localStorage.setItem("pastes", JSON.stringify(pastesFromLocalStorage));
        toast.success('Note is successfully created');
      }
    },

    updateToPastes: (state, action) => {
      const paste = action.payload
      //check if the id exits return the index among the pastes
      const idx = state.pastes.findIndex((item) => item._id === paste._id)
      if (idx >= 0) {
        //then change the paste with that idx to the inputted one 
        state.pastes[idx] = paste;
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success('Note is successfully updated');
      }
      else toast.error('Header do not exits');
    },
    removeFromPastes: (state, action) => {
      const pasteId = action.payload
      const idx = state.pastes.findIndex((item) => item._id === pasteId);
      if (idx >= 0) {
        state.pastes.splice(idx, 1);
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success('Note is successfully deleted');

      }
    },
    resetAllpaste: (state, action) => {
      state.pastes = [];
      localStorage.removeItem("pastes");
    }

  },
})

// Action creators are generated for each case reducer function
export const { addToPastes, updateToPastes, removeFromPastes ,resetAllpaste} = pasteSlice.actions

export default pasteSlice.reducer
