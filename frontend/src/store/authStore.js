import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:5500/api/auth";

axios.defaults.withCredentials = true;
export const useAuthStore = create((set) => ({
    user:null,
    isAuthenticated:false,
    error:null,
    isLoading:false,
    isCheckingAuth:true,

    signUp:async (email, password, name) => {
        set({isLoading:true, error:null});
        try {
            const response = await axios.post(`${API_URL}/sign-up`, { name, email, password });
            set({user:response.data.user, isAuthenticated:true, isLoading:false});
        } catch (error) {
            set({error: error.response?.data?.message || "Error in signing up", isLoading:false});
            throw error;
        }
    },

    verifyEmail: async (code) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}/verify-email`, { otp: code });
			set({ user: response.data.user, isAuthenticated: true, isLoading: false });
			return response.data;
		} catch (error) {
			set({ error: error.response.data.message || "Error verifying email", isLoading: false });
			throw error;
		}
	},
}))