import { roles } from "../../roles.js";
export const endPoints = {
  create: [roles.Admin],
  getAll: Object.values(roles),
  update: [roles.Admin],
};