import "./DashboardAdmin.css";
import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaGithub,
  FaCartShopping,
  FaMoneyBills,
} from "react-icons/fa6";
import { RiAccountCircleFill } from "react-icons/ri";
import { BsBoxSeamFill } from "react-icons/bs";
import { RxDashboard } from "react-icons/rx";
import { BiSolidDiscount} from "react-icons/bi";
import {  Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import {
  Avatar,
  Badge,
  Button,
  Layout,
  theme,
  FloatButton,
  Dropdown,
  Space,
} from "antd";
import logoShop from "../../assets/image/logo.png";
import bgsider from "../../assets/image/sidebar.jpg";

const { Header, Sider, Content } = Layout;

const DashboardAdmin = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const nav = useNavigate();
  const location = useLocation();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [userName, setUserName] = useState("Admin");
  const [linkAnh] = useState("");

  const dangXuat = () => {
    localStorage.clear();
    nav("/login");
  };

  const DoiMatKhau = () => nav("/admin-doi-mat-khau");

  const items = [
    { key: "1", label: <a onClick={DoiMatKhau}>Đổi mật khẩu</a> },
    { key: "2", label: "Thông tin" },
    { key: "3", label: <a onClick={dangXuat}>Đăng xuất</a> },
  ];

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed} width={235}>
        <div
          style={{
            position: "relative",
            height: "100vh",
            backgroundColor: "#1f1f1f",
          }}
        >
          {/* nền mờ */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundImage: `url(${bgsider})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              opacity: 0.25,
              zIndex: 0,
            }}
          ></div>
          {/* content */}
          <div
            style={{
              position: "relative",
              zIndex: 1,
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                padding: 20,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                fontWeight: "bold",
                textTransform: "uppercase",
              }}
            >
              {!collapsed ? (
                <>
                  <img src={logoShop} width={100} alt="logo" />
                  <span
                    style={{ color: "white", marginTop: 5, fontSize: "24px" }}
                  >
                    PCoffe
                  </span>
                </>
              ) : (
                <img src={logoShop} width={40} alt="logo" />
              )}
            </div>

            <Menu>
              <MenuItem
                icon={<RxDashboard size={24} />}
                style={{ fontSize: "18px" }}
                active={location.pathname === "/admin-thong-ke"}
                onClick={() => nav("/admin-thong-ke")}
              >
                Thống kê
              </MenuItem>

              <MenuItem
                icon={<FaCartShopping size={24} />}
                style={{ fontSize: "18px" }}
                active={location.pathname === "/admin-ban-hang"}
                onClick={() => nav("/admin-ban-hang")}
              >
                Bán hàng
              </MenuItem>

              <SubMenu
                icon={<BsBoxSeamFill size={24} />}
                label="Sản phẩm"
                style={{ fontSize: "18px" }}
                defaultOpen={
                  location.pathname.startsWith("/admin-san-pham") ||
                  location.pathname.startsWith("/admin-danh-muc")
                }
              >
                <MenuItem
                  active={location.pathname === "/admin-san-pham"}
                  onClick={() => nav("/admin-san-pham")}
                >
                  Sản phẩm
                </MenuItem>

                <MenuItem
                  active={location.pathname === "/admin-topping"}
                  onClick={() => nav("/admin-topping")}
                >
                  Topping
                </MenuItem>
                <MenuItem
                  active={location.pathname === "/admin-size"}
                  onClick={() => nav("/admin-size")}
                >
                  Size
                </MenuItem>
                <MenuItem
                  active={location.pathname === "/admin-danh-muc"}
                  onClick={() => nav("/admin-danh-muc")}
                >
                  Danh mục
                </MenuItem>
                <MenuItem
                  active={location.pathname === "/admin-do-ngot"}
                  onClick={() => nav("/admin-do-ngot")}
                >
                  Độ ngọt
                </MenuItem>
                <MenuItem
                  active={location.pathname === "/admin-muc-da"}
                  onClick={() => nav("/admin-muc-da")}
                >
                  Mức đá
                </MenuItem>
              </SubMenu>

              <SubMenu
                icon={<RiAccountCircleFill size={24} />}
                label="Tài khoản"
                style={{ fontSize: "18px" }}
                defaultOpen={
                  location.pathname.startsWith("/admin-nhan-vien") ||
                  location.pathname.startsWith("/admin-khach-hang")
                }
              >
                <MenuItem
                  active={location.pathname === "/admin-nhan-vien"}
                  onClick={() => nav("/admin-nhan-vien")}
                >
                  Nhân viên
                </MenuItem>
                <MenuItem
                  active={location.pathname === "/admin-khach-hang"}
                  onClick={() => nav("/admin-khach-hang")}
                >
                  Khách hàng
                </MenuItem>
              </SubMenu>

              <MenuItem
                icon={<FaMoneyBills size={24} />}
                suffix={
                  !collapsed && (
                    <Badge count="New" style={{ background: "red" }} />
                  )
                }
              >
                Hóa đơn
              </MenuItem>

              <SubMenu
                icon={<BiSolidDiscount size={24} />}
                label="Giảm giá"
                style={{ fontSize: "18px" }}
                defaultOpen={
                  location.pathname.startsWith("/admin-khuyen-mai") ||
                  location.pathname.startsWith("/admin-voucher")
                }
              >
                <MenuItem
                  active={location.pathname === "/admin-khuyen-mai"}
                  onClick={() => nav("/admin-khuyen-mai")}
                >
                  Đợt giảm giá
                </MenuItem>
                <MenuItem
                  active={location.pathname === "/admin-voucher"}
                  onClick={() => nav("/admin-voucher")}
                >
                  Phiếu giảm giá
                </MenuItem>
              </SubMenu>
            </Menu>

            <div
              style={{
                textAlign: "center",
                marginTop: "auto",
                padding: 20,
              }}
            >
              {collapsed ? (
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "white" }}
                >
                  <FaGithub size={20} />
                </a>
              ) : (
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "white" }}
                >
                  <FaGithub size={20} /> PCoffe
                </a>
              )}
            </div>
          </div>
        </div>
      </Sider>

      <Layout>
        <Header
          style={{
            background: "#4E4336",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 16px",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ cursor: "pointer" }}
          />

          <Dropdown menu={{ items }} placement="bottomRight" arrow>
            <Space>
              <Avatar src={linkAnh} className="avatar-hover" />
              <span>{userName}</span>
            </Space>
          </Dropdown>
        </Header>

        <Content
          style={{
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            overflowY: "auto",
          }}
        >
          {children}
        </Content>
      </Layout>
      <FloatButton.BackTop />
    </Layout>
  );
};

export default DashboardAdmin;
