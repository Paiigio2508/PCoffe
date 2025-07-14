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
} from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { BookFilled } from "@ant-design/icons";
import { FilterFilled } from "@ant-design/icons";
import { BiSolidCategory } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsFillEyeFill } from "react-icons/bs";
import { ToppingAPI } from "../../../pages/api/sanpham/ToppingAPI";

export default function Topping() {
  //Form
  const [setSelectedValue] = useState("1");
  const [openUpdate, setOpenUpdate] = useState(false);
  const [toppingUpdate, setToppingUpdate] = useState("");
  const [tenCheck, setTenCheck] = useState("");
  const [topping, setTopping] = useState([]);

  useEffect(() => {
    loadTopping();
  }, []);

  const handleChange = (value) => {
    setSelectedValue(value);
  };
  const [formTim] = Form.useForm();
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
  const loadTopping = () => {
    ToppingAPI.getAll().then((res) => {
      setTopping(res.data);
    });
  };

  //Ấn add
  const [open, setOpen] = useState(false);
  const [bordered] = useState(false);
  const addTopping = (value) => {
    const checkTrung = (code) => {
      return topping.some(
        (t) => t.ten.trim().toLowerCase() === code.trim().toLowerCase()
      );
    };
    if (!checkTrung(value.ten)) {
      ToppingAPI.create(value).then((res) => {
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
        loadTopping();
        setOpen(false);
        form.resetFields();
      });
    } else {
      toast.error("Topping đã tồn tại!", {
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
    await ToppingAPI.detailDN(idDetail).then((res) => {
      form1.setFieldsValue({
        id: res.data.id,
        ma: res.data.ma,
        ten: res.data.ten,
        gia: res.data.gia,
        trangThai: res.data.trangThai,
        ngayTao: res.data.ngayTao,
        ngaySua: res.data.ngaySua,
        nguoiTao: res.data.nguoiTao,
        nguoiSua: res.data.nguoiSua,
      });
      setTenCheck(res.data.ten);
      setToppingUpdate(res.data);
    });
    setOpenUpdate(true);
  };
  const updateTopping = () => {
    if (toppingUpdate.ten != tenCheck) {
      const checkTrung = (ten) => {
        return topping.some(
          (s) => s.ten.trim().toLowerCase() === ten.trim().toLowerCase()
        );
      };

      if (checkTrung(toppingUpdate.ten)) {
        toast.error("Topping đã trùng !", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      }
    }
    ToppingAPI.updateDN(toppingUpdate.id, toppingUpdate).then((res) => {
      toast("✔️ Sửa thành công!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setToppingUpdate("");
      loadTopping();
      setOpenUpdate(false);
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
    ToppingAPI.search(dataSearch).then((res) => {
      setTopping(res.data);
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
    const tenTim = getFieldValue("ten");
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
      dataIndex: "id",
      key: "id",
      render: (id, record, index) => {
        ++index;
        return index;
      },
      showSorterTooltip: false,
    },
    {
      title: "Mã",
      dataIndex: "ma",
      center: "true",
      sorter: (a, b) => a.ma - b.ma,
    },
    ,
    {
      title: "Tên",
      dataIndex: "ten",
    },
    {
      title: "Giá",
      dataIndex: "gia",
      render: (value) =>
        value != null
          ? value.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })
          : "0 ₫",
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
      dataIndex: "id",
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
  return (
    <div className="container-fluid" style={{ borderRadius: 20 }}>
      <div className="container-fluid">
        <Divider orientation="center" color="#d0aa73">
          <h4 className="text-first pt-1 fw-bold">
            <BiSolidCategory size={35} /> Quản lý topping
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
            form={form}
          >
            <div className="col-md-5">
              <Form.Item label="Tìm kiếm" name="tenTimKiem">
                <Input maxLength={30} placeholder="Nhập mã hoặc tên..." />
              </Form.Item>
            </div>
            <div className="col-md-5">
              <Form.Item label="Trạng thái" name="trangThai">
                <Select defaultValue={"Tất cả"}>
                  <Select.Option value="0">Hoạt động</Select.Option>
                  <Select.Option value="1">Không hoạt động</Select.Option>
                </Select>
              </Form.Item>
            </div>
          </Form>
          <Form.Item className="text-center ">
            <Button className="btn3" htmlType="reset" onClick={loadTopping}>
              Làm mới
            </Button>
          </Form.Item>
        </div>
        <div className="text-end">
          <button onClick={() => setOpen(true)} class="button-them  mb-2">
            <span class="text">
              <PlusCircleOutlined /> Thêm topping
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
            <BookFilled size={30} /> Danh sách topping
          </h5>
          <hr />
          <div className="ms-3">
            {/* Add danh mục */}

            <Modal
              title="Thêm topping"
              open={open}
              centered
              onOk={() => form.submit()}
              onCancel={() => setOpen(false)}
              width={500}
            >
              <Form form={form} onFinish={addTopping} layout="vertical">
                <Form.Item
                  label="Tên"
                  name="ten"
                  rules={[{ required: true, validator: validateDateAdd }]}
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
              </Form>
            </Modal>

            {/* Update topping */}
            <Modal
              title="Sửa topping"
              centered
              open={openUpdate}
              onOk={() => setOpenUpdate(false)}
              onCancel={() => setOpenUpdate(false)}
              footer={[
                <Button
                  onClick={() => {
                    setOpenUpdate(false);
                  }}
                >
                  Hủy
                </Button>,
                <Button
                  type="primary"
                  onClick={() => {
                    form1.submit();
                  }}
                >
                  Sửa
                </Button>,
              ]}
              width={500}
            >
              <Form
                {...formItemLayout}
                initialValues={{
                  size: componentSize,
                }}
                onValuesChange={onFormLayoutChange}
                size={componentSize}
                style={{
                  maxWidth: 1000,
                }}
                onFinish={updateTopping}
                form={form1}
              >
                <Form.Item
                  name="ten"
                  label={<b>Tên</b>}
                  hasFeedback
                  rules={[{ required: true, validator: validateDateUpdate }]}
                  className="mt-4"
                >
                  <Input
                    className="border"
                    maxLength={31}
                    value={toppingUpdate.ten}
                    onChange={(e) =>
                      setToppingUpdate({
                        ...toppingUpdate,
                        ten: e.target.value,
                      })
                    }
                  />
                </Form.Item>
                <Form.Item
                  name="gia"
                  label={<b>Tên</b>}
                  hasFeedback
                  rules={[{ required: true, validator: validateDateUpdate }]}
                  className="mt-4"
                >
                  <Input
                    className="border"
                    maxLength={31}
                    value={toppingUpdate.gia}
                    onChange={(e) =>
                      setToppingUpdate({
                        ...toppingUpdate,
                        gia: e.target.value,
                      })
                    }
                  />
                </Form.Item>
                <Form.Item label={<b>Trạng thái</b>}>
                  <Radio.Group
                    onChange={(e) =>
                      setToppingUpdate({
                        ...toppingUpdate,
                        trangThai: e.target.value,
                      })
                    }
                    value={toppingUpdate.trangThai}
                  >
                    <Radio value={0}>Còn Hoạt Động</Radio>
                    <Radio value={1}>Ngừng Hoạt Động</Radio>
                  </Radio.Group>
                </Form.Item>
              </Form>
            </Modal>
          </div>
          <div className="container-fluid mt-4">
            <Table
              align="center"
              dataSource={topping}
              columns={columns}
              pagination={{
                showQuickJumper: true,
                defaultPageSize: 5,
                position: ["bottomCenter"],
                defaultCurrent: 1,
                total: topping.length,
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
