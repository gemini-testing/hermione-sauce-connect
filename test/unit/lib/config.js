'use strict';

const parseConfig = require('lib/config');

describe('lib/config', () => {
    const getDefaultOpts = () => ({
        username: 'some-user',
        accessKey: 'some-key'
    });

    describe('"enabled" option', () => {
        it('should be true by default', () => {
            const opts = getDefaultOpts();

            assert.isTrue(parseConfig(opts).enabled);
        });

        it('should be set from configuration file', () => {
            const opts = getDefaultOpts();
            opts.enabled = false;

            const config = parseConfig(opts);

            assert.isFalse(config.enabled);
        });

        it('should throw error if passed value is not boolean', () => {
            const opts = getDefaultOpts();
            opts.enabled = 'false';

            assert.throws(() => parseConfig(opts), /option must be boolean, but got string/);
        });
    });

    [
        {optionName: 'username'},
        {optionName: 'accessKey'}
    ].forEach(({optionName}) => {
        describe(`"${optionName}" option`, () => {
            it('should throws on missing', () => {
                const opts = getDefaultOpts();
                delete opts[optionName];

                assert.throws(() => parseConfig(opts));
            });

            it('should be set from configuration file', () => {
                const opts = getDefaultOpts();
                opts[optionName] = 'foo-bar';

                const config = parseConfig(opts);

                assert.equal(config[optionName], 'foo-bar');
            });

            it('should validate if passed value is number', () => {
                const opts = getDefaultOpts();
                opts[optionName] = 10;

                assert.throws(() => parseConfig(opts), /option must be string, but got number/);
            });
        });
    });

    describe('"verbose" option', () => {
        it('should be false by default', () => {
            const opts = getDefaultOpts();

            assert.isFalse(parseConfig(opts).verbose);
        });

        it('should be set from configuration file', () => {
            const opts = getDefaultOpts();
            opts.verbose = true;

            const config = parseConfig(opts);

            assert.isTrue(config.verbose);
        });

        it('should validate if passed value is string', () => {
            const opts = getDefaultOpts();
            opts.verbose = 'false';

            assert.throws(() => parseConfig(opts), /option must be boolean, but got string/);
        });
    });
});
