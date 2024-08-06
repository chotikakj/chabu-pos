import { Stack } from "@mui/material";
import { Button, DatePicker, Table, Typography, theme } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useEffect, useState } from "react";
import { BILL_DETAIL, BILL_TRANSACTION } from "../endpoint";
import { FundViewOutlined } from "@ant-design/icons";
import BillDetail from "../components/bill-transaction/bill-detail";

dayjs.extend(customParseFormat);
const dateFormat = "DD/MM/YYYY";

export default function BillTransaction() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());
  const [bill, setBill] = useState([]);
  const [openDetail, setOpenDetail] = useState(false);
  const [billDetail, setBillDetail] = useState([]);

  const fetchData = async () => {
    try {
      const { data } = await axios.post(BILL_TRANSACTION, {
        start_date: dayjs(startDate).startOf("date").toDate(),
        end_date: dayjs(endDate).endOf("date").toDate(),
      });
      if (data.status === "success") {
        setBill(data.result);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleViewBillDetail = async (record: any) => {
    setOpenDetail(true);
    try {
      const { data } = await axios.get(BILL_DETAIL + record["_id"]);
      if (data.status === "success") {
        setBillDetail(data.result);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [startDate, endDate]);
  return (
    <div
      style={{
        padding: 24,
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
      }}
    >
      <Stack direction="column" sx={{ mt: -4 }}>
        <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
          <Stack direction="column">
            <Typography.Title level={3}>ประวัติการขาย</Typography.Title>
            <Typography.Text style={{ marginTop: "-15px", color: "#8e8e8e" }}>
              เรียกดูประวัติการขายของร้าน
            </Typography.Text>
          </Stack>
          <Stack direction="row" sx={{ mt: 3.5 }}>
            <DatePicker.RangePicker
              size="small"
              style={{ height: "35px" }}
              onChange={(value: any) => {
                setStartDate(dayjs(value[0].$d));
                setEndDate(dayjs(value[1].$d));
              }}
              value={[startDate, endDate]}
              format={dateFormat}
            />
          </Stack>
        </Stack>
        <Table
          dataSource={bill}
          size="small"
          columns={[
            {
              title: "ลำดับ",
              dataIndex: "",
              render: (_val, _record, index) => {
                return <>{index + 1}</>;
              },
            },
            {
              title: "เวลา",
              dataIndex: "created_at",
              render: (value) => {
                return <>{dayjs(value).format("DD/MM/YYYY HH:mm น.")}</>;
              },
            },
            {
              title: "ยอดบิล",
              dataIndex: "bill_total_price",
              render: (value) => {
                return <>{value.toLocaleString()} บาท</>;
              },
            },
            {
              title: "action",
              dataIndex: "",
              render: (_, record) => {
                return (
                  <Stack direction="row">
                    <Button
                      type="primary"
                      size="small"
                      onClick={() => handleViewBillDetail(record)}
                    >
                      <FundViewOutlined />
                      ดูข้อมูล
                    </Button>
                  </Stack>
                );
              },
            },
          ]}
        />
      </Stack>
      <BillDetail
        open={openDetail}
        setOpen={setOpenDetail}
        billList={billDetail}
      />
    </div>
  );
}
