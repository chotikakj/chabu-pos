import { Grid } from "@mui/material";
import MenuList from "../components/billing/menu-list";
import { useEffect, useState } from "react";
import BillList from "../components/billing/bill-list";
import CreateModal from "../components/billing/create-modal";

export default function Billing() {
  const [billList, setBillList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [openCreate, setOpenCreate] = useState(false);

  const addItemToBill = async (item: any) => {
    let bill: any = [...billList];
    let index = await bill.findIndex((val: any) => val.name === item.name);
    if (index === -1) {
      await bill.push({ ...item, amount: 1 });
      setBillList(bill);
    } else {
      bill[index].amount++;
      setBillList(bill);
    }
  };

  const calTotalPrice = async () => {
    let total_price = 0;
    for (let i = 0; i < billList.length; i++) {
      let item: any = billList[i];
      total_price += item.amount * item.pricing;
    }
    setTotalPrice(total_price);
  };

  useEffect(() => {
    calTotalPrice();
  }, [billList]);

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12} md={8}>
          <MenuList addItemToBill={addItemToBill} />
        </Grid>
        <Grid item xs={12} md={4}>
          <BillList
            billList={billList}
            setBillList={setBillList}
            totalPrice={totalPrice}
            setOpenCreate={setOpenCreate}
          />
        </Grid>
      </Grid>
      <CreateModal
        open={openCreate}
        setOpen={setOpenCreate}
        billList={billList}
        setBillList={setBillList}
        totalPrice={totalPrice}
      />
    </>
  );
}
