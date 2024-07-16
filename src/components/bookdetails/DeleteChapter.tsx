import { Box, Modal, Typography } from "@mui/material";
import { Button } from "../ui/button";
import { useState } from "react";
import { useDeleteChapter } from "@/hooks/useChapterApi";

const DeleteChapter = ({ id }: { id: number }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate: deleteChapter } = useDeleteChapter();

  const toggleModal = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setIsModalOpen((prev) => !prev);
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    deleteChapter(id, {
      onSuccess: () => {
        toggleModal(e);
      },
    });
  };

  return (
    <div>
      <Button
        onClick={toggleModal}
        className="block w-full px-4 py-2 text-sm text-red-500 bg-transparent rounded-none hover:text-red-800 hover:dark:text-white hover:bg-gray-100 hover:dark:bg-darkMode2"
        role="menuitem"
      >
        Delete
      </Button>
      <Modal open={isModalOpen} onClose={toggleModal}>
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
            Are you sure you want to delete this chapter?
          </Typography>
          <div className="flex justify-center gap-5 mt-8">
            <Button
              variant="destructive"
              className="text-white bg-red-600 hover:bg-red-700"
              onClick={handleDelete}
            >
              Delete
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
    </div>
  );
};

export default DeleteChapter;
