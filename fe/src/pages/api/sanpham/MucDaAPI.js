import { getHeader, requestAdmin } from "../../helper/request";

export class MucDaAPI {
  static getAll = () => {
    const getToken = getHeader();
    return requestAdmin({
      method: "GET",
      url: `/admin/muc-da`,
      //   headers: {
      //     Authorization: getToken,
      //   },
    });
  };
  static search = (data) => {
    const getToken = getHeader();
    return requestAdmin({
      method: "POST",
      url: `/admin/muc-da/tim-kiem`,
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
      url: `/admin/muc-da/add`,
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
      url: `admin/muc-da/update/${id}`,
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
      url: `/admin/muc-da/detail/${id}`,
      headers: {
        Authorization: getToken,
      },
    });
  };
}
