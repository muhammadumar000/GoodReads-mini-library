import React from "react";

// mui imports
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";


const SingleBookData = ({ bookData }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ height: "100vh", width: "100%", bgcolor: "#52ab98" }}
    >
      <Card
        sx={{
          marginInline: "1rem",
          maxWidth: 800,
          height: "40rem",
          overflowY: "auto",
          padding: "1rem",
          bgcolor: "#c8d8e4",
        }}
      >
        <CardActionArea
          sx={{
            flexDirection: { xs: "column", sm: "row" },
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <CardMedia
            component="img"
            image={bookData.image_url}
            alt="green iguana"
            sx={{ padding: "3rem", width: "350px", height: "500px" }}
          />
          <CardContent>
            <Typography
              color="#2b6777"
              gutterBottom
              variant="h5"
              align="center"
            >
              {bookData.title}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Author: {bookData.author.name}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Publication Year: {bookData.original_publication_year}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Ratings: {bookData.ratings_count}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Reviews: {bookData.text_reviews_count}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
};

export default SingleBookData;
