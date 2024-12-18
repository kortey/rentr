"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import SearchBar from "./SearchBar";

const menuItems = [
  { text: "Single Room", href: "/search?q=single%20room" },
  { text: "Chember & Hall", href: "/search?q=chamber%20and%20hall" },
  { text: "Self contain", href: "/search?q=self%20contain" },
  { text: "bongallow", href: "/search?q=bungalow" },
];

export default function Navbar({ session }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const theme = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const supabase = createClientComponentClient();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > window.innerHeight;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleAddApartmentClick = () => {
    if (!session) {
      router.push("/sign-in");
    } else {
      router.push("/agent/dashboard");
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  const textColor = scrolled ? "#333333" : "inherit";

  const drawer = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {menuItems.map((item) => (
          <ListItem button key={item.text} component={Link} href={item.href}>
            <ListItemText primary={item.text} style={{ color: textColor }} />
          </ListItem>
        ))}
        {isMobile && (
          <>
            <ListItem>
              <Button
                variant="contained"
                onClick={handleAddApartmentClick}
                sx={{
                  width: "100%",
                  backgroundColor: "#FFA500",
                  "&:hover": {
                    backgroundColor: "#FF8C00",
                  },
                }}
              >
                {session ? "Dashboard" : "Add an Apartment"}
              </Button>
            </ListItem>
            <ListItem>
              {session ? (
                <Button
                  onClick={handleSignOut}
                  variant="contained"
                  sx={{
                    width: "100%",
                    backgroundColor: "#FFA500",
                    "&:hover": {
                      backgroundColor: "#FF8C00",
                    },
                  }}
                >
                  Sign Out
                </Button>
              ) : (
                <Button
                  component={Link}
                  href="/sign-in"
                  variant="contained"
                  sx={{
                    width: "100%",
                    backgroundColor: "#FFA500",
                    "&:hover": {
                      backgroundColor: "#FF8C00",
                    },
                  }}
                >
                  Sign In
                </Button>
              )}
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <AppBar
      position="fixed"
      sx={{
        background: pathname !== "/" ? "white" : "transparent",
        boxShadow: scrolled ? "0px 2px 4px -1px rgba(0,0,0,0.2)" : "none",
        transition: "background-color 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Link href="/" sx={{ display: "flex", alignItems: "center" }}>
          <Image
            src="/images/logo.png"
            alt="logo"
            width={100}
            height={100}
            className="w-[100px] h-[100px] object-contain"
          />
        </Link>

        <Box sx={{ flex: 1 / 3, mx: 4 }}>
          <SearchBar />
        </Box>

        {!isMobile && (
          <Box sx={{ display: "flex", justifyContent: "center", flex: 1 }}>
            {menuItems.map((item) => (
              <Button
                key={item.text}
                component={Link}
                href={item.href}
                sx={{
                  color: textColor,
                  transition: "color 0.3s ease",
                  mx: 1,
                }}
              >
                <Typography
                  sx={{ color: pathname !== "/" ? "#000" : textColor }}
                >
                  {item.text}
                </Typography>
              </Button>
            ))}
          </Box>
        )}

        <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
          {!isMobile && (
            <Button
              onClick={handleAddApartmentClick}
              sx={{
                backgroundColor: "#FFA500",
                color: "white",
                "&:hover": {
                  backgroundColor: "#FF8C00",
                },
                mr: isMobile ? 1 : 0,
              }}
            >
              {session ? "Dashboard" : "Add an Apartment"}
            </Button>
          )}
          {!isMobile && session ? (
            <button
              onClick={handleSignOut}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Sign Out
            </button>
          ) : !isMobile && !session ? (
            <Link
              href="/sign-in"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Sign In
            </Link>
          ) : (
            ""
          )}
          {isMobile && (
            <IconButton
              size="large"
              edge="start"
              color="black"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon style={{ color: textColor }} />
            </IconButton>
          )}
        </Box>
        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
          {drawer}
        </Drawer>
      </Toolbar>
    </AppBar>
  );
}
