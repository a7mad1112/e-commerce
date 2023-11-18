import { roles } from "../../roles.js";
export const endPoints = {
  create: [roles.User],
  delete: [roles.User],
  clear: [roles.User],
  get: [roles.User],
};