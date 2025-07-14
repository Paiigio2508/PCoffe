import { getHeader, requestAdmin } from "../../helper/request";

export class SanPhamAPI {
  static getAll = () => {
    const getToken = getHeader();
    return requestAdmin({
      method: "GET",
      url: `/admin/san-pham`,
      //   headers: {
      //     Authorization: getToken,
      //   },
    });
  };
  static search = (data) => {
    const getToken = getHeader();
    return requestAdmin({
      method: "POST",
      url: `/admin/san-pham/tim-kiem`,
      data: data,
      headers: {
        Authorization: getToken,
      },
    });
  };
  static create = (data) => {
    const getToken = getHeader();
    return requestAdmin({
      method: "POST",
      url: `/admin/san-pham/add`,
      data: data,
      headers: {
        Authorization: getToken,
      },
    });
  };
  static updateDN = (id, data) => {
    const getToken = getHeader();
    return requestAdmin({
      method: "PUT",
      url: `admin/san-pham/update/${id}`,
      data: data,
      headers: {
        Authorization: getToken,
      },
    });
  };
  static detailDN = (id) => {
    const getToken = getHeader();
    return requestAdmin({
      method: "GET",
      url: `/admin/san-pham/detail/${id}`,
      headers: {
        Authorization: getToken,
      },
    });
  };
}
