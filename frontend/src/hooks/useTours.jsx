// src/hooks/useTours.js
import useSWR from "swr";
import api from "../services/api";

const fetcher = (url) => api.get(url).then((res) => res.data);

export const useTours = (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const { data, error, isLoading, mutate } = useSWR(
    `/tours${query ? `?${query}` : ""}`,
    fetcher,
    { revalidateOnFocus: false }
  );

  return {
    tours: data?.data ?? [],
    total: data?.count ?? 0,
    isLoading,
    isError: !!error,
    mutate,
  };
};