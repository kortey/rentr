import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { Home, CheckCircle, PendingActions, Visibility } from '@mui/icons-material';

const DashboardStats = ({ properties }) => {
  const stats = [
    {
      title: 'Total Properties',
      value: properties.length,
      icon: <Home className="text-blue-600" />,
    },
    {
      title: 'Available',
      value: properties.filter(p => p.status === 'available').length,
      icon: <CheckCircle className="text-green-600" />,
    },
    {
      title: 'Pending',
      value: properties.filter(p => p.status === 'pending').length,
      icon: <PendingActions className="text-orange-600" />,
    },
    {
      title: 'Total Views',
      value: '1.2K',
      icon: <Visibility className="text-purple-600" />,
    },
  ];

  return (
    <Grid container spacing={3}>
      {stats.map((stat, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Paper className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <Typography variant="body2" color="text.secondary">
                  {stat.title}
                </Typography>
                <Typography variant="h5" className="font-bold">
                  {stat.value}
                </Typography>
              </div>
              {stat.icon}
            </div>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default DashboardStats; 