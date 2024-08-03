import { Grid, Stack } from "@mui/material";
import { Card, Segmented, Typography, theme } from "antd";
import { useEffect, useState } from "react";
import { mockup } from "../../menu-list";

type Props = {
  addItemToBill: any;
};

export default function MenuList({ addItemToBill }: Props) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [segment, setSegment] = useState("ของสด");
  const [menuList, setMenuList] = useState([]);
  const fetchData = async (filter: any) => {
    let data: any = [];
    for (let item of mockup) {
      if (item.category === filter) {
        data.push(item);
      }
    }
    setSegment(filter);
    setMenuList(data);
  };

  useEffect(() => {
    fetchData(segment);
  }, []);
  return (
    <Stack
      direction="column"
      justifyContent="start"
      sx={{
        padding: 3,
        background: colorBgContainer,
        borderRadius: 2,
        height: "95vh",
      }}
    >
      <Typography.Title level={3} style={{ marginTop: "-7px" }}>
        รายการอาหาร
      </Typography.Title>
      <Typography.Text style={{ marginTop: "-15px", color: "#8e8e8e" }}>
        เลือกรายการอาหารที่จะสร้างบิล
      </Typography.Text>
      <Stack direction="row" sx={{ mt: "5px", mb: 1 }}>
        <Segmented
          value={segment}
          options={["ของสด", "ผัก", "ลูกชิ้นและไส้กรอก", "อื่นๆ", "น้ำซุป"]}
          onChange={(value: any) => {
            fetchData(value);
          }}
        />
      </Stack>
      <Grid container spacing={1}>
        {menuList.map((items: any) => {
          return (
            <Grid item xs={6} sm={3} lg={2} key={items.name}>
              <Card
                onClick={() => addItemToBill(items)}
                style={{
                  borderRadius: 7,
                  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                  padding: 1,
                  cursor: "pointer",
                }}
                cover={
                  <img
                  src={`/images/menu/${items.name}.webp`}
                    style={{
                      borderRadius: "5px 5px 0px 0px",
                    }}
                  />
                }
              >
                <Stack
                  direction="column"
                  sx={{
                    mt: -2,
                    ml: -2,
                    mb: -3,
                  }}
                >
                  <Stack sx={{ fontSize: { xs: "12px", sm: "14px" } }}>
                    {items.name}
                  </Stack>
                  <Typography.Text
                    style={{ fontSize: "9px", color: "#8e8e8e" }}
                  >
                    ฿{items.pricing}
                  </Typography.Text>
                </Stack>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Stack>
  );
}
