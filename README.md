# Overreact

[![Build Status](https://travis-ci.org/kazupooot/overreact.svg?branch=master)](https://travis-ci.org/kazupooot/overreact)

A command line interface tool for generating template for React/Redux.
Inspired by [mantra-cli](https://github.com/mantrajs/mantra-cli).


## Installation

    npm install -g overreact

## Documentation

The available commands are:

* [generate](https://github.com/kazupooot/overreact#overreact-generate)

Currently, CLI expects you to be in the app root directory.

---------------------------------------

### overreact generate [type] [name]
*alias: g*

Generate a file of `type` and name specified `name`.

#### type

Possible values are:

* `component`

Generates component using ES2015 class extending `React.Component`.
`overreact generate component todos:add`

* `container`

Generates a `container` and its corresponding `component` with `duck.js`.
`overreact generate component todos:add`

For `component`, `container` tests will also be generated.


#### name

The name should follow the format `featureName:entityName`.

*Example*

    overreact generate component todos:subHeader
    overreact generate container todos:list

---------------------------------------

## License

MIT
