import api from "@/lib/axios.config"
import { login } from "@/redux/slices/userReducer"
import { IRegisterData, IUpdateData, IVote } from "@/types"
import { clearAll, storeData } from "@/utils/storage"
import { router } from "expo-router"
import { Dispatch } from "react"
import { UseFormReset } from "react-hook-form"
import { Toast, ToastType } from "react-native-toast-notifications"

export const registerUser = async ({
    data,
    setLoading,
    toast,
    reset,
    dispatch
}: {
    data: IRegisterData,
    toast: ToastType
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    reset: UseFormReset<IRegisterData>,
    dispatch: Dispatch<any>
}) => {
    try {
        setLoading(true)
        const url = "/user/create"
        const response = await api.post(url, { ...data })
        reset()
        toast.show(response.data.message, {
            type: "success",
            placement: "top"
        })
        dispatch(login({ ...response.data.data }))
        await storeData("token", response.data.data.token)
        return router.push("/login")
    } catch (error: any) {
        return toast.show(error.response.data.message ? error.response.data.message : "Error creating user", {
            type: "danger",
            placement: "top"
        })
    } finally {
        setLoading(false)
    }
}

export const updateUser = async ({
    data,
    setLoading,
    toast,
    reset
}: {
    data: IUpdateData,
    meter: string,
    toast: ToastType,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    reset: UseFormReset<IUpdateData>
}) => {
    try {
        setLoading(true)
        const url = "/user/update"
        const response = await api.post(url, { ...data })
        reset()
        toast.show(response.data.message, {
            type: "success",
            placement: "top"
        })
    } catch (error: any) {
        return toast.show(error.response.data.message ? error.response.data.message : "Error updating user", {
            type: "danger",
            placement: "top"
        })
    } finally {
        setLoading(false)
    }
}

export const getMe = async ({ toast }: { toast: ToastType }) => {
    try {
        const url = "/user/me"
        const response = await api.get(url)
        return response.data.data
    } catch (error: any) {
        return toast?.show(error.response.data.message ? error.response.data.message : "Error fetching user", {
            type: "danger",
            placement: "top"
        })
    }
}

export const deleteMyAccount = async ({ toast }: { toast: ToastType }) => {
    try {
        const url = "/user/delete"
        const response = await api.delete(url)
        await clearAll()
        response.data.message
    } catch (error: any) {
        return toast?.show(error.response.data.message ? error.response.data.message : "Error deleting user", {
            type: "danger",
            placement: "top"
        })
    }
}

export const getMyVotes = async ({
    setVotes,
    toast,
    setLoading
}: {
    toast: ToastType,
    setVotes: React.Dispatch<React.SetStateAction<IVote[]>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    try {
        setLoading(true)
        const url = "/user/my-votes"
        const response = await api.get(url)
        setVotes(response.data.data.votes)
        console.log(response.data.data.votes);
        setLoading(false)
    } catch (error: any) {
        return toast?.show(error.response.data.message ? error.response.data.message : "Error fetching votes", {
            type: "danger",
            placement: "top"
        })
    } finally {
        setLoading(false)
    }
}