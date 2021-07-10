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
var cids_1 = __importDefault(require("cids"));
var ipfs_http_client_1 = __importDefault(require("ipfs-http-client"));
var DmaArchive_1 = require("../DmaArchive");
var const_1 = require("./const");
var node = ipfs_http_client_1.default.create();
describe('DmaArchive', function () {
    it('put works', function () { return __awaiter(void 0, void 0, void 0, function () {
        var store;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    store = new DmaArchive_1.DmaArchive(node, const_1.CONSTANTS.baseCid);
                    return [4 /*yield*/, expect(store.put({})).resolves.toStrictEqual(new cids_1.default('bafyriqdqjbhwb2nfkbchrg65ckfpwjxawewjccyneooriyma4tdoiv3doramskqyam764vpoxakku6ldeuam6o62kwozpucom6eevm4ibajzi'))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('get works', function () { return __awaiter(void 0, void 0, void 0, function () {
        var store;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    store = new DmaArchive_1.DmaArchive(node, const_1.CONSTANTS.baseCid);
                    return [4 /*yield*/, expect(store.get(new cids_1.default('bafyriqdqjbhwb2nfkbchrg65ckfpwjxawewjccyneooriyma4tdoiv3doramskqyam764vpoxakku6ldeuam6o62kwozpucom6eevm4ibajzi'))).resolves.toStrictEqual({})];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('resolve works', function () { return __awaiter(void 0, void 0, void 0, function () {
        var store;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    store = new DmaArchive_1.DmaArchive(node, const_1.CONSTANTS.baseCidWTwo);
                    return [4 /*yield*/, expect(store.resolve('/media/ebb941ae-419e-4848-8664-57597ddb214e').then(function (value) {
                            console.log(value);
                            return value;
                        })).resolves.toMatchSnapshot()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('update data works', function () { return __awaiter(void 0, void 0, void 0, function () {
        var store;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    store = new DmaArchive_1.DmaArchive(node, const_1.CONSTANTS.baseCidWTwo);
                    return [4 /*yield*/, expect(store.update('/media/ebb941ae-419e-4848-8664-57597ddb214e/source', { hello: 'world' })).resolves.toStrictEqual(new cids_1.default('bafyriqbg6un5nazxiege7t5awfgng7ytwaees4vza5pw2knx3as377kusgabwv7tnhglgvdmjjdalqyyc2vwgsrgfghix3i5cnasjqtoxw3ma'))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('update cid works', function () { return __awaiter(void 0, void 0, void 0, function () {
        var store;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    store = new DmaArchive_1.DmaArchive(node, const_1.CONSTANTS.baseCidWTwo);
                    return [4 /*yield*/, expect(store.update('/media/ebb941ae-419e-4848-8664-57597ddb214e/source', new cids_1.default('bafybeihe7kldclv7zde2guf4pp2ec2tr4pynegh4gr4m57uwgsptnbjfjm')))
                            .resolves.toStrictEqual(new cids_1.default('bafyriqhts76doruqnnzt2ikwhfq4jyigy2ldqf5lwauwgksu2p6pgfitxy3q5sr3tb2znjwyqqb5tu4pyng2bwtiyuj4wjtezmtfvu4vlwvzq'))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('update \'path must start with a "/"\'', function () { return __awaiter(void 0, void 0, void 0, function () {
        var store;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    store = new DmaArchive_1.DmaArchive(node, const_1.CONSTANTS.baseCid);
                    return [4 /*yield*/, expect(store.update('a/b/c', { hello: 'world' })).rejects.toBe('path must start with a "/"')];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('resolve \'path must start with a "/"\'', function () { return __awaiter(void 0, void 0, void 0, function () {
        var store;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    store = new DmaArchive_1.DmaArchive(node, const_1.CONSTANTS.baseCid);
                    return [4 /*yield*/, expect(store.resolve('a/b/c')).rejects.toBe('path must start with a "/"')];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
