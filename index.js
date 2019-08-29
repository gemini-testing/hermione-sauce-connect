'use strict';

const Sauce = require('./lib/sauce');
const parseConfig = require('./lib/config');

module.exports = (hermione, opts) => {
    const config = parseConfig(opts);

    if (!config.enabled) {
        return;
    }

    const sauce = Sauce.create(config);

    hermione.on(hermione.events.RUNNER_START, () => sauce.start());
    hermione.on(hermione.events.RUNNER_END, () => sauce.stop());
};
