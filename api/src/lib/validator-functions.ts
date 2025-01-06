import { body, param } from "express-validator";
export function validateProductName() {
  return body("name").notEmpty().isString().trim().escape();
}

export function validatePriceValue() {
  return body("value").notEmpty().isNumeric().trim().escape();
}

export function validateIdParam() {
  return param("id").toInt().isInt();
}
