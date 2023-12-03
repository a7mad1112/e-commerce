import { roles } from "../../roles.js";
export const endPoints = {
  create: [roles.Admin],
  getAll: Object.values(roles),
  getActive: [roles.User],
  update: [roles.Admin],
  specific: Object.values(roles),
};