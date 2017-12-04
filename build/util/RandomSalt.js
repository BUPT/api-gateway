"use strict";
/**
 * @author: 林贻民
 * @description: 产生指定长度的随机字符串盐值
 */
Object.defineProperty(exports, "__esModule", { value: true });
class RandomSalt {
    constructor() {
        this._char = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }
    /**
     * 产生长度为n的随机字符串盐值
     * @param n
     */
    generateRandomSalt(n) {
        let data = [];
        for (let i = 0; i < n; i++) {
            let k = Math.floor(Math.random() * 62);
            data[i] = this._char[k];
        }
        return data.join("");
    }
}
exports.RandomSalt = RandomSalt;
