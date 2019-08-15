# hermione-sauce-connect

Plugin for [hermione](https://github.com/gemini-testing/hermione) to launch Sauce Connect when integration testing started.

You can read more about hermione plugins [here](https://github.com/gemini-testing/hermione#plugins).

## Installation

```bash
npm install hermione-sauce-connect
```

### Usage

Add plugin to your `hermione` config file:

```js
module.exports = {
    // ...
    plugins: {
        'hermione-sauce-connect/hermione': {
            // configuration
        }
    },
    //...
}
```
