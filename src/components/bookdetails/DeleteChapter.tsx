import { Box, Modal, Typography } from "@mui/material";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { useDeleteChapter } from "@/hooks/useChapterApi";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

const DeleteChapter = ({ id }: { id: number }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    mutate: deleteChapter,
    isSuccess: isDeleteChapterSuccess,
    isPending: isDeletePending,
  } = useDeleteChapter();
  const queryClient = useQueryClient();

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

  useEffect(() => {
    if (isDeleteChapterSuccess) {
      queryClient.invalidateQueries({ queryKey: ["chapters"] });
    }
  }, [isDeleteChapterSuccess, queryClient, deleteChapter]);

  return (
    <div>
      <Button
        onClick={toggleModal}
        className="block w-full px-4 py-2 text-sm text-red-500 bg-transparent rounded-none hover:text-red-800 hover:dark:text-white hover:bg-gray-100 hover:dark:bg-darkMode2"
        role="menuitem"
        variant="destructive"
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
            className="flex flex-col gap-3 mb-8 text-center"
          >
            <span className="text-xl text-red-600 font-primary">
              Are you sure want to delete?
            </span>
            <span className="text-sm text-black dark:text-white font-primary">
              {" "}
              The book will be deleted permanently and will not be recovered.
            </span>
          </Typography>
          <div className="flex justify-end gap-5 mt-8">
            <Button variant="ghost" onClick={toggleModal}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              className="text-white bg-red-600 hover:bg-red-700"
              onClick={handleDelete}
            >
              {" "}
              <Loader2
                className={isDeletePending ? "block animate-spin" : "hidden"}
              />
              Yes! Delete
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default DeleteChapter;
