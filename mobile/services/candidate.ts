import api from "@/lib/axios.config"
import { ICandidate, IPaginationMeta, IRegisterCandidateData } from "@/types"
import { ToastType } from "react-native-toast-notifications"

export const getCandidates = async ({
    setLoading,
    toast,
    searchKey,
    page,
    limit,
    setCandidates,
    setMeta
}: {
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setCandidates: React.Dispatch<React.SetStateAction<ICandidate[]>>,
    toast: ToastType,
    searchKey?: string,
    page?: number,
    limit?: number,
    setMeta: React.Dispatch<React.SetStateAction<IPaginationMeta | undefined>>
}) => {
    setLoading(true)
    try {
        let url = `/candidate/all?page=${page}&limit=${limit}`
        if (searchKey) url = url.concat(`&searchKey=${searchKey}`)
        const response = await api.get(url)
        // Set candidates should start from previous candidates and add the new ones
        page == 1 ? setCandidates(response.data.data.candidates) : setCandidates(prevCandidates => [...prevCandidates, ...response.data.data.candidates])

        setMeta(response.data.data.meta)
        setLoading(false)
    } catch (error: any) {
        return toast?.show(error.response.data.message ? error.response.data.message : "Error fetching candidates", {
            type: "danger",
            placement: "top"
        })
    }
}

export const getCandidateById = async ({ id, setLoading, setCandidate, toast }: {
    id: string,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setCandidate: React.Dispatch<React.SetStateAction<ICandidate | undefined>>,
    toast: ToastType
}) => {
    try {
        setLoading(true)
        const response = await api.get(`/candidate/${id}`)
        setCandidate(response.data.data.candidate)
        setLoading(false)
    } catch (error: any) {
        return toast?.show(error.response.data.message ? error.response.data.message : "Error fetching candidate", {
            type: "danger",
            placement: "top"
        })
    }
}

export const voteCandidate = async ({ candidateId, setLoading, toast }: { candidateId: string, setLoading: React.Dispatch<React.SetStateAction<boolean>>, toast: ToastType }) => {
    try {
        setLoading(true)
        const response = await api.patch(`/candidate/vote/${candidateId}`)
        toast.show(response.data.message, { type: "success" })
        setLoading(false)
    } catch (error: any) {
        return toast?.show(error.response.data.message ? error.response.data.message : "Error voting candidate", {
            type: "danger",
            placement: "top"
        })
    }
}

export const registerCandidate = async ({ data, setLoading, toast, dispatch, reset }: { data: IRegisterCandidateData, setLoading: React.Dispatch<React.SetStateAction<boolean>>, toast: ToastType, dispatch: any, reset: any }) => {
    try {
        setLoading(true)
        const response = await api.post("/candidate/create", data)
        toast.show(response.data.message, { type: "success" })
        setLoading(false)
        reset()
    } catch (error: any) {
        return toast?.show(error.response.data.message ? error.response.data.message : "Error registering candidate", {
            type: "danger",
            placement: "top"
        })
    }
}