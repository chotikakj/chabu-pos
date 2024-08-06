import { Stack } from "@mui/material";
import { Drawer, Typography } from "antd";

type Props = {
  open: boolean;
  setOpen: any;
  billList: any;
};

export default function BillDetail({ open, setOpen, billList }: Props) {
  const onClose = async () => {
    setOpen(false);
  };
  return (
    <Drawer open={open} onClose={onClose} title={"รายละเอียด"}>
      <Stack direction="column" spacing={1}>
        {billList.length !== 0 &&
          billList.map((items: any) => {
            return (
              <Stack
                direction="row"
                justifyContent="space-between"
                key={items.bill_detail_item_name}
              >
                <Stack direction="row">
                  <img
                    src={`/images/menu/${items.bill_detail_item_name}.webp`}
                    width={32}
                    height={32}
                    style={{ borderRadius: "4px" }}
                  />
                  <Stack direction="column" sx={{ ml: 1, mt: -0.5 }}>
                    <Typography.Text>
                      {items.bill_detail_item_name}
                    </Typography.Text>
                    <Typography.Text
                      style={{ fontSize: 12, marginTop: 0, color: "#8e8e8e" }}
                    >
                      ฿{items.bill_detail_item_price}
                    </Typography.Text>
                  </Stack>
                </Stack>
                <Stack direction="row" sx={{ mt: 0.5 }}>
                  <Typography.Text>
                    ฿
                    {items.bill_detail_item_price *
                      items.bill_detail_item_amount}
                  </Typography.Text>
                </Stack>
              </Stack>
            );
          })}
      </Stack>
    </Drawer>
  );
}
