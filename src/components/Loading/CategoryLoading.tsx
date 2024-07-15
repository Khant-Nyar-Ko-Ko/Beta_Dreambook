import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

const CategoryLoading = () => {
  return (
    <div className="ms-[150px] md:ms-0">
      <Grid container spacing={2}>
        {Array.from({ length: 6 }, (_, i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <Box sx={{ width: '100%', marginBottom: 2 }}>
              <Skeleton variant="rectangular" height={50} />
            </Box>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default CategoryLoading;
