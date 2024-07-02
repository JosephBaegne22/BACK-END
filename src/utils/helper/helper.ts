import e, { NextFunction, Response } from "express";
import mongoose from "mongoose";
import { readFileSync } from "fs";
import HttpStatus from "http-status-codes";

const { ObjectId } = mongoose.Types;

export class Helper {

  static createCookie(tokenData) {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
  }
  
  static createResponse(res, status, message, payload): any {
    return res.status(status).json({
      status: status,
      message: message,
      payload: payload,
    });
  }


  static createResponseV2 = ({
    message,
    payload = {},
    res,
    status,
  }: // pager
    // code
    {
      res: Response;
      status: any;
      message: string;
      payload?: object;
      // pager?: object;
      // code?: string;
    }) => {
    // pager = pager !== undefined ? pager : {};
    return res.status(Number(status)).json({
      status,
      message,
      payload,
      // pager: pager
      // code
    });
  };



  static generateOTP(length): any {
    // Declare a digits variable
    // which stores all digits
    let digits = "0123456789";
    let OTP = "";

    for (let i = 0; i < length; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  }


  static readHTMLFile(path) {
    return new Promise(async (resolve, reject) => {
      try {
        let html = await readFileSync(path, { encoding: "utf-8" });
        resolve(html);
      } catch (error) {
        reject(error);
      }
    });
  }

  static async createValidationResponse(res: Response, errors: any) {
    return Helper.createResponse(
      res,
      HttpStatus.UNPROCESSABLE_ENTITY,
      res["__"](errors[Object.keys(errors)[0]]),
      {
        error: res["__"](errors[Object.keys(errors)[0]]),
      }
    );
  }

  static async createValidationResponseV2(res: Response, errors: any) {
    return Helper.createResponse(
      res,
      HttpStatus.UNPROCESSABLE_ENTITY,
      errors[Object.keys(errors)[0]],
      {
        error: errors[Object.keys(errors)[0]],
      }
    );
  }


  static returnErrorOrPassToNext(
    res: Response,
    next: NextFunction,
    errors: any
  ) {
    if (Object.keys(errors).length > 0) {
      Helper.createValidationResponse(res, errors);
    } else {
      next();
    }
  }

  static returnErrorOrPassToNextV2(
    res: Response,
    next: NextFunction,
    errors: any
  ) {
    if (Object.keys(errors).length > 0) {
      Helper.createValidationResponseV2(res, errors);
    } else {
      next();
    }
  }


  static safeJSONParser(value, defaultValue = null) {
    try {
      return JSON.parse(value);
    } catch (error) {
      return defaultValue ? defaultValue : value;
    }
  }


  static randPassword(capitals, numbers, lower, special) {
    var chars = [
      "ABCDEFGHIJKLMNOPQRSTUVWXYZa",
      "0123456789",
      "abcdefghijklmnopqrstuvwxyz",
      "!@#$%^&*",
    ];

    return [capitals, numbers, lower, special]
      .map(function (len, i) {
        return Array(len)
          .fill(chars[i])
          .map(function (x) {
            return x[Math.floor(Math.random() * x.length)];
          })
          .join("");
      })
      .concat()
      .join("")
      .split("")
      .sort(function () {
        return 0.5 - Math.random();
      })
      .join("");
  }

  static randomString(length) {
    var chars =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var result = "";
    for (var i = length; i > 0; --i)
      result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }

  static fixDecimalValue(value, decimalPoint = 2) {
    if (isNaN(value)) {
      return value;
    }
    value = +value;
    let _value = value.toFixed(decimalPoint);
    _value = Number(_value);
    return isNaN(_value) ? value : Number(_value);
  }


  static getStringWithSeparator(arr: any[], separator: string = ", ") {
    const myArr = arr
      .filter((e) => e.value)
      .map((i) => `${i.title || ""}${i.value}`);
    return myArr.join(separator);
  }

  static capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  static getKeyByValue = (object, value) => {
    return Object.keys(object).find((key) => object[key] == value);
  };

  static escapeRegexSpecialChars(input) {
    return input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}
