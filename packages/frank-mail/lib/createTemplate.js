"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("react-dom/server"));
const createTemplate = (builder) => {
    return (args) => {
        const { subject, body } = builder({
            data: args.data,
        });
        const bodyHtml = server_1.default.renderToStaticMarkup(body);
        const html = `<!doctype html><html><body>${bodyHtml}</body></html>`;
        return {
            subject,
            html,
        };
    };
};
exports.default = createTemplate;
