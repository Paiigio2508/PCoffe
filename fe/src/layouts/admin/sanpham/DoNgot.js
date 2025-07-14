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
import { DoNgotAPI } from "../../../pages/api/sanpham/DoNgotAPI";

export default function DoNgot() {
  //Form
  const [ setSelectedValue] = useState("1");
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
  //Ấn add
  const [open, setOpen] = useState(false);
  const addDoNgot = (value) => {
    const checkTrung = (code) => {
      return doNgot.some(
        (dn) => dn.ten.trim().toLowerCase() === code.trim().toLowerCase()
      );
    };
    if (!checkTrung(value.ten)) {
      DoNgotAPI.create(value).then((res) => {
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
        loadDoNgot();
        setOpen(false);
        form.resetFields();
      });
    } else {
      toast.error("Độ ngọt đã tồn tại!", {
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
  const [openUpdate, setOpenUpdate] = useState(false);
  const [dnUpdate, setDnUpdate] = useState("");
  const [tenCheck, setTenCheck] = useState("");

  const showModal = async (idDetail) => {
    await DoNgotAPI.detailDN(idDetail).then((res) => {
      form1.setFieldsValue({
        id: res.data.id,
        ma: res.data.ma,
        ten: res.data.ten,
        trangThai: res.data.trangThai,
        ngayTao: res.data.ngayTao,
        ngaySua: res.data.ngaySua,
        nguoiTao: res.data.nguoiTao,
        nguoiSua: res.data.nguoiSua,
      });
      setTenCheck(res.data.ten);
      setDnUpdate(res.data);
    });
    setOpenUpdate(true);
  };
  const updateDoNgot = () => {
    if (dnUpdate.ten != tenCheck) {
      const checkTrung = (ten) => {
        return doNgot.some(
          (dn) => dn.ten.trim().toLowerCase() === ten.trim().toLowerCase()
        );
      };

      if (checkTrung(dnUpdate.ten)) {
        toast.error("Độ ngọt trùng với độ ngọt khác !", {
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
    DoNgotAPI.updateDN(dnUpdate.id, dnUpdate).then((res) => {
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
      setDnUpdate("");
      loadDoNgot();
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
    DoNgotAPI.search(dataSearch).then((res) => {
      setDoNgot(res.data);
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

    const specialCharacterRegex = /[!@#$^&*()_+\=\[\]{};':"\\|,.<>\/?]/;
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

  const validateDateTim = (_, value) => {
    const { getFieldValue } = formTim;
    const ten = getFieldValue("ten");
    if (ten.trim().length > 30) {
      return Promise.reject("Tên không được vượt quá 30 ký tự");
    }
    return Promise.resolve();
  };
  //Table
  const [doNgot, setDoNgot] = useState([]);

  useEffect(() => {
    loadDoNgot();
  }, []);

  const loadDoNgot= () => {
    DoNgotAPI.getAll().then((res) => {
      setDoNgot(res.data);
    });
  };

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
            <BiSolidCategory size={35} /> Quản lý độ ngọt
          </h4>
        </Divider>
        <div
          className=" bg-light m-2 p-3 pt-2"
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
                <Input
                  maxLength={30}
                  placeholder="Nhập mã hoặc tên..."
                />
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
            <Button className="btn3" htmlType="reset" onClick={loadDoNgot}>
              Làm mới
            </Button>
          </Form.Item>
        </div>
        <div className="text-end mt-2 mb-2">
          <button onClick={() => setOpen(true)} class="button-them mt-2 mb-3">
            <span class="text">
              <PlusCircleOutlined /> Thêm độ ngọt
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
            <BookFilled size={30} /> Danh sách độ ngọt
          </h5>
          <hr />
          <div className="ms-3">
            {/* Add danh mục */}

            <Modal
              title="Thêm độ ngọt"
              open={open}
              centered
              onOk={() => form.submit()}
              onCancel={() => setOpen(false)}
              width={500}
            >
              <Form form={form} onFinish={addDoNgot} layout="vertical">
                <Form.Item
                  label="Tên"
                  name="ten"
                  rules={[{ required: true, validator: validateDateAdd }]}
                  className="mt-3"
                >
                  <Input />
                </Form.Item>
              </Form>
            </Modal>

            {/* Update danh mục */}
            <Modal
              title="Sửa Danh Mục"
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
                onFinish={updateDoNgot}
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
                    value={dnUpdate.ten}
                    onChange={(e) =>
                      setDnUpdate({ ...dnUpdate, ten: e.target.value })
                    }
                  />
                </Form.Item>
                <Form.Item label={<b>Trạng thái</b>}>
                  <Radio.Group
                    onChange={(e) =>
                      setDnUpdate({ ...dnUpdate, trangThai: e.target.value })
                    }
                    value={dnUpdate.trangThai}
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
              dataSource={doNgot}
              columns={columns}
              pagination={{
                showQuickJumper: true,
                defaultPageSize: 5,
                position: ["bottomCenter"],
                defaultCurrent: 1,
                total: doNgot.length,
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
