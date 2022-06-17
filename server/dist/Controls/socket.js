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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userConnect = void 0;
const server_1 = require("../server");
function userConnect(socket) {
    return __awaiter(this, void 0, void 0, function* () {
        socket.on("join-decision", (decisionId) => {
            if (decisionId) {
                socket.join(decisionId);
            }
        });
        socket.on("leave-decision", (decisionId) => {
            if (decisionId) {
                socket.leave(decisionId);
            }
        });
        socket.on("talk-to-decision", ({ decisionId, text }) => {
            try {
                server_1.io.to(decisionId).emit("decision-talk", text);
            }
            catch (error) { }
        });
        socket.on("disconnect", () => {
            console.log("user disconnected");
        });
    });
}
exports.userConnect = userConnect;
//# sourceMappingURL=socket.js.map