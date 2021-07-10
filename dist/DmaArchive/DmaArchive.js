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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DmaArchive = void 0;
var cids_1 = __importDefault(require("cids"));
var DmaArchive = /** @class */ (function () {
    function DmaArchive(node, current) {
        this.node = node;
        this.current = current;
    }
    DmaArchive.prototype.fetch = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.get(_this.current).then(function (obj) {
                resolve(obj);
            }).catch(reject);
        });
    };
    DmaArchive.prototype.get = function (cid) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.node.dag.get(cid).then(function (obj) {
                resolve(obj.value);
            }).catch(reject);
        });
    };
    DmaArchive.prototype.set = function (archive) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.put(archive).then(function (cid) {
                _this.current = cid;
                resolve(cid);
            }).catch(reject);
        });
    };
    DmaArchive.prototype.put = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.node.dag.put(data, { format: 'dag-cbor', hashAlg: 'sha3-512' }).then(function (cid) {
                resolve(cid);
            }).catch(reject);
        });
    };
    DmaArchive.prototype.resolve = function (path) {
        var _this = this;
        if (path.substr(0, 1) != '/')
            return Promise.reject('path must start with a "/"');
        var remainderPath;
        return new Promise(function (resolve, reject) {
            console.log('DmaArchive.resolve', "" + _this.current.toV1() + path);
            _this.node.dag.resolve("" + _this.current.toV1() + path)
                .then(function (res) {
                console.log('resolved');
                remainderPath = res.remainderPath;
                return _this.get(res.cid);
            })
                .then(function (data) {
                if (remainderPath !== '') {
                    var ls = remainderPath.lastIndexOf('/');
                    if (ls === -1) {
                        resolve(data[remainderPath]);
                    }
                    else {
                        //TODO
                        reject(remainderPath);
                    }
                }
                else {
                    resolve(data);
                }
            })
                .catch(reject);
        });
    };
    DmaArchive.prototype.update = function (path, data) {
        var _this = this;
        if (path.substr(0, 1) != '/')
            return Promise.reject('path must start with a "/"');
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (data instanceof cids_1.default) {
                    console.debug('adding CID');
                    this.updateNext(this.current, path, data, resolve, reject);
                }
                else {
                    console.debug('adding arbitrary data');
                    this.put(data).then(function (cid) {
                        console.debug('added arbitrary data', cid);
                        _this.updateNext(_this.current, path, cid, resolve, reject);
                    }).catch(reject);
                }
                return [2 /*return*/];
            });
        }); });
    };
    DmaArchive.prototype.updateNext = function (root, path, current, resolve, reject) {
        var _this = this;
        var name = path.substr(path.lastIndexOf('/') + 1);
        var remainder = path.substr(0, path.lastIndexOf('/'));
        var remainderPath;
        this.node.dag.resolve("" + root.toV1() + remainder)
            .then(function (res) {
            console.log('resolved', res.remainderPath, res.cid);
            remainderPath = res.remainderPath;
            return _this.get(res.cid);
        })
            .then(function (node) {
            console.log('fetched', name, remainderPath, remainder, node);
            //TODO: fix remainderPath
            node[name] = current;
            return _this.put(node);
        })
            .then(function (cid) {
            if (remainder === '') {
                console.log('update', cid);
                resolve(cid);
            }
            else {
                console.log('remainder', remainder);
                _this.updateNext(root, remainder, cid, resolve, reject);
            }
        })
            .catch(reject);
    };
    DmaArchive.prototype.export = function () {
        return Promise.resolve(this.current);
    };
    return DmaArchive;
}());
exports.DmaArchive = DmaArchive;
