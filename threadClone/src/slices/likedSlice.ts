import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
    // isFetchProfileThread: true,
}

export const likedSlice = createSlice({
    name: "like",
    initialState,
    reducers: {
        addLike: (state, action) => {
            const newThreads = action.payload;
            // const userId = sessionStorage.getItem("profileId")
            // console.log("profileId :", userId);
            // console.log("author :", action.payload[0].author.id);
            
            state.data = newThreads
            // state.data.push(newThreads);
            // state.isFetchlike = true
        },
        // setIsFetchlike: (state, action) => {
        //     state.isFetchlike = action.payload
        // }
    }
})

export const { addLike } = likedSlice.actions

export const selectLike = state => state.like.data

// export const selectIsFetchProfileThread = state => state.detailThread.isFetchProfileThread

export default likedSlice.reducer
