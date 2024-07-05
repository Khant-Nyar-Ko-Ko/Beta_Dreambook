import Skeleton from "@mui/material/Skeleton";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

const CardLoading = () => {
  return (
    <Grid container wrap="nowrap" className="bg-white dark:bg-darkMode1">
    {Array.from({ length: 5 }, (_, i) => (
      <Box key={i} sx={{ width: 230, marginRight: 2 }}>
        <Skeleton variant="rectangular" height={150} />
        <Box sx={{ pt: 0.5 }}>
          <Skeleton />
          <Skeleton width="40%" />
          <Skeleton width="60%" />
        </Box>
      </Box>
    ))}
  </Grid>
  )
}

export default CardLoading