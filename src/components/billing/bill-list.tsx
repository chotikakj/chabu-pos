import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Stack } from "@mui/material";
import { Button, Input, Space, Typography, theme } from "antd";

type Props = {
  billList: any;
  setBillList: any;
  totalPrice: any;
  setOpenCreate: any;
};

export default function BillList({
  billList,
  setBillList,
  totalPrice,
  setOpenCreate,
}: Props) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const incrementItems = async (index: number) => {
    let bill: any = [...billList];
    bill[index].amount++;
    setBillList(bill);
  };
  const decrementItems = async (index: number) => {
    let bill: any = [...billList];
    if (bill[index].amount === 1) {
      let newBill: any = [];
      for (let i = 0; i < bill.length; i++) {
        if (i !== index) {
          await newBill.push(bill[i]);
        }
      }
      setBillList(newBill);
      return;
    }
    bill[index].amount--;
    setBillList(bill);
  };

  const cancelBilling = async () => {
    setBillList([]);
  };

  return (
    <>
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
        <Stack
          direction="column"
          justifyContent="space-between"
          sx={{ height: "100%" }}
        >
          <Stack direction="column">
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{
                mx: -1,
                borderBottom: "2px dotted #dcdcdc",
              }}
            >
              <Typography.Title level={3} style={{ marginTop: "-7px" }}>
                รายการที่เลือก
              </Typography.Title>
            </Stack>
            <Stack direction="column" sx={{ mt: 1, mx: -1 }} spacing={1}>
              {billList.length !== 0 &&
                billList.map((items: any, index: number) => {
                  return (
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      key={items.name}
                    >
                      <Stack direction="row">
                        <img
                          src={`/images/menu/${items.name}.webp`}
                          width={32}
                          height={32}
                          style={{ borderRadius: "4px" }}
                        />
                        <Stack direction="column" sx={{ ml: 1, mt: -0.5 }}>
                          <Typography.Text>{items.name}</Typography.Text>
                          <Typography.Text
                            style={{ fontSize: 10, color: "#8e8e8e" }}
                          >
                            ฿{items.pricing}
                          </Typography.Text>
                        </Stack>
                      </Stack>
                      <Stack direction="row" sx={{ mt: 0.5 }}>
                        <Space.Compact style={{ width: "100%" }}>
                          <Button
                            size="small"
                            type="default"
                            onClick={() => decrementItems(index)}
                          >
                            -
                          </Button>
                          <Input
                            size="small"
                            value={items.amount}
                            style={{
                              height: 24,
                              width: 30,
                              textAlign: "center",
                            }}
                          />
                          <Button
                            size="small"
                            type="default"
                            onClick={() => incrementItems(index)}
                          >
                            +
                          </Button>
                        </Space.Compact>
                      </Stack>
                    </Stack>
                  );
                })}
            </Stack>
          </Stack>
          <Stack
            direction="column"
            sx={{
              mt: 1,
              mx: -1,
              borderTop: "2px dotted #dcdcdc",
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{
                background: "#f5f5f5",
                borderRadius: 5,
                width: "100%",
                mt: 1,
                p: 1,
              }}
            >
              <Stack direction="column" sx={{ justifyContent: "center" }}>
                <Typography.Text>รวมทั้งสิ้น</Typography.Text>
              </Stack>
              <Stack direction="column" sx={{ justifyContent: "center" }}>
                <Typography.Text style={{ fontSize: "18px" }}>
                  ฿{totalPrice.toLocaleString()}
                </Typography.Text>
              </Stack>
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{
                width: "100%",
                mt: 1,
                p: 1,
              }}
            >
              <Stack direction="column" sx={{ justifyContent: "center" }}>
                <Button
                  disabled={billList.length === 0}
                  type="primary"
                  size="large"
                  style={{ width: "100%" }}
                  onClick={cancelBilling}
                >
                  <CloseOutlined />
                  ยกเลิก
                </Button>
              </Stack>
              <Stack direction="column" sx={{ justifyContent: "center" }}>
                <Button
                  disabled={billList.length === 0}
                  type="primary"
                  size="large"
                  className="btn-info"
                  style={{ width: "100%" }}
                  onClick={() => setOpenCreate(true)}
                >
                  <CheckOutlined /> บันทึกบิล
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}
