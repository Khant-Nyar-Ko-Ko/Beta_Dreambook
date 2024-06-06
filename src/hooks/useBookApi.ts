import { createBooks } from "@/api";
import { BookDataType } from "@/utils/type";
import { useMutation } from "@tanstack/react-query";

export const useCreateBook = () => {
  return useMutation({
    mutationFn: (data: BookDataType) => createBooks( data ),
  });
};
