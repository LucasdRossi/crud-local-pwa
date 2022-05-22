import { useCallback, useState } from "react";

import AuthHolder from "../../components/AuthHolder";
import useBooksStorage from "../../storage/books";
import useBookForm from "./useBookForm";

import Fab from "@mui/material/Fab";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function BooksPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [books, storageDispatch] = useBooksStorage();
  const [form, formDispatch] = useBookForm();

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    formDispatch({
      type: "RESET",
    });
  }, [formDispatch]);

  const handleFormInputChange = (event) => {
    formDispatch({
      type: `CHANGE_${event.target.name}`,
      payload: event.target.value,
    });
  };

  const handleEditItem = (book) => {
    formDispatch({
      type: "SET_BOOK",
      payload: book,
    });
    openModal();
  };

  const handleRemoveItem = (id) => {
    storageDispatch({
      type: "REMOVE",
      payload: id,
    });
  };

  const handleFormSubmit = useCallback(
    (event) => {
      event.preventDefault();
      if (form.id) {
        storageDispatch({
          type: "EDIT",
          payload: {
            id: form.id,
            name: form.name,
            author: form.author,
            numberOfPages: parseInt(form.numberOfPages),
          },
        });
      } else {
        storageDispatch({
          type: "ADD",
          payload: {
            name: form.name,
            author: form.author,
            numberOfPages: parseInt(form.numberOfPages),
          },
        });
      }
      closeModal();
    },
    [form, storageDispatch, closeModal]
  );

  return (
    <>
      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table size="medium">
          <TableHead>
            <TableRow>
              <TableCell align="center">Id</TableCell>
              <TableCell align="center">Nome</TableCell>
              <TableCell align="center">Autor</TableCell>
              <TableCell align="center">Páginas</TableCell>
              <AuthHolder>
                <TableCell align="center">Ações</TableCell>
              </AuthHolder>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((row) => (
              <TableRow key={`${row.id}-${row.name}`}>
                <TableCell align="center">{row.id}</TableCell>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.author}</TableCell>
                <TableCell align="center">{row.numberOfPages}</TableCell>
                <AuthHolder>
                  <TableCell align="center">
                    <IconButton
                      onClick={() => handleEditItem(row)}
                      color="primary"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleRemoveItem(row.id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </AuthHolder>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <AuthHolder>
        <Box sx={styles.fab}>
          <Fab color="primary" onClick={openModal}>
            <AddIcon />
          </Fab>
        </Box>
      </AuthHolder>

      <Modal open={isModalOpen} onClose={closeModal}>
        <Box sx={styles.modalBoxStyle}>
          <form onSubmit={handleFormSubmit}>
            <TextField
              label="Nome"
              name="NAME"
              variant="outlined"
              onChange={handleFormInputChange}
              value={form.name}
              fullWidth
              required
              sx={{
                mb: 2,
              }}
            />
            <TextField
              label="Autor"
              name="AUTHOR"
              variant="outlined"
              onChange={handleFormInputChange}
              value={form.author}
              fullWidth
              required
              sx={{
                mb: 2,
              }}
            />
            <TextField
              label="Número de páginas"
              name="NUMBER_OF_PAGES"
              variant="outlined"
              onChange={handleFormInputChange}
              type="number"
              value={form.numberOfPages}
              required
              inputProps={{
                min: 1,
              }}
              fullWidth
            />
            <Box sx={styles.modalButtonsWrapper}>
              <Button variant="outlined" fullWidth onClick={closeModal}>
                Cancelar
              </Button>
              <Button
                variant="contained"
                type="submit"
                fullWidth
                disabled={form.incomplete}
              >
                Salvar
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </>
  );
}

const styles = {
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  modalBoxStyle: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    maxWidth: "80vw",
    borderRadius: 1,
    bgcolor: "background.paper",
    p: 4,
  },
  modalButtonsWrapper: {
    mt: 2,
    display: "flex",
    justifyContent: "space-between",
    gap: 1,
  },
};
