import { Spin } from "antd";
import { Suspense } from "react";

const Loadable = (Component: any) => (props: any) =>
  (
    <Suspense
      fallback={
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 99999,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Spin size="large" />
          </div>
        </div>
      }
    >
      <Component {...props} />
    </Suspense>
  );

export default Loadable;
