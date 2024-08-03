import { Box, LinearProgress } from "@mui/material";

type Props = {
  open: boolean;
};

function Loading({ open }: Props) {
  return (
    open && (
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.15)",
          zIndex: 99999,
          width: "100vw",
          height: "200%"
        }}
      >
        <Box sx={{ width: "100%" }}>
          <LinearProgress sx={{ height: "5px" }} color="error" />
        </Box>
      </div>
    )
  );
}

export default Loading;
