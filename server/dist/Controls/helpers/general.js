"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uid = void 0;
function uid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
exports.uid = uid;
//# sourceMappingURL=general.js.map