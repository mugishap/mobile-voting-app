import api from "@/lib/axios.config"
import { login } from "@/redux/slices/userReducer"
import { IForgotPasswordData, ILoginData, IResetPasswordData } from "@/types"
import { storeData } from "@/utils/storage"
import { Dispatch } from "@reduxjs/toolkit"
import { ToastType } from "react-native-toast-notifications"

export const signIn = async ({
    setLoading,
    data,
    toast,
    dispatch
}: {
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    data: ILoginData,
    toast: ToastType,
    dispatch: Dispatch<any>
}) => {
    setLoading(true)
    try {
        const url = "/auth/login"
        const response = await api.post(url, data)
        storeData("token", response.data.data.token)
        storeData("user", JSON.stringify(response.data.data.user))
        toast.show(response.data.message, { type: "success" })
        setLoading(false)
        return dispatch(login({ ...response.data.data }))
    } catch (error: any) {
        return toast?.show(error.response.data.message ? error.response.data.message : "Error logging in", {
            type: "error",
            placement: "top"
        })
    }
}

export const forgotPassword = async ({ setLoading, data, toast }: { setLoading: React.Dispatch<React.SetStateAction<boolean>>, data: IForgotPasswordData, toast: any }) => {
    setLoading(true)
    try {
        const url = "/auth/initiate-reset-password"
        const response = await api.patch(url, data)
        toast.show(response.data.message, { type: "success" })
        setLoading(false)
    } catch (error: any) {
        return toast?.show(error.response.data.message ? error.response.data.message : "Error sending password reset code", {
            type: "error",
            placement: "top"
        })
    }
}

export const resetPassword = async ({ setLoading, data, toast }: { setLoading: React.Dispatch<React.SetStateAction<boolean>>, data: IResetPasswordData, toast: any }) => {
    setLoading(true)
    try {
        const url = "/auth/reset-password"
        const response = await api.patch(url, data)
        toast.show(response.data.message, { type: "success" })
        setLoading(false)
    } catch (error: any) {
        return toast?.show(error.response.data.message ? error.response.data.message : "Error resetting password", {
            type: "error",
            placement: "top"
        })
    }
}