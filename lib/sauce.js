'use strict';

const {promisify} = require('util');
const sauceConnectLauncher = require('sauce-connect-launcher');
const launchSauceConnect = promisify(sauceConnectLauncher);

module.exports = class Sauce {
    static create(config) {
        return new this(config);
    }

    constructor(config) {
        this._config = config;
        this._sauceConnectProcess = null;
    }

    async start() {
        const {username, accessKey, verbose} = this._config;

        this._sauceConnectProcess = await launchSauceConnect({username, accessKey, logger: console.log, verbose});
    }

    stop() {
        return this._sauceConnectProcess.close();
    }
};
