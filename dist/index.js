"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultConfig = void 0;
__exportStar(require("./modules/utils"), exports);
var axios_1 = __importDefault(require("axios"));
var loglevel_1 = __importDefault(require("loglevel"));
var utils_1 = require("./modules/utils");
var log = loglevel_1.default.getLogger("what-spider");
log.setLevel(log.levels.DEBUG);
function defaultConfig() {
    return { maxConnection: 0, log: true };
}
exports.defaultConfig = defaultConfig;
function Spider(params) {
    var _a, _b;
    var config = (_a = params.config) !== null && _a !== void 0 ? _a : defaultConfig();
    if (config.log === false) {
        log.disableAll();
    }
    var onError = (_b = params.onError) !== null && _b !== void 0 ? _b : (function (_) { return false; });
    var io = axios_1.default.create(config.fetchConfig);
    var data = __assign(__assign({}, params), { onError: onError,
        config: config,
        io: io, connection: 0, tasks: [] });
    return function (url) {
        Fetch(url, data);
    };
}
exports.default = Spider;
function Fetch(url, data) {
    return __awaiter(this, void 0, void 0, function () {
        var configList, list, configList_1, configList_1_1, _config, flag, _a, _b, ex, url_1, e_1_1, e_2_1;
        var e_2, _c, e_1, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    if (!Array.isArray(url)) {
                        url = [url];
                    }
                    configList = url.map(function (_url) {
                        var obj = {};
                        if (typeof _url === "string") {
                            obj.url = _url;
                        }
                        else {
                            obj = _url;
                        }
                        return obj;
                    });
                    list = [];
                    _e.label = 1;
                case 1:
                    _e.trys.push([1, 15, 16, 17]);
                    configList_1 = __values(configList), configList_1_1 = configList_1.next();
                    _e.label = 2;
                case 2:
                    if (!!configList_1_1.done) return [3 /*break*/, 14];
                    _config = configList_1_1.value;
                    if (!_config.url) {
                        return [3 /*break*/, 13];
                    }
                    flag = true;
                    _e.label = 3;
                case 3:
                    _e.trys.push([3, 10, 11, 12]);
                    _a = (e_1 = void 0, __values(data.rules)), _b = _a.next();
                    _e.label = 4;
                case 4:
                    if (!!_b.done) return [3 /*break*/, 9];
                    ex = _b.value;
                    url_1 = _config.url;
                    if (!(typeof ex === "function")) return [3 /*break*/, 6];
                    return [4 /*yield*/, ex(url_1)];
                case 5:
                    flag = _e.sent();
                    return [3 /*break*/, 7];
                case 6:
                    flag = ex.test(url_1);
                    _e.label = 7;
                case 7:
                    if (!flag)
                        return [3 /*break*/, 9];
                    _e.label = 8;
                case 8:
                    _b = _a.next();
                    return [3 /*break*/, 4];
                case 9: return [3 /*break*/, 12];
                case 10:
                    e_1_1 = _e.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 12];
                case 11:
                    try {
                        if (_b && !_b.done && (_d = _a.return)) _d.call(_a);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7 /*endfinally*/];
                case 12:
                    if (flag) {
                        list.push(_config);
                    }
                    _e.label = 13;
                case 13:
                    configList_1_1 = configList_1.next();
                    return [3 /*break*/, 2];
                case 14: return [3 /*break*/, 17];
                case 15:
                    e_2_1 = _e.sent();
                    e_2 = { error: e_2_1 };
                    return [3 /*break*/, 17];
                case 16:
                    try {
                        if (configList_1_1 && !configList_1_1.done && (_c = configList_1.return)) _c.call(configList_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                    return [7 /*endfinally*/];
                case 17:
                    data.tasks = data.tasks.concat(list);
                    goRun(data);
                    return [2 /*return*/];
            }
        });
    });
}
function goRun(data) {
    var _this = this;
    var configList = [];
    if (data.config.maxConnection === 0 || !data.config.maxConnection) {
        configList = data.tasks;
        data.tasks = [];
    }
    else if (data.connection < data.config.maxConnection) {
        configList = data.tasks.splice(0, data.config.maxConnection - data.connection);
    }
    configList.forEach(function (cfg) {
        data.connection++;
        log.debug(utils_1.getLogTime() + "fetch start: " + cfg.url);
        data
            .io(cfg)
            .then(function (val) { return __awaiter(_this, void 0, void 0, function () {
            var resp, _a, _b, parse, e_3_1;
            var e_3, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        log.debug(utils_1.getLogTime() + "fetch finish: " + cfg.url);
                        resp = val;
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 6, 7, 8]);
                        _a = __values(data.parses), _b = _a.next();
                        _d.label = 2;
                    case 2:
                        if (!!_b.done) return [3 /*break*/, 5];
                        parse = _b.value;
                        if (!resp)
                            return [2 /*return*/];
                        return [4 /*yield*/, parse(cfg.url, resp)];
                    case 3:
                        resp = (_d.sent()) || null;
                        _d.label = 4;
                    case 4:
                        _b = _a.next();
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        e_3_1 = _d.sent();
                        e_3 = { error: e_3_1 };
                        return [3 /*break*/, 8];
                    case 7:
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_3) throw e_3.error; }
                        return [7 /*endfinally*/];
                    case 8: return [2 /*return*/];
                }
            });
        }); })
            .catch(function (err) {
            var _a, _b, _c, _d, _e;
            log.warn(utils_1.getLogTime() + "fetch error: " + cfg.url + " \n", err.message);
            var isRetry = data.onError(err);
            if (isRetry && ((_b = (_a = cfg === null || cfg === void 0 ? void 0 : cfg.meta) === null || _a === void 0 ? void 0 : _a._retry) !== null && _b !== void 0 ? _b : 0) < ((_c = data.config.retry) !== null && _c !== void 0 ? _c : 0)) {
                if (!cfg.meta) {
                    cfg.meta = {
                        _retry: 0,
                    };
                }
                cfg.meta._retry = ((_e = (_d = cfg.meta) === null || _d === void 0 ? void 0 : _d.retry) !== null && _e !== void 0 ? _e : 0) + 1;
                Fetch(cfg, data);
            }
        })
            .finally(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!data.config.delay) return [3 /*break*/, 2];
                        return [4 /*yield*/, utils_1.sleep(data.config.delay)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        data.connection--;
                        goRun(data);
                        return [2 /*return*/];
                }
            });
        }); });
    });
}
