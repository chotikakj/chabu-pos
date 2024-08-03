import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Stack } from "@mui/material";
import { Button, Modal, Typography } from "antd";
import axios from "axios";
import { CREATE_BILL_TRANSACTION } from "../../endpoint";
import { toast } from "react-toastify";

type Props = {
  open: boolean;
  setOpen: any;
  billList: any;
  setBillList: any;
  totalPrice: any;
};

export default function CreateModal({
  open,
  setOpen,
  billList,
  setBillList,
  totalPrice,
}: Props) {
  const onClose = async () => {
    setOpen(false);
  };

  const handleSave = async () => {
    let bill_detail = [];
    for (let item of billList) {
      bill_detail.push({
        bill_detail_item_name: item.name,
        bill_detail_item_type: item.category,
        bill_detail_item_price: item.pricing,
        bill_detail_item_amount: item.amount,
        bill_detail_item_cost: item.cost,
      });
    }

    try {
      await axios
        .post(CREATE_BILL_TRANSACTION, {
          bill_total_price: totalPrice,
          bill_detail,
        })
        .then(({ data }) => {
          if (data.status === "success") {
            setBillList([]);
            onClose();
            toast.success("บันทึกบิลสำเร็จ");
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Modal
        open={open}
        onCancel={onClose}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
        style={{ top: 20, maxWidth: "400px" }}
      >
        <Stack direction="row" sx={{ mt: -3.5 }}>
          <Typography.Title level={3}>บันทึกบิล</Typography.Title>
        </Stack>
        <Stack direction="column" sx={{ p: 0 }} spacing={1}>
          {billList.length !== 0 &&
            billList.map((items: any) => {
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
                        style={{ fontSize: 12, marginTop: 0, color: "#8e8e8e" }}
                      >
                        ฿{items.pricing}
                      </Typography.Text>
                    </Stack>
                  </Stack>
                  <Stack direction="row" sx={{ mt: 0.5 }}>
                    <Typography.Text>
                      ฿{items.pricing * items.amount}
                    </Typography.Text>
                  </Stack>
                </Stack>
              );
            })}
        </Stack>
        <Stack
          direction="column"
          sx={{
            mt: 1,
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
              ml: -1,
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
        </Stack>
        <Stack
          direction="column"
          sx={{
            mt: 1,
            borderTop: "2px dotted #dcdcdc",
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{
              width: "100%",
              mt: 1,
            }}
          >
            <Stack direction="column" sx={{ justifyContent: "center" }}>
              <Button
                disabled={billList.length === 0}
                type="primary"
                size="large"
                style={{ width: "100%" }}
                onClick={onClose}
              >
                <CloseOutlined />
                ยกเลิก
              </Button>
            </Stack>
            <Stack direction="column" sx={{ justifyContent: "center" }}>
              <Button
                disabled={billList.length === 0}
                type="primary"
                className="btn-info"
                size="large"
                style={{ width: "100%" }}
                onClick={handleSave}
              >
                <CheckOutlined /> บันทึกบิล
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Modal>
    </>
  );
}
