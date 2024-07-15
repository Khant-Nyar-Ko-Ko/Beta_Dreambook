import Skeleton from "@mui/material/Skeleton";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

const CardLoading = () => {
  return (
    <Grid container spacing={2} className="bg-white dark:bg-darkMode1">
      {Array.from({ length: 5 }, (_, i) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
          <Box sx={{ width: '100%', marginBottom: 2 }}>
            <Skeleton variant="rectangular" height={150} />
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
}

export default CardLoading;
