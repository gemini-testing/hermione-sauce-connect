'use strict';

const _ = require('lodash');
const proxyquire = require('proxyquire');

describe('lib/sauce', () => {
    let Sauce;
    let sauceConnectLauncher;

    const mkSauce_ = (opts = {}) => {
        opts = _.defaults(opts, {
            username: 'default-user',
            accessKey: 'default-key'
        });

        return Sauce.create(opts);
    };

    beforeEach(() => {
        sauceConnectLauncher = sinon.stub();
        Sauce = proxyquire('lib/sauce', {
            'sauce-connect-launcher': sauceConnectLauncher
        });
    });

    afterEach(() => sinon.restore());

    describe('.create', () => {
        it('should return a sauce instance', () => {
            assert.instanceOf(mkSauce_(), Sauce);
        });
    });

    describe('.start', () => {
        it('should opening local tunnel using Sauce Connect', async () => {
            sauceConnectLauncher.yields();
            const sauce = mkSauce_();

            await sauce.start();

            assert.calledOnce(sauceConnectLauncher);
        });

        it('should not establish a connection if were passed invalid credentials', () => {
            sauceConnectLauncher.rejects(new Error('could not establish a connection'));
            const sauce = mkSauce_();

            assert.isRejected(sauce.start());
        });
    });

    describe('.stop', () => {
        it('should close Sauce Connect connection', async () => {
            const sauceClose = sinon.stub();
            sauceConnectLauncher.yields(null, {
                close: sauceClose
            });
            const sauce = mkSauce_();

            await sauce.start();
            sauce.stop();

            assert.calledOnce(sauceClose);
        });
    });
});
