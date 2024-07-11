import React, { useEffect, useState } from "react";
import Header from "./Header";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { baseUrl } from "../utils/BaseUrl";

const BaseAPI = baseUrl();
const Detail = () => {
  const { id } = useParams();
  const [section, setSection] = useState({});
  useEffect(() => {
    const fetchDataDetail = async () => {
      const response = await BaseAPI.get(`/staffManagement/${id}`);
      setSection(response.data);
    };
    fetchDataDetail();
  }, []);
  return (
    <>
      <Header />
      <Container style={{ marginTop: "50px", marginBottom: "50px" }}>
        <Card sx={{ maxWidth: 1200 }}>
          <CardMedia
            sx={{ height: 700 }}
            image={section?.avatar}
            title={section?.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {section?.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {section?.address} - {section?.age} age
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {section?.createdAt}
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default Detail;
