'use strict';

const proxyquire = require('proxyquire');
const Sauce = require('lib/sauce');
const {stubTool} = require('./utils');

describe('index', () => {
    let plugin;
    let parseConfig = sinon.stub();

    const mkHermione_ = (config = {}, events) => stubTool(config, events);

    const initPlugin = (hermione, opts = {enabled: true}) => {
        parseConfig.returns(opts);
        return plugin(hermione, opts);
    };

    beforeEach(() => {
        plugin = proxyquire('index', {
            './lib/config': parseConfig
        });

        sinon.stub(Sauce, 'create').returns(Object.create(Sauce.prototype));
        sinon.stub(Sauce.prototype, 'start').resolves();
        sinon.stub(Sauce.prototype, 'stop').resolves();
    });

    afterEach(() => sinon.restore());

    it('should does nothing if plugin is disabled', () => {
        initPlugin(mkHermione_(), {enabled: false});

        assert.notCalled(Sauce.create);
    });

    it('should create a sauce instance', () => {
        initPlugin(mkHermione_(), {enabled: true, foo: 'bar'});

        assert.calledOnceWith(Sauce.create, {enabled: true, foo: 'bar'});
    });

    it('should start connection process', async () => {
        const hermione = mkHermione_();

        initPlugin(hermione);
        await hermione.emitAndWait(hermione.events.RUNNER_START);

        assert.calledOnce(Sauce.prototype.start);
    });

    it('should stop connection process', async () => {
        const hermione = mkHermione_();

        initPlugin(hermione);
        await hermione.emitAndWait(hermione.events.RUNNER_END);

        assert.calledOnce(Sauce.prototype.stop);
    });
});
