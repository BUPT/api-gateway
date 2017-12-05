"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GetIP {
    static getClientIP(req) {
        let ipAddress;
        let headers = req.headers;
        let forwardedIpsStr = headers['x-real-ip'] || headers['x-forwarded-for'];
        forwardedIpsStr ? ipAddress = forwardedIpsStr : ipAddress = null;
        if (!ipAddress) {
            ipAddress = req.connection.remoteAddress;
        }
        return ipAddress;
    }
}
exports.GetIP = GetIP;
