import { useState } from "react";
import { Button } from "../ui/button";
import { Box, Modal, Typography } from "@mui/material";
import { useDeleteBook } from "@/hooks/useBookApi";
import { useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

const DeleteBook = () => {
  const { slug } = useParams<{ slug: string }>();
  const queryClient = useQueryClient();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate: deleteBook, isPending } = useDeleteBook();
  const navigate = useNavigate();

  const toggleModal = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setIsModalOpen(!isModalOpen);
  };

  const refetchBook = () => {
    queryClient.invalidateQueries({queryKey: ['singleBook']})
  }

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    deleteBook(slug ?? "", {
      onSuccess: () => {
        toggleModal(e);
        refetchBook();
        navigate("/home");
      },
      onError: (error) => {
        console.error("Failed to delete book:", error);
      },
    });
  };

  return (
    <>
      <Button variant="white" onClick={toggleModal} className="text-red-600">
        Delete
      </Button>
      <Modal open={isModalOpen}>
        <Box
          className="p-4 text-sm bg-white rounded-md shadow-md md:p-8 dark:bg-darkMode2"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            maxWidth: "500px"
          }}
        >
          <Typography
            variant="h6"
            className="flex flex-col gap-3 mb-8 text-center text-black font-primary dark:text-white"
          >
            <span className="text-base text-red-600 md:text-xl font-primary">
              Are you sure want to delete?
            </span>
            <span className="text-xs text-black md:text-sm dark:text-white font-primary">
              {" "}
              The book will be deleted permanently and will not be recovered.
            </span>
          </Typography>
          <div className="flex justify-center gap-5 mt-8">
            <Button
              variant="destructive"
              className="text-white bg-red-600 hover:bg-red-700"
              onClick={handleDelete}
            >
               <Loader2
                className={isPending ? "block animate-spin" : "hidden"}
              />
              Yes! Delete
            </Button>
            <Button
              variant="outline"
              className="text-gray-600 border-gray-600 hover:bg-gray-600 hover:text-white"
              onClick={toggleModal}
            >
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default DeleteBook;
