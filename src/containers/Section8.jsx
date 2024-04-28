import { Box, Container, Stack, Typography,Grid } from "@mui/material";
import React from "react";
import OutlinedButton from "../components/Buttons/OutlinedButton";
import Title from "../components/Title";
import { section8Content } from "../utils/content";

const { title, subtitle, caption, GroupCatsImage,Socials } = section8Content;

const Section8 = () => {
  return (
    <Container id={'join-us'}
      maxWidth="md"
      sx={{ mt: { xs: 10, md: 20, lg: 25 }, textAlign: "center" }}
    >
      <Stack alignItems="center">
        <Title variant={{ xs: "h3", md: "h2" }} sx={{ mb: 2 }}>
          {title}
        </Title>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: { xs: 5, md: 8 } }}
        >
          {subtitle}
        </Typography>

        <Box sx={{ px: { xs: 2, md: 5, lg: 7 } }}>
          <img
            src={GroupCatsImage}
            style={{ width: "100%", objectFit: "contain" }}
          />
        </Box>
 <Grid
          container
          spacing={3}
          justifyContent="center"
          sx={{ px: { xs: 0, md: 5, lg: 8 } }}
        >
          {Socials.map(({ name, image }) => (
            <Grid
              item
              xs={6}
              md={3}
              key={name}
              sx={(theme) => ({
                cursor: "pointer",
                "& :hover": {
                  "& img": {
                    transform: "scale(1.2)",
                    transition: "transform .3s",
                  },
                  "& p": { color: "text.primary", transition: "all .3s ease-in" },
                },
              })}
            >
              <Stack alignItems="center">
                <img
                  src={image}
                  style={{ width: "120px", objectFIt: "contain" }}
                />
        
                <Typography variant="body2" color="text.secondary">
                  {name}
                </Typography>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Stack>
      
    </Container>
  );
};

export default Section8;
