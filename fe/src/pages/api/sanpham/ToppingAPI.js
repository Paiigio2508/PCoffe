import { getHeader, requestAdmin } from "../../helper/request";

export class ToppingAPI {
  static getAll = () => {
    const getToken = getHeader();
    return requestAdmin({
      method: "GET",
      url: `/admin/topping`,
      //   headers: {
      //     Authorization: getToken,
      //   },
    });
  };
  static search = (data) => {
    const getToken = getHeader();
    return requestAdmin({
      method: "POST",
      url: `/admin/topping/tim-kiem`,
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
      url: `/admin/topping/add`,
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
      url: `admin/topping/update/${id}`,
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
      url: `/admin/topping/detail/${id}`,
      headers: {
        Authorization: getToken,
      },
    });
  };
}
