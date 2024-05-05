import {
  Box,
  ButtonBase,
  CircularProgress,
  Grid,
  Typography,
  Modal,
} from "@mui/material";
import { useGetUsersQuery } from "../api/usersApi";
import UserCard from "../components/UserCard/UserCard";
import { User } from "../Interfaces/User";
import { Add, ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { useEffect, useState } from "react";
import UserForm from "../components/UserForm/UserForm";
import { useSearchParams } from "react-router-dom";

const Users = () => {
  const [userEdit, setUserEdit] = useState<User | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [params, setSearchParams] = useSearchParams();
  const { data, isLoading } = useGetUsersQuery(
    params.toString() || "pageSize=10&pageNumber=1"
  );

  // methods
  const handleCloseModal = () => {
    setOpenModal(false);
    setUserEdit(null);
  };

  const handleNextPagination = () => {
    setPageNumber((prev) => prev + 1);
  };
  const handlePrevPagination = () => {
    setPageNumber((prev) => prev - 1);
  };
  useEffect(() => {
    params.set("page", pageNumber.toString());
    params.set("pageSize", "10");
    setSearchParams(params);
  }, [pageNumber]);

  const totalPages = Math.ceil(data?.length ? data.length / 10 : 0);
  return (
    <Box my={2}>
      {isLoading && (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      )}
      {/* add products */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <ButtonBase
          onClick={() => setOpenModal(true)}
          sx={{
            my: 2,
            padding: "10px 10px",
            marginBottom: "1rem",
            borderRadius: "10px",
            border: "1px solid #ccc",
            backgroundColor: "#D20943",
            color: "white",
            fontWeight: "600",
            fontSize: "15px",
            textTransform: "capitalize",
          }}
        >
          <Add />
          <Typography>Add User</Typography>
        </ButtonBase>
      </Box>

      {data && data?.length > 0 && (
        <>
          <Grid container spacing={2}>
            {data?.map((user: User) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={user.id}>
                <UserCard
                  user={user}
                  setUserEdit={setUserEdit}
                  setOpenModal={setOpenModal}
                />
              </Grid>
            ))}
          </Grid>

          {totalPages > 1 && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "1rem",
                my: 2,
              }}
            >
              <ButtonBase
                onClick={handlePrevPagination}
                disabled={pageNumber <= 1}
              >
                <ArrowBackIos
                  sx={{
                    color: pageNumber <= 1 ? "#ccc" : "#000",
                  }}
                />
              </ButtonBase>
              <ButtonBase
                onClick={handleNextPagination}
                disabled={pageNumber >= totalPages}
              >
                <ArrowForwardIos
                  sx={{
                    color: pageNumber >= totalPages ? "#ccc" : "#000",
                  }}
                />
              </ButtonBase>
            </Box>
          )}
        </>
      )}

      {data && data?.length === 0 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Not found User
        </Box>
      )}

      {/* Modal for add or edit user */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <UserForm userEdit={userEdit} handleCloseModal={handleCloseModal} />
      </Modal>
    </Box>
  );
};

export default Users;
