import { roles } from "../../roles.js";
export const endPoints = {
  create: [roles.Admin],
  getAll: [roles.Admin],
  update: [roles.Admin],
  delete: [roles.Admin],
};