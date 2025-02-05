import { lazy } from "react";
import Loadable from "../utils/loadable";
import { Layouts } from "../layouts/index";

const Home = Loadable(lazy(() => import("../pages/home")));
const Notfound = Loadable(lazy(() => import("../pages/not-found")));
const Billing = Loadable(lazy(() => import("../pages/billing")));
const BillTransaction = Loadable(
  lazy(() => import("../pages/bill-transaction"))
);

const Routes = () => {
  return [
    {
      path: "/",
      element: <Layouts />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/billing",
          element: <Billing />,
        },
        {
          path: "/bill-transaction",
          element: <BillTransaction />,
        },
      ],
    },
    {
      path: "*",
      element: <Notfound />,
    },
  ];
};

export default Routes;
