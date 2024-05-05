import React from "react";
import { User } from "../../Interfaces/User";
import {
  ButtonBase,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useDeleteUserMutation } from "../../api/usersApi";

const UserCard = ({
  user,
  setUserEdit,
  setOpenModal,
}: {
  user: User;
  setUserEdit: (user: User) => void;
  setOpenModal: (open: boolean) => void;
}) => {
  const [deleteUser] = useDeleteUserMutation();
  const handleDeleteUser = (id: number|undefined) => {
    deleteUser(id)
      .unwrap()
      .then((res:any) => {
        console.log(res);
      })
      .catch((err:any) => {
        console.log(err);
      });
  };

  

  return (
    <Card sx={{ maxWidth: 300, minHeight: 300 }}>
      <img src={user.photo} alt="" width={300} height={200} />
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          // alignItems: "center",
        }}
      >
        <Typography gutterBottom variant="h5" component="div">
          {user.name}
        </Typography>

        <Typography my={1} variant="body2" color="text.secondary">
          Weight: {user.weight}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Date Of Birth: {user.dateOfBirth.slice(0, 10)}
        </Typography>
      </CardContent>
      <CardActions>
        <ButtonBase
          onClick={() => handleDeleteUser(user?.id)}
          sx={{
            padding: "10px 15px",
            marginBottom: "1rem",
            borderRadius: "10px",
            border: "1px solid #ccc",
            backgroundColor: "#e92427",
            color: "white",
            textTransform: "capitalize",
          }}
        >
          <Delete
            sx={{
              fontSize: "15px",
              mx: "2px",
            }}
          />
        </ButtonBase>
        <ButtonBase
          onClick={() => {
            setOpenModal(true);
            setUserEdit(user);
          }}
          sx={{
            padding: "10px 15px",
            marginBottom: "1rem",
            borderRadius: "10px",
            border: "1px solid #ccc",
            backgroundColor: "#fca130",
            color: "white",
            textTransform: "capitalize",
          }}
        >
          <Edit
            sx={{
              fontSize: "15px",
              mx: "2px",
            }}
          />
        </ButtonBase>
      </CardActions>
    </Card>
  );
};

export default UserCard;
