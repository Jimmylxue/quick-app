import { useQuery } from "@tanstack/react-query"
import http from "./client"

export function getProductList(data: any) {
  return useQuery<any, any, any, any>({
    queryKey: ["products"],
    queryFn: () => http.post("/link/c_list", data),
    initialData: [],
  })
}
