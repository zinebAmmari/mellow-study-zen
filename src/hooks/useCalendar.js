import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { calendarAPI } from "@/lib/api";

export const useCalendarEvents = () => {
  return useQuery({
    queryKey: ["calendar"],
    queryFn: async () => {
      const response = await calendarAPI.getAll();
      return response.data.events;
    },
  });
};

export const useCalendarEvent = (id) => {
  return useQuery({
    queryKey: ["calendar", id],
    queryFn: async () => {
      const response = await calendarAPI.getById(id);
      return response.data.event;
    },
    enabled: !!id,
  });
};

export const useCreateEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => calendarAPI.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["calendar"] });
    },
  });
};

export const useUpdateEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => calendarAPI.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["calendar"] });
    },
  });
};

export const useDeleteEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => calendarAPI.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["calendar"] });
    },
  });
};
