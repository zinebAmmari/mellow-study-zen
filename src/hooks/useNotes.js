import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { notesAPI } from "@/lib/api";

export const useNotes = () => {
  return useQuery({
    queryKey: ["notes"],
    queryFn: async () => {
      const response = await notesAPI.getAll();
      return response.data.notes;
    },
  });
};

export const useNote = (id) => {
  return useQuery({
    queryKey: ["notes", id],
    queryFn: async () => {
      const response = await notesAPI.getById(id);
      return response.data.note;
    },
    enabled: !!id,
  });
};

export const useCreateNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => notesAPI.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });
};

export const useUpdateNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => notesAPI.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });
};

export const useDeleteNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => notesAPI.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });
};
