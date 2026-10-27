import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';


// Define the initial state using that type
const initialState = {
  pastes: localStorage.getItem('pastes') ? JSON.parse(localStorage.getItem('pastes')) : [],
}

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPastes: (state, action) => {
     const newPaste = action.payload
     state.pastes.push(newPaste)
     localStorage.setItem('pastes', JSON.stringify(state.pastes))
     toast.success('Paste created successfully!')
    },
    updateToPastes: (state, action) => {
      const updatedPaste = action.payload
        const index = state.pastes.findIndex(paste => paste._id === updatedPaste._id)
        if (index>=0){
            state.pastes[index] = updatedPaste
            localStorage.setItem('pastes', JSON.stringify(state.pastes))
            toast.success('Paste updated successfully!')
        }
    },
    resetAllPastes: (state, action) => {
     state.pastes = []
     localStorage.removeItem('pastes')
    },
    removeFromPastes: (state, action) => {
     const pasteIdToRemove = action.payload
     const index = state.pastes.findIndex(
        (item) => item._id === pasteIdToRemove
        );
     if (index >= 0) {
        state.pastes.splice(index, 1);
        localStorage.setItem('pastes', JSON.stringify(state.pastes));
        toast.success('Paste removed successfully!');
     }
    }
  }
})

// Action creators are generated for each case reducer function
export const { addToPastes, updateToPastes, resetAllPastes, removeFromPastes } = pasteSlice.actions

export default pasteSlice.reducer