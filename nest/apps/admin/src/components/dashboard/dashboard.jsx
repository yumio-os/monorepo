import React from 'react';

import { Box, Text } from '@adminjs/design-system';

const Dashboard = ({ usersCount, postsCount }) => (
  <Box variant="grey">
    <Box variant="white">
      <Text as="h1">Dashboard</Text>
      <Text>Total Users: {usersCount}</Text>
    </Box>
  </Box>
);

export default Dashboard;
