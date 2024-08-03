import { Grid, Stack } from "@mui/material";
import { DatePicker, Divider, Typography, theme } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import customParseFormat from "dayjs/plugin/customParseFormat";
import axios from "axios";
import { REPORT_HOME } from "../endpoint";

dayjs.extend(customParseFormat);
const dateFormat = "DD/MM/YYYY";

export default function Home() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());
  const [totalPrice, setTotalPrice] = useState(0);
  const [cost, setCost] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);
  const [orderAmount, setOrderAmount] = useState(0);
  const [summary, setSummary] = useState(0);
  const [bestSell, setBestSell] = useState([]);
  const [chartData, setChartData] = useState([
    { label: "11:00", value: 0, pricing: 0 },
    { label: "12:00", value: 0, pricing: 0 },
    { label: "13:00", value: 0, pricing: 0 },
    { label: "14:00", value: 0, pricing: 0 },
    { label: "15:00", value: 0, pricing: 0 },
    { label: "16:00", value: 0, pricing: 0 },
    { label: "17:00", value: 0, pricing: 0 },
    { label: "18:00", value: 0, pricing: 0 },
    { label: "19:00", value: 0, pricing: 0 },
    { label: "20:00", value: 0, pricing: 0 },
    { label: "21:00", value: 0, pricing: 0 },
    { label: "22:00", value: 0, pricing: 0 },
  ]);

  const fetchData = async () => {
    try {
      await axios
        .post(REPORT_HOME, {
          start_date: dayjs(startDate).startOf("date").toDate(),
          end_date: dayjs(endDate).endOf("date").toDate(),
        })
        .then(async ({ data }: any) => {
          if (data.status === "success") {
            let total_price_cal = 0;
            let cost_cal = 0;
            for (let item of data.result.bill) {
              total_price_cal += item.bill_total_price;
            }
            for (let item of data.result.bill_detail) {
              cost_cal += item.bill_detail_item_total_cost;
            }
            setTotalPrice(total_price_cal);
            setCost(cost_cal);
            setTotalProfit(data.result.total_profit);
            setOrderAmount(data.result.order_amount);
            setSummary(data.result.summary);
            let grouping: any = [];
            for (let item of data.result.best_sell) {
              let index = await grouping.findIndex(
                (value: any) => value.name == item.name
              );
              if (index === -1) {
                await grouping.push({ ...item });
              } else {
                grouping[index].order_amount =
                  grouping[index].order_amount + item.order_amount;
              }
            }
            let chart_data: any = [
              { label: "11:00", value: 0, pricing: 0 },
              { label: "12:00", value: 0, pricing: 0 },
              { label: "13:00", value: 0, pricing: 0 },
              { label: "14:00", value: 0, pricing: 0 },
              { label: "15:00", value: 0, pricing: 0 },
              { label: "16:00", value: 0, pricing: 0 },
              { label: "17:00", value: 0, pricing: 0 },
              { label: "18:00", value: 0, pricing: 0 },
              { label: "19:00", value: 0, pricing: 0 },
              { label: "20:00", value: 0, pricing: 0 },
              { label: "21:00", value: 0, pricing: 0 },
              { label: "22:00", value: 0, pricing: 0 },
            ]
            for (let item of data.result.bill) {
              let index = await chart_data.findIndex(
                (val: any) =>
                  val.label === dayjs(item.created_at).format("HH:00")
              );
              chart_data[index].value += 1;
              chart_data[index].pricing =
                chart_data[index].pricing + item.bill_total_price;
            }
            setChartData(chart_data);
            await grouping.sort(
              (a: any, b: any) => b.order_amount - a.order_amount
            );
            setBestSell(grouping);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [startDate, endDate]);

  return (
    <>
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
              <Typography.Title level={3}>ระบบขายหน้าร้าน</Typography.Title>
              <Typography.Text style={{ marginTop: "-15px", color: "#8e8e8e" }}>
                ดูข้อมูลและสถิติต่างๆ ผลประกอบการจากการขาย
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
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} md={6}>
              <div
                style={{
                  border: 0,
                  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                  padding: 10,
                  borderRadius: 7,
                }}
              >
                <Stack direction="row" justifyContent="space-between">
                  <Stack direction="column" sx={{ mt: -2.5 }}>
                    <Typography.Title level={5}>ต้นทุน</Typography.Title>
                    <Typography.Text style={{ color: "#8e8e8e" }}>
                      ฿{cost.toLocaleString()}
                    </Typography.Text>
                  </Stack>
                  <Stack direction="row">
                    <img src="/images/report.png" width="65px" height="65px" />
                  </Stack>
                </Stack>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <div
                style={{
                  border: 0,
                  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                  padding: 10,
                  borderRadius: 7,
                }}
              >
                <Stack direction="row" justifyContent="space-between">
                  <Stack direction="column" sx={{ mt: -2.5 }}>
                    <Typography.Title level={5}>กำไร</Typography.Title>
                    <Typography.Text style={{ color: "#8e8e8e" }}>
                      ฿{totalProfit.toLocaleString()}
                    </Typography.Text>
                  </Stack>
                  <Stack direction="row">
                    <img src="/images/money.png" width="65px" height="65px" />
                  </Stack>
                </Stack>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <div
                style={{
                  border: 0,
                  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                  padding: 10,
                  borderRadius: 7,
                }}
              >
                <Stack direction="row" justifyContent="space-between">
                  <Stack direction="column" sx={{ mt: -2.5 }}>
                    <Typography.Title level={5}>ยอดขาย</Typography.Title>
                    <Typography.Text style={{ color: "#8e8e8e" }}>
                      ฿{totalPrice.toLocaleString()}
                    </Typography.Text>
                  </Stack>
                  <Stack direction="row">
                    <img
                      src="/images/free-tax.png"
                      width="65px"
                      height="65px"
                    />
                  </Stack>
                </Stack>
              </div>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <div
                style={{
                  border: 0,
                  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                  padding: 10,
                  borderRadius: 7,
                }}
              >
                <Stack direction="row" justifyContent="space-between">
                  <Stack direction="column" sx={{ mt: -2.5 }}>
                    <Typography.Title level={5}>ออเดอร์</Typography.Title>
                    <Typography.Text style={{ color: "#8e8e8e" }}>
                      {orderAmount} ออเดอร์
                    </Typography.Text>
                  </Stack>
                  <Stack direction="row">
                    <img
                      src="/images/add-to-cart.png"
                      width="65px"
                      height="65px"
                    />
                  </Stack>
                </Stack>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <div
                style={{
                  border: 0,
                  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                  padding: 10,
                  borderRadius: 7,
                }}
              >
                <Stack direction="row" justifyContent="space-between">
                  <Stack direction="column" sx={{ mt: -2.5 }}>
                    <Typography.Title level={5}>ยอดซื้อเฉลี่ย</Typography.Title>
                    <Typography.Text style={{ color: "#8e8e8e" }}>
                      ฿{summary.toLocaleString()}
                    </Typography.Text>
                  </Stack>
                  <Stack direction="row">
                    <img src="/images/1547934.png" width="65px" height="65px" />
                  </Stack>
                </Stack>
              </div>
            </Grid>
          </Grid>
          <Divider />
          <Grid container spacing={1}>
            <Grid item xs={12} sm={4}>
              <div
                style={{
                  border: 0,
                  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                  padding: 10,
                  borderRadius: 7,
                  height: 368.47,
                }}
              >
                <Stack direction="column" sx={{ mt: -3 }}>
                  <Typography.Title level={5}>
                    อันดับสินค้าขายดี
                  </Typography.Title>
                  <Divider style={{ marginTop: -2, marginBottom: 20 }} />
                  <Stack
                    direction="column"
                    spacing={1.5}
                    sx={{ overflowY: "scroll", height: "300px" }}
                  >
                    {bestSell.length !== 0 &&
                      bestSell.map((items: any) => {
                        return (
                          <Stack
                            direction="row"
                            justifyContent="space-between"
                            key={items.name}
                          >
                            <Stack direction="row">
                              <img
                                src={`/images/menu/${items.name}.webp`}
                                width={38}
                                height={38}
                                style={{ borderRadius: "4px" }}
                              />
                              <Stack direction="column" sx={{ ml: 1, mt: 0 }}>
                                <Typography.Text style={{ fontSize: 13 }}>
                                  {items.name}
                                </Typography.Text>
                                <Typography.Text
                                  style={{ fontSize: 10, color: "#8e8e8e" }}
                                >
                                  ฿{items.pricing}
                                </Typography.Text>
                              </Stack>
                            </Stack>
                            <Stack direction="row" sx={{ mt: 0.2 }}>
                              <Typography.Text style={{ fontSize: "11px" }}>
                                ฿{items.pricing * items.order_amount} /{" "}
                                {items.order_amount} ครั้ง
                              </Typography.Text>
                            </Stack>
                          </Stack>
                        );
                      })}
                  </Stack>
                </Stack>
              </div>
            </Grid>
            <Grid item xs={12} sm={8}>
              <div
                style={{
                  border: 0,
                  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                  padding: 10,
                  borderRadius: 7,
                  height: 368.47,
                }}
              >
                <Stack direction="column" sx={{ mt: -3 }}>
                  <Typography.Title level={5}>
                    ช่วงเวลาที่ขายดี
                  </Typography.Title>
                  <div style={{ marginTop: "-5px" }}>
                    <ReactApexChart
                      options={{
                        dataLabels: {
                          enabled: true,
                          offsetY: -24,
                          style: {
                            colors: ["#000000"],
                          },
                        },
                        chart: {
                          toolbar: {
                            show: false,
                          },

                          type: "area",
                          fontFamily:
                            "'IBM Plex Sans Thai', Helvetica, Arial, sans-serif",
                        },
                        stroke: {
                          show: true,
                          curve: "smooth",
                          lineCap: "butt",
                          colors: undefined,
                          width: 1,
                          dashArray: 0,
                        },
                        plotOptions: {
                          bar: {
                            horizontal: false,
                            borderRadius: 3,
                            dataLabels: {
                              position: "top",
                            },
                          },
                          area: {},
                        },
                        xaxis: {
                          categories: chartData.map((item: any) => item.label),
                        },
                      }}
                      type="bar"
                      series={[
                        {
                          color: "#d9363e",
                          name: "ออเดอร์",
                          data: chartData.map((item: any) => item.value),
                        },
                      ]}
                    />
                  </div>
                </Stack>
              </div>
            </Grid>
          </Grid>
        </Stack>
      </div>
    </>
  );
}
