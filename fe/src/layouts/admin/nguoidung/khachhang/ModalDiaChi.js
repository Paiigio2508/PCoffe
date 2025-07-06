import { Button, Modal, Table, Tag, Radio } from "antd";
import React, { useState, useEffect } from "react";
import AddModalDiaChi from "./AddModalDiaChi";
import { ToastContainer, toast } from "react-toastify";
import ModalUpdateDiaChi from "./ModalUpdateDiaChi";
import { KhachHangAPI } from "../../../../pages/api/khachhang/KhachHangAPI";

const ModalDiaChi = (props) => {
  const { openModalDiaChi, setOpenModalDiaChi, idKH, setIdKH } = props;
  const [top] = useState("none");
  const [bottom] = useState("bottomRight");
  const [nowAddress, setNowAddress] = useState("");
  const [datas, setData] = useState([]);
  const [openModalAddDiaChi, setOpenModalAddDiaChi] = useState(false);
  const [openModalUpdateDiaChi, setOpenModalUpdateDiaChi] = useState(false);
  const [diaChiUpdate, setDiaChiUpdate] = useState({});

  const handleClose = () => {
    setOpenModalDiaChi(false);
  };

  const handleUpdateTT = () => {
    if (!nowAddress) {
      toast.error("Vui lòng chọn địa chỉ mặc định trước khi lưu!");
      return;
    }
    KhachHangAPI.updateDiaChiMacDinh(nowAddress)
      .then(() => {
        toast.success("✔️ Cập nhật địa chỉ mặc định thành công!");
        loadDiaChi();
        handleClose(); // đóng modal sau khi cập nhật xong
      })
      .catch((error) => {
        console.log(error);
        toast.error("Cập nhật địa chỉ mặc định thất bại!");
      });
  };

  const handleOpenADDModalDiaChi = () => {
    setOpenModalAddDiaChi(true);
  };

  const handleOpenUpdateDiaChi = (value) => {
    setDiaChiUpdate(value);
    setOpenModalUpdateDiaChi(true);
  };

  const loadDiaChi = () => {
    if (!idKH) return;
    KhachHangAPI.getDiaChiByKH(idKH)
      .then((result) => {
        setData(result.data);
        const macDinh = result.data.find((item) => item.trangThai === 0);
        if (macDinh) {
          setNowAddress(macDinh.id);
        } else {
          setNowAddress(""); // không có mặc định
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (idKH) {
      loadDiaChi();
    }
  }, [idKH]);

  const dataSource = datas.map((item) => ({
    key: item.id,
    ...item,
  }));

  const columns = [
    {
      render: (_, record) => (
        <Radio
          checked={nowAddress === record.id}
          onChange={() => setNowAddress(record.id)}
        />
      ),
    },
    {
      title: "Địa chỉ giao hàng",
      dataIndex: "id",
      key: "id",
      render: (_, record) => (
        <div>
          <h6>
            {record.tenNguoiNhan} | {record.soDienThoai}
          </h6>
          <p>
            {record.diaChi}, {record.tenXa}, {record.tenHuyen},{" "}
            {record.tenThanhPho}
          </p>
          {record.trangThai === 0 && <Tag color="red">Mặc định</Tag>}
        </div>
      ),
    },
    {
      render: (_, record) => (
        <Button
          type="primary"
          className="custom-button"
          onClick={() => handleOpenUpdateDiaChi(record)}
        >
          Cập nhật
        </Button>
      ),
    },
  ];

  return (
    <Modal
      title="Địa chỉ"
      centered
      open={openModalDiaChi}
      onOk={handleUpdateTT}
      onCancel={handleClose}
      width={600}
    >
      <Button
        style={{ marginLeft: 400 }}
        type="primary"
        onClick={handleOpenADDModalDiaChi}
      >
        +Thêm địa chỉ mới
      </Button>

      <hr className="mt-4" />

      <Table
        pagination={{ position: [top, bottom] }}
        columns={columns}
        dataSource={dataSource}
        locale={{ emptyText: "Không có dữ liệu" }}
      />

      <ToastContainer />

      {/* Modal thêm địa chỉ */}
      <AddModalDiaChi
        openModalAddDiaChi={openModalAddDiaChi}
        setOpenModalAddDiaChi={setOpenModalAddDiaChi}
        idKH={idKH}
        setIdKH={setIdKH}
        loadDiaChi={loadDiaChi}
        onOk={() => setOpenModalAddDiaChi(false)}
        onCancel={() => setOpenModalAddDiaChi(false)}
      />

      {/* Modal update địa chỉ */}
      <ModalUpdateDiaChi
        openModalUpdateDiaChi={openModalUpdateDiaChi}
        setOpenModalUpdateDiaChi={setOpenModalUpdateDiaChi}
        diaChiUpdate={diaChiUpdate}
        setDiaChiUpdate={setDiaChiUpdate}
        loadDiaChi={loadDiaChi}
      />
    </Modal>
  );
};

export default ModalDiaChi;
