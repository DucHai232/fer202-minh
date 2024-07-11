import React, { useEffect, useState } from "react";
import Header from "./Header";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { baseUrl } from "../utils/BaseUrl";
import { useNavigate } from "react-router-dom";
const BaseAPI = baseUrl();
const Home = () => {
  const [dataSource, setDataSource] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const response = await BaseAPI.get("/staffManagement");
      setDataSource(response.data);
    };
    fetchData();
  }, []);
  return (
    <>
      <Header />
      <Container style={{ marginTop: "50px", marginBottom: "50px" }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {dataSource.map((el, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <Card sx={{ maxWidth: 400 }}>
                <CardMedia
                  sx={{ height: 300 }}
                  image={el.avatar}
                  title={el.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {el.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {el.address} - {el.age} age
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    onClick={() => navigate(`detail/${el.id}`)}
                  >
                    Detail
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Home;
