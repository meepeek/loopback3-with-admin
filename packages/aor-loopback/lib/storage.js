"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    save: function save(key, value) {
        if (typeof Storage == "undefined") {
            return false;
        }
        localStorage.setItem(key, value);
        return value;
    },
    load: function load(key) {
        if (typeof Storage == "undefined") {
            return false;
        }
        var token = localStorage.getItem(key);
        return { id: token };
    },
    remove: function remove(key) {
        if (typeof Storage == "undefined") {
            return false;
        }
        localStorage.removeItem(key);
    }
};