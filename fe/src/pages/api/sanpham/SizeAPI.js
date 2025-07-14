import { getHeader, requestAdmin } from "../../helper/request";

export class SizeAPI {
  static getAll = () => {
    const getToken = getHeader();
    return requestAdmin({
      method: "GET",
      url: `/admin/size`,
      //   headers: {
      //     Authorization: getToken,
      //   },
    });
  };
  static search = (data) => {
    const getToken = getHeader();
    return requestAdmin({
      method: "POST",
      url: `/admin/size/tim-kiem`,
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
      url: `/admin/size/add`,
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
      url: `admin/size/update/${id}`,
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
      url: `/admin/size/detail/${id}`,
      headers: {
        Authorization: getToken,
      },
    });
  };
}
