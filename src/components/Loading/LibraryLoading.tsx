import { Box, Grid, Skeleton } from "@mui/material";

const LibraryLoading = () => {
  return (
    <Grid container spacing={2} className="bg-white dark:bg-darkMode1">
      {Array.from({ length: 12 }).map((_, i) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
          <Box sx={{ width: '100%', marginBottom: 2 }}>
            <Skeleton variant="rectangular" height={100} />
            <Box sx={{ pt: 0.5 }}>
              <Skeleton />
              <Skeleton width="40%" />
              <Skeleton width="60%" />
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default LibraryLoading;
