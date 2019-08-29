'use strict';

const QEmitter = require('qemitter');

const defaultEvents = {
    RUNNER_START: 'fooBarStartRunner',
    RUNNER_END: 'fooBarEndRunner'
};

exports.stubTool = (config, events = defaultEvents) => {
    const tool = new QEmitter();

    tool.config = config;
    tool.events = events;

    return tool;
};
