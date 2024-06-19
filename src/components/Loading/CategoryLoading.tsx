import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

const CategoryLoading = () => {
  return (
    <div className=" ms-[150px] ">
      <Grid container wrap="nowrap">
        {Array.from({ length: 3 }, (_, i) => (
          <div key={i}>
            <Box sx={{ width: 350, marginRight: 2, marginBottom: 5 }}>
              <Skeleton variant="rectangular" height={50} />
            </Box>
          </div>
        ))}
      </Grid>
      <Grid container wrap="nowrap">
        {Array.from({ length: 3 }, (_, i) => (
          <div key={i}>
            <Box sx={{ width: 350, marginRight: 2, marginBottom: 5 }}>
              <Skeleton variant="rectangular" height={50} />
            </Box>
          </div>
        ))}
      </Grid>
    </div>
  );
};

export default CategoryLoading;
