import React, { useState } from "react";
import { DesktopOutlined, PieChartOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router";
import { Stack } from "@mui/material";

const { Content, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(
    "รายงาน",
    "/",
    <PieChartOutlined style={{ fontSize: "22px", marginLeft: "-2px" }} />
  ),
  getItem(
    "สร้างบิล",
    "/billing",
    <DesktopOutlined style={{ fontSize: "22px", marginLeft: "-2px" }} />
  ),
];

export const Layouts = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Stack direction="row" justifyContent="center" sx={{ mt: 1 }}>
          <img src="/logo.png" width={"70%"} />
        </Stack>
        <Menu
          theme="dark"
          mode="inline"
          style={{ fontSize: "16px" }}
          items={items}
          defaultSelectedKeys={[location.pathname]}
          onClick={(element: any) => {
            navigate(element.key);
          }}
        />
      </Sider>
      <Layout>
        <Content style={{ margin: "0 16px", marginTop: "20px" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
