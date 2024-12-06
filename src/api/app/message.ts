import { useMutation, useQuery } from "@tanstack/react-query"
import http from "../client"

export function getMessageList() {
  return useQuery<any, any, any>({
    queryKey: ["messageList"],
    queryFn: async () => http.post("/letter/user/record"),
  })
}

export function fetchReadMessage() {
  return useMutation({
    mutationFn: async () => http.post("/letter/user/read", { status: 1 }),
  })
}
