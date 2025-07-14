import React, { useState } from "react";
import { Button, Input, Table, Row, Col, Card } from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";

const sampleMenu = [
  "CF Sua Da 12",
  "CF Den Da 12",
  "CF ST 16",
  "CF Sua Nang",
  "CF Den Nang",
  "CF ST 22",
  "CF ST 35",
  "Cheesecake Cookie",
  "CF Muoi 16",
  "CF ST 26",
  "CF ST 30",
];

export default function BanHang() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");

  const columns = [
    { title: "#", dataIndex: "index", key: "index" },
    { title: "Tên sản phẩm", dataIndex: "name", key: "name" },
    { title: "Giá bán", dataIndex: "price", key: "price" },
    { title: "Số lượng", dataIndex: "qty", key: "qty" },
    { title: "Giảm giá", dataIndex: "discount", key: "discount" },
    { title: "Số tiền", dataIndex: "total", key: "total" },
  ];

  const handleAddProduct = (name) => {
    const item = {
      key: items.length,
      index: items.length + 1,
      name,
      price: 25000,
      qty: 1,
      discount: 0,
      total: 25000,
    };
    setItems([...items, item]);
  };

  return (
    <div
      style={{
        display: "flex",
        padding: 12,
        background: "#cfe8fc",
        height: "100vh",
      }}
    >
      {/* Left Panel - Order List */}
      <div style={{ width: "60%", paddingRight: 12 }}>
        <Card title="Danh sách sản phẩm" bordered>
          <Table
            dataSource={items}
            columns={columns}
            pagination={false}
            size="small"
          />
          <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
            <Button type="primary">Qty</Button>
            <Button danger>Del</Button>
            <Button danger>DelAll</Button>
            <Button>Cancel</Button>
            <Button type="primary" style={{ background: "#f90" }}>
              Pay
            </Button>
          </div>
        </Card>
      </div>

      {/* Right Panel - Menu & Input */}
      <div style={{ width: "40%" }}>
        <Card title="Chọn sản phẩm">
          <Row gutter={[8, 8]}>
            {sampleMenu.map((item, index) => (
              <Col span={8} key={index}>
                <Button
                  style={{ width: "100%" }}
                  onClick={() => handleAddProduct(item)}
                >
                  {item}
                </Button>
              </Col>
            ))}
          </Row>
          <div style={{ marginTop: 16 }}>
            <Input.Search
              placeholder="Vui lòng nhập sản phẩm"
              enterButton="Nhập"
              onSearch={(value) => handleAddProduct(value)}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}
