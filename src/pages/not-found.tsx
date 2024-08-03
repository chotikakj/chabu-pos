import { Stack } from "@mui/material";
import { Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Stack
      sx={{
        width: "100%",
        height: "100vh",
        justifyContent: "center",
        background: "#FFF",
      }}
    >
      <Stack
        sx={{ width: "100%", flexDirection: "row", justifyContent: "center" }}
      >
        <Stack direction="column" sx={{ width: "40%" }}>
          <Typography.Text style={{ textAlign: "center", fontSize: "35px" }}>
            ไม่พบหน้าที่คุณค้นหา
          </Typography.Text>
          <Stack sx={{ flexDirection: "row", justifyContent: "center" }}>
            <Button type="primary" style={{ width: "40%" }} onClick={() => navigate("/")}>
              หน้าหลัก
            </Button>
          </Stack>
          <img src="/images/not-found.jpg" width={"100%"} height="auto" />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default NotFound;
