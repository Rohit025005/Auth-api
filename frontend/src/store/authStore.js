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
    message:null,

    signUp : async (email, password, name) => {
        set({isLoading:true, error:null});
        try {
            const response = await axios.post(`${API_URL}/sign-up`, { name, email, password });
            set({
                user:response.data.user,
                 isAuthenticated:true,
                  isLoading:false
                });
        } catch (error) {
            set({
                error: error.response?.data?.message || "Error in signing up",
                 isLoading:false
                });
            throw error;
        }
    },

    verifyEmail : async (code) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}/verify-email`, { otp: code });
			set({ 
                user: response.data.user,
                 isAuthenticated: true, 
                 isLoading: false 
                });
			return response.data;
		} catch (error) {
			set({ error: error.response.data.message || "Error verifying email", isLoading: false });
			throw error;
		}
	},

    login : async (email, password) => {
        set({isLoading:true, error:null});
        try {
            const response = await axios.post(`${API_URL}/log-in`, { email, password });
            set({
                user:response.data.user,
                 isAuthenticated:true,
                  isLoading:false
                });
        } catch (error) {
            set({
                error: error.response?.data?.message || "Error in signing up",
                 isLoading:false
                });
            throw error;
        }
    },

    logout: async () => {
		set({ isLoading: true, error: null });
		try {
			await axios.post(`${API_URL}/log-out`);
			set({ 
                user: null, 
                isAuthenticated: false, 
                error: null, 
                isLoading: false 
            });
		} catch (error) {
			set({ error: "Error logging out", isLoading: false });
			throw error;
		}
	},

    checkAuth : async () => {
        set({ isCheckingAuth:true,error:null});
        try {
            const res = await axios.get(`${API_URL}/check-auth`)
      set({ 
        user: res.data.user, 
        isAuthenticated: true, 
        isCheckingAuth: false 
    });
		} catch (error) {
			set({ error: null, isCheckingAuth: false, isAuthenticated: false });
		}
    },

    forgotPassword:async (email) => {
        set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}/forgot-password`, { email });
			set({ 
                message: response.data.message,
                 isLoading: false 
                });
		} catch (error) {
			set({
				isLoading: false,
				error: error.response.data.message || "Error sending reset password email",
			});
			throw error;
		}
    },

    resetPassword:async (token,password) => {
        set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}/reset-password/${token}`, { password });
			set({ 
                message: response.data.message,
                 isLoading: false 
                });
		} catch (error) {
			set({
				isLoading: false,
				error: error.response.data.message || "Error sending reset password email",
			});
			throw error;
		}
    }
}))