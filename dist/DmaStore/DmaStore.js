"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DmaStore = void 0;
var cids_1 = __importDefault(require("cids"));
var DmaArchive_1 = require("../DmaArchive");
var DmaStore = /** @class */ (function () {
    function DmaStore(node, cid) {
        this.node = node;
        this.archive = new DmaArchive_1.DmaArchive(node, cid !== null && cid !== void 0 ? cid : new cids_1.default('bafyriqbp63xyywdqeoij36kxnh7jwqkvrfwn2toju3o3no7jcxpopjwhw4sz5vwwl5i3zizaxbmngkwwhc6cn72wijcedqhybirp62ahgigs6'));
    }
    DmaStore.prototype.initialize = function (name) {
        var _this = this;
        if (name === void 0) { name = 'DmaStore'; }
        return new Promise(function (resolve, reject) {
            _this.archive.put({}).then(function (cid) {
                return _this.archive.put({
                    name: name,
                    media: cid,
                    version: 1,
                });
            }).then(function (cid) {
                _this.archive = new DmaArchive_1.DmaArchive(_this.node, cid);
                console.log('initialize', cid);
                resolve();
            }).catch(reject);
        });
    };
    DmaStore.prototype.writeMedia = function (media) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var mediaCid;
            var archive;
            _this.archive.put(media).then(function (cid) {
                mediaCid = cid;
                return _this.archive.fetch();
            }).then(function (a) {
                archive = a;
                return _this.archive.get(a.media);
            }).then(function (mediaList) {
                mediaList[media.id] = mediaCid;
                return _this.archive.put(mediaList);
            }).then(function (mediaListCid) {
                archive.media = mediaListCid;
                return _this.archive.set(archive);
            }).then(function (cid) {
                console.log('writeMedia', cid);
                resolve(cid);
            }).catch(reject);
        });
    };
    DmaStore.prototype.readMedia = function (id) {
        return this.archive.resolve("/media/" + id);
    };
    DmaStore.prototype.getRoot = function () {
        return this.archive.fetch();
    };
    DmaStore.prototype.export = function () {
        return this.archive.export();
    };
    return DmaStore;
}());
exports.DmaStore = DmaStore;
