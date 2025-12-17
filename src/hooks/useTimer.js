import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { timerAPI } from "@/lib/api";

export const useTimerSessions = () => {
  return useQuery({
    queryKey: ["timer"],
    queryFn: async () => {
      const response = await timerAPI.getAll();
      return response.data.sessions;
    },
  });
};

export const useTimerSession = (id) => {
  return useQuery({
    queryKey: ["timer", id],
    queryFn: async () => {
      const response = await timerAPI.getById(id);
      return response.data.session;
    },
    enabled: !!id,
  });
};

export const useCreateTimerSession = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => timerAPI.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["timer"] });
    },
  });
};

export const useCompleteTimerSession = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => timerAPI.complete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["timer"] });
    },
  });
};

export const useDeleteTimerSession = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => timerAPI.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["timer"] });
    },
  });
};
