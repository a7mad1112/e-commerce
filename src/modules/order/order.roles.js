import { roles } from "../../roles.js";
export const endPoints = {
  create: [roles.User],
  cancel: [roles.User],
  getOrders: [roles.User],
  changeStatus: [roles.Admin],
};