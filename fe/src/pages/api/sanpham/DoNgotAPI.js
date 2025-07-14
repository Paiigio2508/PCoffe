import { getHeader, requestAdmin } from "../../helper/request";

export class DoNgotAPI {
  static getAll = () => {
    const getToken = getHeader();
    return requestAdmin({
      method: "GET",
      url: `/admin/do-ngot`,
      //   headers: {
      //     Authorization: getToken,
      //   },
    });
  };
  static search = (data) => {
    const getToken = getHeader();
    return requestAdmin({
      method: "POST",
      url: `/admin/do-ngot/tim-kiem`,
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
      url: `/admin/do-ngot/add`,
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
      url: `admin/do-ngot/update/${id}`,
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
      url: `/admin/do-ngot/detail/${id}`,
      headers: {
        Authorization: getToken,
      },
    });
  };
}
