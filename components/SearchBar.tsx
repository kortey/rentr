"use client";
import React, { useState, KeyboardEvent } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Paper, 
  InputBase, 
  IconButton, 
  Button,
  Popover,
  TextField,
  Box,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

const SearchBar = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSearchClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSearch = () => {
    if (searchTerm.trim() || location.trim()) {
      const searchParams = new URLSearchParams();
      if (searchTerm) searchParams.set('type', searchTerm);
      if (location) searchParams.set('location', location);
      
      router.push(`/search?${searchParams.toString()}`);
      handleClose();
    }
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? 'search-popover' : undefined;

  return (
    <div className={`mx-auto ${isMobile ? 'w-full px-4' : 'max-w-2xl'}`}>
      <Paper
        component="div"
        onClick={handleSearchClick}
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          cursor: 'pointer',
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 2 }}
          placeholder="Search for apartments..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        PaperProps={{
          sx: {
            width: isMobile ? 'calc(100% - 32px)' : '400px',
            mt: 1,
            p: 2,
          },
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center', justifyContent:'center' }}>
          <TextField
            fullWidth
            label="Enter location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            variant="outlined"
            onKeyPress={handleKeyPress}
            className="mb-4"
          />
          <Button 
            onClick={handleSearch}
            className="bg-blue-600 text-white hover:bg-blue-700 w-[200px]"
          >
            <SearchIcon className="" />
            Search
          </Button>
        </Box>
      </Popover>
    </div>
  );
};

export default SearchBar;