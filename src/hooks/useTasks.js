import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { tasksAPI } from "@/lib/api";

export const useTasks = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await tasksAPI.getAll();
      return response.data.tasks;
    },
  });
};

export const useTask = (id) => {
  return useQuery({
    queryKey: ["tasks", id],
    queryFn: async () => {
      const response = await tasksAPI.getById(id);
      return response.data.task;
    },
    enabled: !!id,
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => tasksAPI.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => tasksAPI.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => tasksAPI.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};
