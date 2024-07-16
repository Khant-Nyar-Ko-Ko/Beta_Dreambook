import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

const CategoryLoading = () => {
  return (
    <>
      <div className=" md:ms-[150px] hidden md:block">
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
        {Array.from({ length: 1 }, (_, i) => (
          <div key={i}>
            <Box sx={{ width: 350, marginRight: 2, marginBottom: 5 }}>
              <Skeleton variant="rectangular" height={50} />
            </Box>
          </div>
        ))}
      </Grid>
    </div>
    <div className="block md:hidden">
      <Grid container wrap="nowrap">
        {Array.from({ length: 1 }, (_, i) => (
          <div key={i}>
            <Box sx={{ width: 350, marginRight: 2, marginBottom: 5 }}>
              <Skeleton variant="rectangular" height={50} />
            </Box>
          </div>
        ))}
      </Grid>
      <Grid container wrap="nowrap">
        {Array.from({ length: 1 }, (_, i) => (
          <div key={i}>
            <Box sx={{ width: 350, marginRight: 2, marginBottom: 5 }}>
              <Skeleton variant="rectangular" height={50} />
            </Box>
          </div>
        ))}
      </Grid>
    </div>
    </>
    
  );
};

export default CategoryLoading;
  //  <Grid container spacing={2}>
  //       {Array.from({ length: 6 }, (_, i) => (
  //         <Grid item xs={12} sm={6} md={4} key={i}>
  //           <Box sx={{ width: '100%', marginBottom: 2 }}>
  //             <Skeleton variant="rectangular" height={50} />
  //           </Box>
  //         </Grid>
  //       ))}
  //     </Grid>
