import {
  getAllFoods,
  addFood,
  removeFood,
  updateFood,
} from "./food.service.js";

export const foodController = {
  getAll: getAllFoods,
  add: addFood,
  remove: removeFood,
  update: updateFood,
};