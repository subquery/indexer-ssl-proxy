"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const process_1 = __importDefault(require("process"));
const PORT = parseInt(process_1.default.env.PORT || "3000");
const fastify = (0, fastify_1.default)({
// logger: {
//   timestamp: () => `,"timestamp":"${new Date().toISOString()}"`,
//   messageKey: "message",
//   useLevelLabels: true,
//   base: null,
// },
// disableRequestLogging: true,
});
fastify.get("*", async (request, reply) => {
    console.log(JSON.stringify(request, null, 2));
});
fastify.listen(PORT, "0.0.0.0", (err, address) => {
    if (err)
        throw err;
    fastify.log.info(`server listening on ${address}`);
});
