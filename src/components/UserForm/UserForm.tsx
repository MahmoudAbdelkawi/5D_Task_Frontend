import { Close, DateRange, Person, Scale } from "@mui/icons-material";
import {
  Box,
  Container,
  Typography,
  ButtonBase,
  CardMedia,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useRef, useState } from "react";
import * as Yup from "yup";
import { User } from "../../Interfaces/User";
import InputForm from "../InputBase/InputForm";
import { useAddUserMutation, useUpdateUserMutation } from "../../api/usersApi";
import axios from "axios";
import { BASE_URL } from "../../Config/config";

const UserForm = ({
  userEdit,
  handleCloseModal,
}: {
  userEdit: User | null;
  handleCloseModal: () => void;
}) => {
  const [addUser] = useAddUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [img, setImg] = useState<string | null>(null);
  const [formatImg, setFormatImg] = useState<FormData | null>(null);
  const formik = useFormik({
    initialValues: {
      photo: userEdit?.photo || null,
      name: userEdit?.name || "",
      dateOfBirth: userEdit?.dateOfBirth || "",
      weight: userEdit?.weight || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      dateOfBirth: Yup.string().required("Required"),
      weight: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      userEdit === null
        ? axios({
          method: "post",
          url: `${BASE_URL}/Users`,
          data: { ...values },
          headers: { "Content-Type": "multipart/form-data" },
        })
            .then((res) => {
              handleCloseModal();

              console.log(res.data);
            })
            .catch((err) => {              
              console.log(err);
            })
        : /*
             addUser(values).unwrap().then((res) => {
              console.log(res);
              handleCloseModal();
            }).catch((err) => {
              console.log(err);
            });
            
            */
          // updateUser({ id: userEdit.id, ...values })
          //   .unwrap()
          //   .then((res) => {
          //     console.log(res);
          //     handleCloseModal();
          //   })
          //   .catch((err) => {
          //     console.log(err);
          //   });

          // replace with axios
          axios({
            method: "put",
            url: `${BASE_URL}/Users/${userEdit.id}`,
            data: { ...values },
            headers: { "Content-Type": "multipart/form-data" },
          })
            .then((res) => {
              handleCloseModal();
              console.log(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = (e.target as HTMLInputElement).files;
    if (!files) return;
    const file = files[0];

    const formData = new FormData();
    formData.append("image", file);
    console.log(formData.get("image"));
    console.log(formData);
    formik.setFieldValue("photo", file);
    setImg(URL.createObjectURL(file));
    setFormatImg(formData);
  };

  const UploadImage = () => {
    // Trigger click event of the file input element
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Box>
      <Container
        sx={{
          backgroundColor: "#f9f9f9",
          padding: "15px",
          borderRadius: "10px",
          height: "100%",
          minWidth: "300px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <ButtonBase
            onClick={handleCloseModal}
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
            <Close />
          </ButtonBase>
        </Box>
        <Box>
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            {userEdit ? "Edit User" : "Add User"}
          </Typography>
        </Box>

        {/* form */}
        <Box
          textAlign={"center"}
          sx={{
            height: "600px",
            padding: { xs: 7, sm: 5 },
            overflowX: "hidden",
            overflowY: "scroll",
            "::webkit-scrollbar": {
              display: "none",
            },

            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
        >
          <form onSubmit={formik.handleSubmit}>
            {/* photo */}
            <Box
              sx={{
                my: 2,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                ref={fileInputRef}
                onChange={handleImageChange}
              />
              <Box
                sx={{
                  width: { xs: "100%", md: "60%" },
                  height: 200,
                  border:
                    img || formik.values.photo
                      ? "none"
                      : formik.errors.photo && formik.touched.photo
                      ? "1px dashed red"
                      : "1px dashed #ccc",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={UploadImage}
              >
                {userEdit && !img ? (
                  <CardMedia
                    component="img"
                    image={userEdit.photo}
                    sx={{ width: { xs: "100%", sm: "50%" }, height: "100%" }}
                  />
                ) : img ? (
                  <CardMedia
                    component="img"
                    image={img}
                    sx={{
                      width: { xs: "100%", sm: "50%" },
                      height: "100%",
                      borderRadius: "20%",
                    }}
                  />
                ) : (
                  <Typography variant="caption">
                    {formik.values.photo ? "User Photo" : "Upload User Photo"}
                  </Typography>
                )}
              </Box>
            </Box>

            {/* name */}
            <Box>
              <InputForm
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Name"
                error={formik.touched.name && Boolean(formik.errors.name)}
                Icon={<Person />}
              />
              {formik.touched.name && formik.errors.name && (
                <Typography variant="caption" color="red">
                  {formik.errors.name}
                </Typography>
              )}
            </Box>
            {/* Date of birth */}
            <Box>
              <InputForm
                name="dateOfBirth"
                value={formik.values.dateOfBirth}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Date of Birth"
                error={
                  formik.touched.dateOfBirth &&
                  Boolean(formik.errors.dateOfBirth)
                }
                Icon={<DateRange />}
              />
              {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
                <Typography variant="caption" color="red">
                  {formik.errors.dateOfBirth}
                </Typography>
              )}
            </Box>

            {/* weight */}
            <Box>
              <InputForm
                name="weight"
                value={formik.values.weight}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Weight"
                error={formik.touched.weight && Boolean(formik.errors.weight)}
                Icon={<Scale />}
              />
              {formik.touched.weight && formik.errors.weight && (
                <Typography variant="caption" color="red">
                  {formik.errors.weight}
                </Typography>
              )}
            </Box>

            <ButtonBase
              type="submit"
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
              <Typography>{userEdit ? "Edit User" : "Add User"}</Typography>
            </ButtonBase>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default UserForm;
