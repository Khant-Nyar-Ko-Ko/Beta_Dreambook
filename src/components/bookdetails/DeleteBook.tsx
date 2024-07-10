import { useState } from "react";
import { Button } from "../ui/button";
import { Box, Modal, Typography } from "@mui/material";
import { useDeleteBook } from "@/hooks/useBookApi";
import { useNavigate, useParams } from "react-router-dom";

const DeleteBook = () => {
  const { slug } = useParams<{ slug: string }>();

  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {mutate : deleteBook} = useDeleteBook()
  const navigate = useNavigate();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleDelete = () => {
    deleteBook(slug ?? "", {
      onSuccess: () => {
        toggleModal();
        navigate('/')
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
          className="p-8 text-sm bg-white rounded-md shadow-md dark:bg-darkMode2"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
          }}
        >
          <Typography
            variant="h6"
            className="mb-8 text-center text-black font-primary dark:text-white"
          >
            Are you sure you want to delete this book?
          </Typography>
          <div className="flex justify-center gap-5 mt-8">
            <Button
              variant="destructive"
              className="text-white bg-red-600 hover:bg-red-700"
              onClick={handleDelete}
            >
              Yes, Delete
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
