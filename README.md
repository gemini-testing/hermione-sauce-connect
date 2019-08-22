# hermione-sauce-connect

Plugin for [hermione](https://github.com/gemini-testing/hermione) to launch an instance of [Sauce Connect Proxy](https://saucelabs.com/docs/sauce-connect) when integration testing started.

You can read more about hermione plugins [here](https://github.com/gemini-testing/hermione#plugins).

## Installation

```bash
npm install hermione-sauce-connect
```

## Usage

Plugin has following configuration:

* **enabled** (optional) `Boolean` – enable/disable the plugin; by default plugin is enabled
* **username** (required) `String` - Sauce Labs username.
* **accessKey** (required) `String` - Sauce Labs access key.
* **verbose** (optional) `Boolean` - detail log output from the Sauce Connect process to console; `false` by default.

**:warning: Do not commit your Sauce Labs credentials.**

Also there is ability to override plugin parameters by CLI options or environment variables
(see [configparser](https://github.com/gemini-testing/configparser)).
Use `hermione_sauce_connect_` prefix for the environment variables and `--sauce-connect-` for the cli options.

For example you can override accessKey option like so:
```bash
$ hermione_sauce_connect_access_key=some-key hermione test
$ hermione test --sauce-connect-access-key some-key
```

Add plugin to your `hermione` config file:

```js
module.exports = {
    // ...
    plugins: {
        'hermione-sauce-connect': {
            username: 'example-username',
            accessKey: 'example-accessKey'
        }
    },
    //...
}
```

## Testing

Run [mocha](http://mochajs.org) tests:
```bash
npm run test-unit
```

Run [eslint](http://eslint.org) codestyle verification
```bash
npm run lint
```
