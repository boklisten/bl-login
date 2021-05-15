# bl-login

`bl-login` is a login and registration module for Boklisten.no. This README is
for development and technical documentation. For a deep-dive into what
`bl-login` is and can do [please read our
documentation](https://github.com/boklisten/bl-doc/blob/master/bl-login#summary)

-   [Requirements](#requirements)
-   [How to run](#how-to-run)
-   [Development](#development)
    -   [NPM scripts](#npm-scripts)
    -   [Build files](#build-files)

# Requirements

-   NodeJS v8.0 or higher
-   Typescript v3.0 or higher
-   bl-api v1.11.2 or higher
-   yarn

# How to run

1. Clone this repo to your own computer `git clone https://github.com/boklisten/bl-login`
2. Navigate into the newly created `bl-login` folder
3. Install npm modules `yarn install`
4. Ensure that `bl-api` is running on `http://localhost:1337`
    - You will not be able to test login or register if `bl-api` is not running.
5. Start application locally with `yarn dev`
6. You should now be able to view `bl-login` on [localhost:4200](http://localhost:4200/#/auth/menu)

# Development

## NPM scripts

#### `yarn dev`

Runs the application and can be viewed on [localhost:4200](http://localhost:4200).

#### `yarn publish`

Builds and publishes the `bl-login` module to npm.

#### `yarn extract-i18n`

Extracts all `i18n` tags from all the html files and puts them into three
differnet `xlf`-file under `./src/locale`.

## Build files

##### `./xliffmerge.json`

This is the settings file for `i18n` the translator `ngx-i18nsupport`. [Read
more](https://www.npmjs.com/package/ngx-i18nsupport).
