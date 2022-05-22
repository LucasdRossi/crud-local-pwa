import { createContext, useContext, useReducer, useState } from "react";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

function formReducer(state, action) {
  switch (action.type) {
    case "CHANGE_USERNAME":
      return {
        ...state,
        incomplete: !action.payload || !state.password,
        username: action.payload,
        error: "",
      };
    case "CHANGE_PASSWORD":
      return {
        ...state,
        incomplete: !action.payload || !state.username,
        password: action.payload,
        error: "",
      };
    case "RESET":
      return { ...initialState, ...action.payload };
    default:
      throw new Error();
  }
}

const initialState = {
  username: "",
  password: "",
  error: "",
  incomplete: true,
};

export default function AuthContextProvider(props) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [state, dispatch] = useReducer(formReducer, initialState);
  const navigate = useNavigate();

  const attemptLogin = () => setIsModalOpen(true);

  const logout = () => {
    setIsAuthenticated(false);
    navigate("/");
  };

  const handleCloseLoginModal = () => {
    setIsModalOpen(false);
    dispatch({
      type: "RESET",
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (state.username === "batata" && state.password === "batata123") {
      setIsAuthenticated(true);
      handleCloseLoginModal();
    } else {
      dispatch({
        type: "RESET",
        payload: {
          error: "Login inválido",
        },
      });
    }
  };

  const handleModalInputChange = (event) => {
    dispatch({
      type: `CHANGE_${event.target.name}`,
      payload: event.target.value,
    });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, attemptLogin, logout }}>
      {props.children}
      <Modal open={isModalOpen} onClose={handleCloseLoginModal}>
        <Box sx={modalBoxStyle}>
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                mb: 1,
              }}
            >
              <TextField
                label="Usuário"
                name="USERNAME"
                variant="outlined"
                fullWidth
                required
                onChange={handleModalInputChange}
                value={state.username}
                error={!!state.error}
                sx={{
                  mb: 2,
                }}
              />
              <TextField
                label="Senha"
                variant="outlined"
                required
                onChange={handleModalInputChange}
                value={state.password}
                error={!!state.error}
                fullWidth
                name="PASSWORD"
                type="password"
              />
            </Box>
            {!!state.error && (
              <Typography color="red" variant="subtitle1">
                {state.error}
              </Typography>
            )}
            <Box
              sx={{
                mt: 2,
                display: "flex",
                justifyContent: "space-between",
                gap: 1,
              }}
            >
              <Button
                variant="outlined"
                fullWidth
                onClick={handleCloseLoginModal}
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                type="submit"
                fullWidth
                disabled={state.incomplete}
              >
                Entrar
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </AuthContext.Provider>
  );
}

const modalBoxStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  maxWidth: "80vw",
  borderRadius: 1,
  bgcolor: "background.paper",
  p: 4,
};

export const useAuthContext = () => useContext(AuthContext);
