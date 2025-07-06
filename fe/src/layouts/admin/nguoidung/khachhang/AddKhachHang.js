import "./khachhang.css";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Divider, Form, Input, Row, Select } from "antd";
import { FaMoneyBills } from "react-icons/fa6";
import UpLoadImage from "../../../uploadAnh/UpLoadImage";
import { AddressApi } from "../../../../pages/api/address/AddressApi";
import { useNavigate } from "react-router-dom";
import { KhachHangAPI } from "../../../../pages/api/khachhang/KhachHangAPI";
import QRScannerModal from "../../../qrcode/QrCode";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";

export default function AddKhachHang() {
  const [form] = Form.useForm();
  const nav = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const handleModalClose = () => {
    setShowModal(false);
  };
  const handleScanButtonClick = () => {
    setShowModal(true);
  };
  const [setQrResult] = useState("");
  const handleQRResult = (result) => {
    if (result != null) {
      setShowModal(false);
    }
    setQrResult(result);

    // Tìm vị trí của phần tử thứ ba trong chuỗi
    const firstIndex = result.indexOf("|");
    const secondIndex = result.indexOf("|", firstIndex + 1);
    const thirdIndex = result.indexOf("|", secondIndex + 1);
    const fourIndex = result.indexOf("|", thirdIndex + 1);
    const fifIndex = result.indexOf("|", fourIndex + 1);
    const sixIndex = result.indexOf("|", fifIndex + 1);
    const indexDC = result.indexOf(",");
    const indexXa = result.indexOf(",", indexDC + 1);
    const indexHuyen = result.indexOf(",", indexXa + 1);

    setProvince(
      listProvince.filter(
        (item) =>
          item.ProvinceName.toLowerCase().replace(/\s/g, "") ===
          result
            .substring(indexHuyen + 1, sixIndex)
            .toLowerCase()
            .replace(/\s/g, "")
      )[0]
    );

    AddressApi.fetchAllProvinceDistricts(
      listProvince.filter(
        (item) =>
          item.ProvinceName.toLowerCase().replace(/\s/g, "") ===
          result
            .substring(indexHuyen + 1, sixIndex)
            .toLowerCase()
            .replace(/\s/g, "")
      )[0].ProvinceID
    ).then((res) => {
      setListDistricts(res.data.data);
      setDistrict(
        res.data.data.filter(
          (item) =>
            item.NameExtension[3].toLowerCase().replace(/\s/g, "") ===
            result
              .substring(indexXa + 1, indexHuyen)
              .toLowerCase()
              .replace(/\s/g, "")
        )[0]
      );
      AddressApi.fetchAllProvinceWard(
        res.data.data.filter(
          (item) =>
            item.NameExtension[3].toLowerCase().replace(/\s/g, "") ===
            result
              .substring(indexXa + 1, indexHuyen)
              .toLowerCase()
              .replace(/\s/g, "")
        )[0].DistrictID
      ).then((res) => {
        setListWard(res.data.data);

        setWard(
          res.data.data.filter(
            (item) =>
              item.NameExtension[3].toLowerCase().replace(/\s/g, "") ===
              result
                .substring(indexDC + 1, indexXa)
                .toLowerCase()
                .replace(/\s/g, "")
          )[0]
        );
      });
    });

    form.setFieldsValue({
      canCuocCongDan: result.substring(0, 12),
      ten: result.split("|")[2],
      ngaySinh: moment(result.split("|")[3], "DDMMYYYY").format("YYYY-MM-DD"),
      gioiTinh: result.split("|")[4] == "Nam" ? "true" : "false",
      diaChi: result.substring(fifIndex + 1, indexDC),
      tenXa: result.substring(indexDC + 1, indexXa),
      tenHuyen: result.substring(indexXa + 1, indexHuyen),
      tenThanhPho: result.substring(indexHuyen + 1, sixIndex),
    });
  };

  const [listProvince, setListProvince] = useState([]);
  const [listDistricts, setListDistricts] = useState([]);
  const [listWard, setListWard] = useState([]);

  const [province, setProvince] = useState(null);
  const [district, setDistrict] = useState(null);
  const [ward, setWard] = useState(null);

  const [imageUrl, setImageUrl] = useState("");

  const [listKhachHang, setListKhachHang] = useState([]);

  useEffect(() => {
    AddressApi.fetchAllProvince().then((res) => {
      setListProvince(res.data.data);
    });
    loadKhachHang();
  }, []);

  const loadKhachHang = () => {
    KhachHangAPI.getAll().then((res) => {
      setListKhachHang(res.data);
    });
  };

  const handleFileUpload = (cloudinaryUrl) => {
    setImageUrl(cloudinaryUrl);
  };

  const handleProvinceChange = (value) => {
    const provinceObj = JSON.parse(value);
    setProvince(provinceObj);
    form.setFieldsValue({ tenThanhPho: provinceObj.ProvinceName });
    AddressApi.fetchAllProvinceDistricts(provinceObj.ProvinceID).then((res) => {
      setListDistricts(res.data.data);
    });
  };

  const handleDistrictChange = (value) => {
    const districtObj = JSON.parse(value);
    setDistrict(districtObj);
    form.setFieldsValue({ tenHuyen: districtObj.DistrictName });
    AddressApi.fetchAllProvinceWard(districtObj.DistrictID).then((res) => {
      setListWard(res.data.data);
    });
  };

  const handleWardChange = (value) => {
    const wardObj = JSON.parse(value);
    setWard(wardObj);
    form.setFieldsValue({ tenXa: wardObj.WardName });
  };

  const handleSuccess = () => {
    form
      .validateFields()
      .then((values) => {
        // kiểm tra tuổi
        const today = new Date();
        const birthDate = new Date(values.ngaySinh);
        let age = today.getFullYear() - birthDate.getFullYear();
        if (
          today.getMonth() < birthDate.getMonth() ||
          (today.getMonth() === birthDate.getMonth() &&
            today.getDate() < birthDate.getDate())
        ) {
          age--;
        }
        if (age < 18) {
          toast.error("🦄 Nhân viên chưa đủ tuổi!");
          return;
        }

        // kiểm tra email
        if (
          listKhachHang.some(
            (nv) =>
              nv.email?.trim().toLowerCase() ===
              values.email.trim().toLowerCase()
          )
        ) {
          toast.error("🦄 Email đã tồn tại!");
          return;
        }

        // kiểm tra sdt
        if (
          listKhachHang.some(
            (nv) => nv.soDienThoai?.trim() === values.soDienThoai.trim()
          )
        ) {
          toast.error("🦄 Số điện thoại đã tồn tại!");
          return;
        }
        if (
          listKhachHang.some(
            (nv) => nv.canCuocCongDan?.trim() === values.canCuocCongDan.trim()
          )
        ) {
          toast.error("🦄 Số điện thoại đã tồn tại!");
          return;
        }

        const data = {
          ...values,
          anh:
            imageUrl ||
            "https://res.cloudinary.com/dm0w2qws8/image/upload/v1707054561/pryndkawgsxymspxkxcm.png",
          ngaySinh: values.ngaySinh
            ? new Date(values.ngaySinh).getTime()
            : null,
          idThanhPho: province?.ProvinceID,
          idHuyen: district?.DistrictID,
          idXa: ward?.WardCode,
          tenThanhPho: province?.ProvinceName,
          tenHuyen: district?.DistrictName,
          tenXa: ward?.WardName,
        };

        const formData = new FormData();
        formData.append("request", JSON.stringify(data));
        formData.append("file", null);

        KhachHangAPI.create(formData)
          .then(() => {
            nav("/admin-khach-hang");
            toast.success("🦄 Thêm khách hàng thành công!");
          })
          .catch((err) => {
            console.log(err);
            toast.error("🦄 Thêm thất bại!");
          });
      })
      .catch((err) => {
        console.log("Lỗi validate form:", err);
      });
  };

  const back = () => {
    nav("/admin-khach-hang");
  };

  return (
    <>
      <Divider orientation="center">
        <h3 className="text-first fw-bold">
          <FaMoneyBills /> Thêm khách hàng
        </h3>
      </Divider>

      <Form form={form} layout="vertical" className="mt-5">
        <Row gutter={14}>
          <Col span={7}>
            <Card style={{ height: "100%", minHeight: "550px" }}>
              <h5 className="text-center fw-bold">Ảnh đại diện</h5>
              <Row justify="center" className="mt-5">
                <UpLoadImage onFileUpload={handleFileUpload} />
              </Row>
            </Card>
          </Col>
          <Col span={17}>
            <Card>
              <h5 className="text-center fw-bold">Thông tin khách hàng</h5>
              <Row justify="end" style={{ marginBottom: 15, marginTop: 10 }}>
                <Col>
                  <Button onClick={handleSuccess} className="btn3">
                    Hoàn tất
                  </Button>
                  <Button onClick={back} className="btn3">
                    Hủy
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col span={11} style={{ marginRight: 20 }}>
                  <Form.Item
                    name="ten"
                    label="Họ và tên"
                    rules={[
                      { required: true, message: "Hãy nhập họ tên." },
                      {
                        pattern: /^[A-Za-zÀ-ỹ\s]+$/,
                        message: "Chỉ chứa chữ cái.",
                      },
                    ]}
                  >
                    <Input className="text-center" />
                  </Form.Item>
                  <Form.Item
                    name="cccd"
                    label="Căn cước"
                    rules={[
                      { required: true, message: "Hãy nhập căn cước." },
                      {
                        pattern: /^\d{12}$/,
                        message: "Phải 12 số.",
                      },
                    ]}
                  >
                    <Input className="text-center" />
                  </Form.Item>
                  <Form.Item
                    name="gioiTinh"
                    label="Giới tính"
                    rules={[{ required: true, message: "Chọn giới tính." }]}
                  >
                    <Select>
                      <Select.Option value="true">Nam</Select.Option>
                      <Select.Option value="false">Nữ</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="tenThanhPho"
                    label="Tỉnh/Thành phố"
                    rules={[{ required: true, message: "Hãy chọn Tỉnh/TP." }]}
                  >
                    <Select
                      onChange={(value) => handleProvinceChange(value)}
                      placeholder="----Chọn Tỉnh/TP ----"
                    >
                      {listProvince.map((item) => (
                        <Select.Option
                          key={item.ProvinceID}
                          value={JSON.stringify(item)} // truyền nguyên object
                        >
                          {item.ProvinceName}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="tenXa"
                    label="Xã/Phường"
                    rules={[{ required: true, message: "Chọn Xã/Phường." }]}
                  >
                    <Select
                      onChange={(value) => handleWardChange(value)}
                      placeholder="--Chọn Xã/Phường--"
                    >
                      {listWard.map((item) => (
                        <Select.Option
                          key={item.WardCode}
                          value={JSON.stringify(item)}
                        >
                          {item.WardName}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={11}>
                  <Form.Item
                    name="ngaySinh"
                    label="Ngày sinh"
                    rules={[{ required: true, message: "Hãy nhập ngày sinh." }]}
                  >
                    <Input type="date" className="text-center" />
                  </Form.Item>
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      { required: true, message: "Hãy nhập email." },
                      { type: "email", message: "Email không hợp lệ." },
                    ]}
                  >
                    <Input className="text-center" />
                  </Form.Item>
                  <Form.Item
                    name="soDienThoai"
                    label="Số điện thoại"
                    rules={[
                      { required: true, message: "Hãy nhập SDT." },
                      {
                        pattern: /^0\d{9}$/,
                        message: "SDT phải 10 số và bắt đầu bằng 0.",
                      },
                    ]}
                  >
                    <Input className="text-center" />
                  </Form.Item>
                  <Form.Item
                    name="tenHuyen"
                    label="Quận/Huyện"
                    rules={[{ required: true, message: "Chọn Quận/Huyện." }]}
                  >
                    <Select
                      onChange={(value) => handleDistrictChange(value)}
                      placeholder="--Chọn Quận/Huyện--"
                    >
                      {listDistricts.map((item) => (
                        <Select.Option
                          key={item.DistrictID}
                          value={JSON.stringify(item)}
                        >
                          {item.DistrictName}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="diaChi"
                    label="Số nhà"
                    rules={[{ required: true, message: "Hãy nhập số nhà." }]}
                  >
                    <Input className="text-center" />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Form>
      {showModal && (
        <QRScannerModal
          visible={showModal}
          onCancel={handleModalClose}
          onQRResult={handleQRResult}
        />
      )}
      <ToastContainer />
    </>
  );
}
