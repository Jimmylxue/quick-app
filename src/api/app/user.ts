import { useMutation, useQuery } from "@tanstack/react-query"
import http from "../client"
import { auth } from "@src/hooks/useAuth"

export function fetchLogin() {
  return useMutation({
    mutationFn: async (data) => http.post("/user/login_by_id", data),
  })
}

export function fetchDetail() {
  return useMutation({
    mutationFn: async () => http.post("/user/detail"),
  })
}

export function fetchCoin() {
  return useQuery({
    queryKey: [auth.token],
    queryFn: async () => http.post("/phone_coin/info"),
  })
}

export function fetchChangePassword() {
  return useMutation({
    mutationFn: async (data: any) => http.post("user/c_change_pass", data),
  })
}
