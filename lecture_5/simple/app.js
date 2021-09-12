"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var express = require("express");
var body_parser_1 = require("body-parser");
var mongodb_1 = require("mongodb");
var app = express();
mongodb_1.MongoClient.connect("mongodb://localhost:27017")
    .then(function (client) {
    var db = client.db("node_course");
    init(db);
})["catch"](function (err) { return console.error("DB error", err); });
var init = function (db) {
    // middlewares
    app.use((0, body_parser_1.urlencoded)({ extended: true }));
    // routes
    app.get("/", function (req, res) {
        res.send("Welcome to People api");
    });
    app.get("/people", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, skipRaw, limitRaw, limit, skip, result;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.query, skipRaw = _a.skip, limitRaw = _a.limit;
                    limit = Number(limitRaw) || undefined;
                    skip = Number(skipRaw) || undefined;
                    return [4 /*yield*/, db
                            .collection("people")
                            .find({}, {
                            limit: limit,
                            skip: skip
                        })
                            .toArray()];
                case 1:
                    result = _b.sent();
                    return [2 /*return*/, res.json({
                            result: result,
                            params: {
                                skip: skip,
                                limit: limit
                            },
                            metaData: {
                                length: result.length
                            }
                        })];
            }
        });
    }); });
    app["delete"]("/people", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var result, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, db.collection("people").deleteMany({})];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, res.json({
                            result: result,
                            metaData: {}
                        })];
                case 2:
                    err_1 = _a.sent();
                    next(err_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    // error handling
    app.use(function (req, res) {
        res.status(404).json("Not found");
    });
    app.use(function (err, req, res, next) {
        console.error(err.stack);
        res.status(500).json("Internal server error");
    });
    app.listen(3000, function () { return console.log("Api is listening on port 3000"); });
};
