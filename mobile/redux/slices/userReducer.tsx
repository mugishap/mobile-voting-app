import { Slice, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../types";
import { router } from "expo-router";
import { removeValue } from "@/utils/storage";

const initialState: {
    user: IUser;
    token: string;
    isLoggedIn: boolean;
} = {
    user: {
        id: "",
        names: "",
        email: "",
        telephone: "",
        profilePicture: "",
        role: "",
    },
    token: "",
    isLoggedIn: false
};

const userSlice: Slice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, { payload }) => {
            state.isLoggedIn = true;
            state.user = { ...payload.user };
            state.token = payload.token
        },

        logout: (state) => {
            state.isLoggedIn = false;
            state.user = {
                ...initialState.user
            }
            state.token = ""
            state.users = []
            router.push("/login");
            removeValue("token").then(() => {
                console.log("token removed")
            });
        },
        updateUser: (state, { payload }) => {
            state.user = payload;
        }
    }
});

export const { login, logout, updateUser } = userSlice.actions;

export default userSlice.reducer;