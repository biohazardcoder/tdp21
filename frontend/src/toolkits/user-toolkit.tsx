import { createSlice } from "@reduxjs/toolkit";

const UserSlicer = createSlice({
    name: "User",
    initialState: {
        data: {},
        isPending: false,
        isError: "",
    },
    reducers: {
        getPending(state) {
            state.isPending = true,
                state.isError = ""
        },
        getUserInfo(state, { payload }) {
                state.data = payload,
                state.isPending = false

        },
        getError(state, { payload }) {
            state.isPending = false
            state.isError = payload
        }
    }
})
export const { getError, getPending, getUserInfo } = UserSlicer.actions
export default UserSlicer.reducer