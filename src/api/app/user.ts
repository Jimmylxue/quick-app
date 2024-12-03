import { useMutation } from "@tanstack/react-query"
import http from "../client"

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
  return useMutation({
    mutationFn: async () => http.post("/phone_coin/info"),
  })
}
