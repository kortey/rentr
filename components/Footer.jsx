import React from "react";
import Link from "next/link";
import { Box, Container, Grid, Typography, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import HomeIcon from "@mui/icons-material/Home";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{ bgcolor: "#1F2937", color: "white", pt: 6, pb: 2 }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
              About Us
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              We are dedicated to helping you find your perfect home. Our
              platform connects renters with property owners to make the rental
              process smooth and efficient.
            </Typography>
            <Box>
              <IconButton
                color="inherit"
                aria-label="Facebook"
                component="a"
                href="#"
                target="_blank"
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                color="inherit"
                aria-label="Twitter"
                component="a"
                href="#"
                target="_blank"
              >
                <TwitterIcon />
              </IconButton>
              <IconButton
                color="inherit"
                aria-label="Instagram"
                component="a"
                href="#"
                target="_blank"
              >
                <InstagramIcon />
              </IconButton>
              <IconButton
                color="inherit"
                aria-label="LinkedIn"
                component="a"
                href="#"
                target="_blank"
              >
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
              Quick Links
            </Typography>
            <Link href="/" passHref>
              <Typography
                variant="body2"
                sx={{
                  mb: 1,
                  cursor: "pointer",
                  "&:hover": { color: "#FFA500" },
                }}
              >
                Home
              </Typography>
            </Link>
            <Link href="/about" passHref>
              <Typography
                variant="body2"
                sx={{
                  mb: 1,
                  cursor: "pointer",
                  "&:hover": { color: "#FFA500" },
                }}
              >
                About
              </Typography>
            </Link>
            <Link href="/contact" passHref>
              <Typography
                variant="body2"
                sx={{
                  mb: 1,
                  cursor: "pointer",
                  "&:hover": { color: "#FFA500" },
                }}
              >
                Contact
              </Typography>
            </Link>
            <Link href="/terms" passHref>
              <Typography
                variant="body2"
                sx={{
                  mb: 1,
                  cursor: "pointer",
                  "&:hover": { color: "#FFA500" },
                }}
              >
                Terms of Service
              </Typography>
            </Link>
            <Link href="/privacy" passHref>
              <Typography
                variant="body2"
                sx={{
                  mb: 1,
                  cursor: "pointer",
                  "&:hover": { color: "#FFA500" },
                }}
              >
                Privacy Policy
              </Typography>
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
              Contact Us
            </Typography>
            <Box display="flex" alignItems="center" mb={1}>
              <HomeIcon sx={{ mr: 1 }} />
              <Typography variant="body2">
                123 Main Street, Akosombo, Ghana
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={1}>
              <EmailIcon sx={{ mr: 1 }} />
              <Typography variant="body2">info@rentr.com</Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={1}>
              <PhoneIcon sx={{ mr: 1 }} />
              <Typography variant="body2">+233 24 567 8901</Typography>
            </Box>
          </Grid>
        </Grid>
        <Box mt={5} borderTop={1} borderColor="rgba(255,255,255,0.1)" pt={2}>
          <Typography variant="body2" align="center" sx={{ opacity: 0.7 }}>
            © {new Date().getFullYear()} Rentr. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
