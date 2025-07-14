import React, { useEffect, useState } from "react";
import {
  Button,
  Divider,
  Radio,
  Form,
  Input,
  Select,
  Space,
  Table,
  Tag,
  Modal,
  Image,
  Upload,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { PlusCircleOutlined } from "@ant-design/icons";
import { BookFilled } from "@ant-design/icons";
import { FilterFilled } from "@ant-design/icons";
import { BiSolidCategory } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsFillEyeFill } from "react-icons/bs";
import { SanPhamAPI } from "../../../pages/api/sanpham/SanPhamAPI";
import { DanhMucAPI } from "../../../pages/api/sanpham/DanhMucAPI";
export default function SanPham() {
  //Form
  const [setSelectedValue] = useState("1");
  const [openUpdate, setOpenUpdate] = useState(false);
  const [sanPhamUpdate, setSanPhamUpdate] = useState("");
  const [tenCheck, setTenCheck] = useState("");
  const [sanPham, setSanPham] = useState([]);
  const [danhMuc, setDanhMuc] = useState([]);
  const loadDanhMuc = () => {
    DanhMucAPI.getAll().then((res) => {
      setDanhMuc(res.data);
    });
  };
  // xử lí list ảnh và upcloudynari
  const [fileList, setFileList] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const handleUpload = async ({ file }) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "pcoffe_upload"); // Cloudinary preset
    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dm0w2qws8/image/upload",
        formData
      );
      const newUrl = res.data.secure_url;
      setImageUrls((prev) => [...prev, newUrl]);
      setFileList((prev) => [
        ...prev,
        { uid: file.uid, url: newUrl, name: file.name },
      ]);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    loadSanPham();
    loadDanhMuc();
  }, []);

  const [componentSize, setComponentSize] = useState("default");
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const formItemLayout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 20,
    },
  };
  const loadSanPham = async () => {
    SanPhamAPI.getAll().then((res) => {
      setSanPham(res.data);
    });
  };

  //Ấn add
  const [open, setOpen] = useState(false);
  const addSanPham = (values) => {
    const checkTrung = (code) => {
      return sanPham.some(
        (md) => md.tenSP.trim().toLowerCase() === code.trim().toLowerCase()
      );
    };
    const dataSend = {
      ...values,
      danhMuc: values.danhMuc,
      linkAnh: imageUrls, // mảng ảnh
    };
    if (!checkTrung(values.ten)) {
      SanPhamAPI.create(dataSend).then((res) => {
        toast("✔️ Thêm thành công!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        loadSanPham();
        setOpen(false);
        form.resetFields();
        setFileList([]); // Xóa toàn bộ ảnh hiển thị
        setImageUrls([]); // Xóa toàn bộ ảnh gửi lên backend
      });
    } else {
      toast.error("Sản phẩm đã tồn tại!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  //Update
  const showModal = async (idDetail) => {
    await SanPhamAPI.detailDN(idDetail).then((res) => {
      form1.setFieldsValue({
        tenSP: res.data.tenSP,
        giaSP: res.data.giaSP,
        moTa: res.data.moTaSP,
        danhMucSP: res.data.idDM,
        trangThai: res.data.trangThai,
      });
      setTenCheck(res.data.ten);
      setSanPhamUpdate(res.data);
    });
    setOpenUpdate(true);
  };
  const updateSanPham = (values) => {
    const tenMoi = sanPhamUpdate.tenSP || "";
    const tenCu = tenCheck || "";

    if (tenMoi.trim().toLowerCase() !== tenCu.trim().toLowerCase()) {
      const checkTrung = (tenSP) => {
        return sanPham.some(
          (s) =>
            s.tenSP?.trim().toLowerCase() === tenSP.trim().toLowerCase() &&
            s.id !== sanPhamUpdate.id
        );
      };

      if (checkTrung(tenMoi)) {
        toast.error("Sản phẩm đã trùng !");
        return;
      }
    }
    const dataSend = {
      id:sanPhamUpdate.idSP,
      ten: values.tenSP,
      gia: values.giaSP,
      moTa: values.moTa,
      danhMuc: values.danhMucSP,
      trangThai: values.trangThai,
      linkAnh: imageUrls,
    };
    SanPhamAPI.updateDN(dataSend.id, dataSend).then(() => {
      toast("✔️ Sửa thành công!");
      setSanPhamUpdate("");
      loadSanPham();
      setOpenUpdate(false);
      form1.resetFields();
      setFileList([]); // Xóa toàn bộ ảnh hiển thị
      setImageUrls([]); // Xóa toàn bộ ảnh gửi lên backend
    });
  };

  //Tìm kiếm
  const onChangeFilter = (changedValues, allValues) => {
    if (typeof allValues.tenTimKiem === "string") {
      allValues.tenTimKiem = allValues.tenTimKiem.trim();
    }
    timKiemCT(allValues);
  };

  const timKiemCT = (dataSearch) => {
    SanPhamAPI.search(dataSearch).then((res) => {
      setSanPham(res.data);
    });
  };
  //Validate
  const validateDateAdd = (_, value) => {
    const { getFieldValue } = form;
    const tenTim = getFieldValue("ten");
    if (tenTim != undefined) {
      if (!tenTim.trim()) {
        return Promise.reject("Tên không được để trống");
      }
    } else {
      return Promise.reject("Tên không được để trống");
    }

    const specialCharacterRegex = /[!@#%$^&*()_+\=\[\]{};':"\\|,.<>\/?]/;
    if (specialCharacterRegex.test(tenTim)) {
      return Promise.reject("Tên không được chứa ký tự đặc biệt");
    }

    if (tenTim.trim().length > 30) {
      return Promise.reject("Tên không được vượt quá 30 ký tự");
    }
    return Promise.resolve();
  };

  const validateDateUpdate = (_, value) => {
    const { getFieldValue } = form1;
    const tenTim = getFieldValue("tenSP");
    if (tenTim != undefined) {
      if (!tenTim.trim()) {
        return Promise.reject("Tên không được để trống");
      }
    } else {
      return Promise.reject("Tên không được để trống");
    }

    const specialCharacterRegex = /[!@#$^&*()_+\=\[\]{};':"\\|,.<>\/?]/;
    if (specialCharacterRegex.test(tenTim)) {
      return Promise.reject("Tên không được chứa ký tự đặc biệt");
    }

    if (tenTim.trim().length > 30) {
      return Promise.reject("Tên không được vượt quá 30 ký tự");
    }
    return Promise.resolve();
  };

  //Table

  const columns = [
    {
      title: "STT",
      render: (text, record, index) => index + 1,
    },
    {
      title: " Ảnh",
      dataIndex: "linkAnh",
      key: "linkAnh",
      align: "center",
      render: (text) => (
        <Image
          width={100}
          height={100}
          style={{ borderRadius: "15px" }}
          src={text}
        />
      ),
    },
    {
      title: "Mã",
      dataIndex: "maSP",
      center: "true",
      sorter: (a, b) => a.ma - b.ma,
    },
    ,
    {
      title: "Tên",
      dataIndex: "tenSP",
    },
    {
      title: "Giá",
      dataIndex: "giaSP",
      render: (value) =>
        !isNaN(value)
          ? Number(value).toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })
          : "0 ₫",
    },
    {
      title: "Mô tả",
      dataIndex: "moTaSP",
      center: "true",
      render: (text) =>
        text && text.length > 50 ? `${text.slice(0, 50)}...` : text,
    },
    {
      title: "Trạng thái",
      dataIndex: "trangThai",
      key: "trangThai",
      render: (trang_thai) => (
        <>
          {trang_thai === 0 ? (
            <Tag color="green">Còn Hoạt Động</Tag>
          ) : (
            <Tag color="red">Ngưng Hoạt Động</Tag>
          )}
        </>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      dataIndex: "idSP",
      render: (title) => (
        <Space size="middle">
          <a className="btn btn-danger" onClick={() => showModal(`${title}`)}>
            <BsFillEyeFill className="mb-1" />
          </a>
        </Space>
      ),
    },
  ];
  const [form] = Form.useForm();
  const [form1] = Form.useForm();
  const [form2] = Form.useForm();
  return (
    <div className="container-fluid" style={{ borderRadius: 20 }}>
      <div className="container-fluid">
        <Divider orientation="center" color="#d0aa73">
          <h4 className="text-first pt-1 fw-bold">
            <BiSolidCategory size={35} /> Quản lý sản phẩm
          </h4>
        </Divider>
        <div
          className=" bg-light m-2 p-3 pt-1"
          style={{
            border: "1px solid #ddd", // Border color
            boxShadow: "0 3px 8px rgba(0, 0, 0, 0.1)", // Box shadow
            borderRadius: "8px",
          }}
        >
          <h5 className="text-start">
            <FilterFilled size={30} /> Bộ lọc
          </h5>
          <hr />
          <Form
            className="row col-md-12"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 14,
            }}
            layout="horizontal"
            initialValues={{
              size: componentSize,
            }}
            onValuesChange={onChangeFilter}
            size={componentSize}
            // style={{
            //   maxWidth: 1400,
            // }}
            form={form2}
          >
            <div className="col-md-5">
              <Form.Item label="Tìm kiếm" name="tenTimKiem">
                <Input maxLength={30} placeholder="Nhập mã hoặc tên..." />
              </Form.Item>
            </div>
            <div className="col-md-5">
              <Form.Item label="Trạng thái" name="trangThai">
                <Select allowClear placeholder="Tất cả">
                  <Select.Option value="0">Hoạt động</Select.Option>
                  <Select.Option value="1">Không hoạt động</Select.Option>
                </Select>
              </Form.Item>
            </div>
          </Form>
          <Form.Item className="text-center ">
            <Button className="btn3" htmlType="reset" onClick={loadSanPham}>
              Làm mới
            </Button>
          </Form.Item>
        </div>
        <div className="text-end">
          <button onClick={() => setOpen(true)} class="button-them  mb-2">
            <span class="text">
              <PlusCircleOutlined /> Thêm sản phẩm
            </span>
          </button>
        </div>
        <div
          className=" bg-light m-2 p-3 pt-2"
          style={{
            border: "1px solid #ddd", // Border color
            boxShadow: "0 3px 8px rgba(0, 0, 0, 0.1)", // Box shadow
            borderRadius: "8px",
          }}
        >
          <h5 className="text-start mt-2">
            <BookFilled size={30} /> Danh sách sản phẩm
          </h5>
          <hr />
          <div className="ms-3">
            {/* Add danh mục */}

            <Modal
              title={<h5>Thêm sản phẩm</h5>}
              open={open}
              centered
              onOk={() => form.submit()}
              onCancel={() => setOpen(false)}
              width={1000}
            >
              <Form
                form={form}
                onFinish={addSanPham}
                layout="vertical"
                className="row"
              >
                <div className="row">
                  {/* Cột bên trái: 3 field */}
                  <div className="col-md-6">
                    <Form.Item
                      label="Danh mục"
                      name="danhMuc"
                      rules={[
                        { required: true, message: "Vui lòng chọn danh mục" },
                      ]}
                      className="mt-3"
                    >
                      <Select placeholder="Chọn danh mục">
                        {danhMuc.map((item) => (
                          <Select.Option key={item.id} value={item.id}>
                            {item.ten}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>

                    <Form.Item
                      label="Tên"
                      name="ten"
                      rules={[{ required: true, message: "Vui lòng nhập tên" }]}
                      className="mt-3"
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      label="Giá"
                      name="gia"
                      rules={[{ required: true, validator: validateDateAdd }]}
                      className="mt-3"
                    >
                      <Input />
                    </Form.Item>
                  </div>

                  {/* Cột bên phải: mô tả */}
                  <div className="col-md-6">
                    <Form.Item
                      label="Mô tả"
                      name="moTa"
                      rules={[
                        { required: true, message: "Vui lòng nhập mô tả" },
                      ]}
                      className="mt-3"
                    >
                      <Input.TextArea rows={9} />
                    </Form.Item>
                  </div>
                </div>

                <Form.Item label="Upload ảnh" className="col-md-12">
                  <Upload
                    customRequest={handleUpload}
                    listType="picture-card"
                    fileList={fileList}
                    onRemove={(file) => {
                      setFileList((prev) =>
                        prev.filter((f) => f.uid !== file.uid)
                      );
                      setImageUrls((prev) =>
                        prev.filter((url) => url !== file.url)
                      );
                    }}
                  >
                    {fileList.length >= 5 ? null : <PlusOutlined />}
                  </Upload>
                </Form.Item>
              </Form>
            </Modal>

            {/* Update  */}
            <Modal
              title="Sửa sản phẩm"
              centered
              open={openUpdate}
              onOk={() => form1.submit()}
              onCancel={() => setOpenUpdate(false)}
              footer={[
                <Button onClick={() => setOpenUpdate(false)}>Hủy</Button>,
                <Button type="primary" onClick={() => form1.submit()}>
                  Sửa
                </Button>,
              ]}
              width={600}
            >
              <Form
                {...formItemLayout}
                form={form1}
                onFinish={updateSanPham}
                onFieldsChange={() => {
                  const values = form1.getFieldsValue();
                  setSanPhamUpdate((prev) => ({
                    ...prev,
                    tenSP: values.tenSP,
                    giaSP: values.giaSP,
                    moTaSP: values.moTa,
                    danhMuc: values.danhMucSP,
                    trangThai: values.trangThai,
                  }));
                }}
              >
                <Form.Item
                  name="danhMucSP"
                  label={<b>Danh mục</b>}
                  rules={[
                    { required: true, message: "Vui lòng chọn danh mục" },
                  ]}
                  className="mt-4"
                >
                  <Select placeholder="Chọn danh mục">
                    {danhMuc.map((item) => (
                      <Select.Option key={item.id} value={item.id}>
                        {item.ten}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  name="tenSP"
                  label={<b>Tên</b>}
                  hasFeedback
                  // rules={[{ required: true, validator: validateDateUpdate }]}
                  className="mt-4"
                >
                  <Input maxLength={31} />
                </Form.Item>

                <Form.Item
                  name="giaSP"
                  label={<b>Giá</b>}
                  hasFeedback
                  // rules={[{ required: true, validator: validateDateUpdate }]}
                  className="mt-4"
                >
                  <Input maxLength={31} />
                </Form.Item>
                <Form.Item
                  name="moTa"
                  label={<b>Mô tả</b>}
                  hasFeedback
                  // rules={[{ required: true, validator: validateDateUpdate }]}
                  className="mt-4"
                >
                  <Input.TextArea rows={5} maxLength={500} />
                </Form.Item>

                <Form.Item label={<b>Upload ảnh</b>} className="col-md-12">
                  <Upload
                    customRequest={handleUpload}
                    listType="picture-card"
                    fileList={fileList}
                    onRemove={(file) => {
                      setFileList((prev) =>
                        prev.filter((f) => f.uid !== file.uid)
                      );
                      setImageUrls((prev) =>
                        prev.filter((url) => url !== file.url)
                      );
                    }}
                  >
                    {fileList.length >= 5 ? null : <PlusOutlined />}
                  </Upload>
                </Form.Item>
                <Form.Item
                  label={<b>Trạng thái</b>}
                  name="trangThai"
                  className="mt-4"
                >
                  <Radio.Group>
                    <Radio value={0}>Còn hoạt động</Radio>
                    <Radio value={1}>Ngừng hoạt động</Radio>
                  </Radio.Group>
                </Form.Item>
              </Form>
            </Modal>
          </div>
          <div className="container-fluid mt-4">
            <Table
              align="center"
              dataSource={sanPham}
              columns={columns}
              pagination={{
                showQuickJumper: true,
                defaultPageSize: 5,
                position: ["bottomCenter"],
                defaultCurrent: 1,
                total: sanPham.length,
              }}
            />
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
    </div>
  );
}
