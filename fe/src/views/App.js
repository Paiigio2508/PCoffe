
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppConfig } from "./AppConfig";
import NotFoud from "../pages/404/NotFoud";
import NotAccess from "../pages/403/NotAccess";
import { DashboardClient } from '../layouts/user/DashboardClient';
import  DashboardAdmin  from '../layouts/admin/DashboardAdmin';

import  AuthGuard  from "../guard/AuthGuard";
import GuestGuard from "../guard/GuestGuard";
import { Suspense } from "react";
import { Home } from '../layouts/user/home/home';
import { MENU } from "../layouts/user/menu/menu";
// nhanvien
import NhanVien from '../layouts/admin/nguoidung/nhanvien/NhanVien';
import AddNhanVien from "../layouts/admin/nguoidung/nhanvien/AddNhanVien";
import UpdateNhanVien from "../layouts/admin/nguoidung/nhanvien/UpdateNhanVien";
import DetailNhanVien from "../layouts/admin/nguoidung/nhanvien/DetailNhanVien";
// khách hàng
import KhachHang from "../layouts/admin/nguoidung/khachhang/KhachHang";
import AddKhachHang from "../layouts/admin/nguoidung/khachhang/AddKhachHang";
import UpdateKhachHang from "../layouts/admin/nguoidung/khachhang/UpdateKhachHang";
import DetailKhachHang from '../layouts/admin/nguoidung/khachhang/DetailKhachHang';
import DanhMuc from '../layouts/admin/sanpham/DanhMuc';
import DoNgot from '../layouts/admin/sanpham/DoNgot';
import MucDa from '../layouts/admin/sanpham/MucDa';
import Size from '../layouts/admin/sanpham/Size';
import Topping from '../layouts/admin/sanpham/Topping';
import SanPham from '../layouts/admin/sanpham/SanPham';
import BanHang from '../layouts/admin/banhang/BanHang';
import { Login } from '../layouts/login/Login';
function App() {
  return (
    <div className="App">
      <BrowserRouter basename={AppConfig.routerBase}>
        <Suspense>
          <Routes>
            <Route path="*" element={<NotFoud />} />
            <Route path="/not-access" element={<NotAccess />} />
            {/* login */}

            <Route
              path="/login"
              element={
                <GuestGuard>
                  <Login />
                </GuestGuard>
              }
            />
            {/* client */}
            <Route
              path="/home"
              element={
                <GuestGuard>
                  {/* <CartProvider> */}
                  <DashboardClient>
                    <Home />
                  </DashboardClient>
                  {/* </CartProvider> */}
                </GuestGuard>
              }
            />
            <Route
              path="/menu"
              element={
                <GuestGuard>
                  {/* <CartProvider> */}
                  <DashboardClient>
                    <MENU />
                  </DashboardClient>
                  {/* </CartProvider> */}
                </GuestGuard>
              }
            />
            {/* Màn login */}
            <Route path="/login" element={<GuestGuard></GuestGuard>} />
            <Route path="/sign-up" element={<GuestGuard></GuestGuard>} />
            <Route
              path="/forgot-password"
              element={<GuestGuard></GuestGuard>}
            />

            {/* admin */}
            <Route
              path="/admin"
              element={
                // <AuthGuard>
                <DashboardAdmin></DashboardAdmin>
                // </AuthGuard>
              }
            />
            <Route
              path="/admin-nhan-vien"
              element={
                // <AuthGuard>
                <DashboardAdmin>
                  <NhanVien />
                </DashboardAdmin>
                // </AuthGuard>
              }
            />
            <Route
              path="/admin-them-nhan-vien"
              element={
                // <AuthGuard>
                <DashboardAdmin>
                  <AddNhanVien />
                </DashboardAdmin>
                // </AuthGuard>
              }
            />
            <Route
              path="/admin-update-nhan-vien/:id"
              element={
                // <AuthGuard>
                <DashboardAdmin>
                  <UpdateNhanVien />
                </DashboardAdmin>
                // </AuthGuard>
              }
            />
            <Route
              path="/admin-detail-nhan-vien/:id"
              element={
                // <AuthGuard>
                <DashboardAdmin>
                  <DetailNhanVien />
                </DashboardAdmin>
                // </AuthGuard>
              }
            />
            <Route
              path="/admin-khach-hang"
              element={
                // <AuthGuard>
                <DashboardAdmin>
                  <KhachHang />
                </DashboardAdmin>
                // </AuthGuard>
              }
            />
            <Route
              path="/admin-update-khach-hang/:id"
              element={
                // <AuthGuard>
                <DashboardAdmin>
                  <UpdateKhachHang />
                </DashboardAdmin>
                // </AuthGuard>
              }
            />
            <Route
              path="/admin-them-khach-hang"
              element={
                // <AuthGuard>
                <DashboardAdmin>
                  <AddKhachHang />
                </DashboardAdmin>
                // </AuthGuard>
              }
            />
            <Route
              path="/admin-detail-khach-hang/:id"
              element={
                // <AuthGuard>
                <DashboardAdmin>
                  <DetailKhachHang />
                </DashboardAdmin>
                // </AuthGuard>
              }
            />
            <Route
              path="/admin-danh-muc"
              element={
                // <AuthGuard>
                <DashboardAdmin>
                  <DanhMuc />
                </DashboardAdmin>
                // </AuthGuard>
              }
            />
            <Route
              path="/admin-do-ngot"
              element={
                // <AuthGuard>
                <DashboardAdmin>
                  <DoNgot />
                </DashboardAdmin>
                // </AuthGuard>
              }
            />
            <Route
              path="/admin-muc-da"
              element={
                // <AuthGuard>
                <DashboardAdmin>
                  <MucDa />
                </DashboardAdmin>
                // </AuthGuard>
              }
            />
            <Route
              path="/admin-size"
              element={
                // <AuthGuard>
                <DashboardAdmin>
                  <Size />
                </DashboardAdmin>
                // </AuthGuard>
              }
            />
            <Route
              path="/admin-topping"
              element={
                // <AuthGuard>
                <DashboardAdmin>
                  <Topping />
                </DashboardAdmin>
                // </AuthGuard>
              }
            />
            <Route
              path="/admin-san-pham"
              element={
                // <AuthGuard>
                <DashboardAdmin>
                  <SanPham />
                </DashboardAdmin>
                // </AuthGuard>
              }
            />
            <Route
              path="/admin-ban-hang"
              element={
                // <AuthGuard>
                <DashboardAdmin>
                  <BanHang />
                </DashboardAdmin>
                // </AuthGuard>
              }
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
