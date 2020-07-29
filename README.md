Demo: [https://mapa.falanster.by/](https://mapa.falanster.by/)

## Development

[![BrowserStack Status](https://www.browserstack.com/automate/badge.svg?badge_key=xpWn1c3XZHhwL6V72SJK
)](https://www.browserstack.com/automate/public-build/xpWn1c3XZHhwL6V72SJK)
[![Build Status](https://secure.travis-ci.org/flosse/kartevonmorgen.svg?branch=master)](http://travis-ci.org/flosse/kartevonmorgen)
[![License](https://img.shields.io/badge/license-AGPLv3-blue.svg?style=flat)](https://github.com/flosse/kartevonmorgen/blob/master/LICENSE)

Are you're interested in contributing to KVM?
The following is a description of a quickstart.
If you're looking for a more comprehensive introduction,
have a look at [CONTRIBUTING.md](CONTRIBUTING.md).

### 1. Dependencies

To be able to start development you'll need the following tools:

- [git](https://www.git-scm.com/)
- [Node.js](https://nodejs.org/) version 8.x
- [Yarn](https://yarnpkg.com/en/docs/getting-started) or [npm](https://www.npmjs.com/package/npm) version 3.x
- [OpenFairDB](https://github.com/slowtec/openfairdb)

Now clone this repository:

    git clone https://github.com/diglabby/mapa.git

Go to the root of it and install all the dependencies:

    cd mapa/
    yarn install
or 
    
    npm install
    
### 2. OpenFairDB local development setup

The easiest way to get a local setup running is by using the remote API of [OpenFairDB](https://github.com/slowtec/openfairdb).
To do so change `src/constants/URLs.js` to
https://github.com/goodmap/goodmap-old/blob/e9658f1d2a8d77effe4cfabc085b5c7a2c65c3f3/src/constants/URLs.js#L64

``` js
OFDB_API: {
  //link: window.location.origin + "/api" //use when you run openfairdb locally
  link: window.location.protocol + "//" + "api.ofdb.io/v0" //use this to use the remote api
//    link: window.location.protocol + "//" + "dev.ofdb.io/v0" //if you want to work with development environment

}

```

The alternative is to run OpenFairDB Server locally:

#### 2.1. Linux setup:

``` sh
wget https://github.com/slowtec/openfairdb/releases/download/v0.5.5/openfairdb_v0.5.5.x86_64-unknown-linux-musl.tar.xz
tar xzf openfairdb_v0.5.5.x86_64-unknown-linux-musl.tar.xz
./openfairdb
```

To actually get started you also need to add some [content](https://github.com/flosse/openfairdb/files/2511314/openfair.db.zip). (Save database, copy it to openfairdb directory, unzip and override the previous database).

Change this file `webpack.config.babel.js` according to this [commit](https://github.com/kartevonmorgen/kartevonmorgen/pull/583/commits/b5d967c752df4b2e138e30fdbeb7101b5354be1c). And `src/constants/URLs.js` according to this [commit](https://github.com/kartevonmorgen/kartevonmorgen/pull/583/commits/57cb6aa7bfe590130b93ed1236b7bf88ee8dac1a)

Launch OpenfairDB

    RUST_LOG=info ROCKET_PORT=6767 DATABASE_URL=openfair.db ./openfairdb

from 
/path/to/openfairdb/ directory.

`openfairdb` should now be listening on port 6767.

If both `openfairdb` and `mapa` app are running, but no entries are displayed in `mapa` and you have an `ECONNREFUSED` error in console, then you should do the following:

1. Go to file `webpack.config.babel.js`.
2. Change line 25 to this: ```target: "http://[::1]:6767",```
3. Rerun the `mapa` app.

#### 2.2. Docker setup:

1. Clone the [openfairdb](https://github.com/slowtec/openfairdb) repo.
2. Go to `openfairdb` folder: `cd ./openfairdb`
3. Build image and run the container by commands from [openfairdb](https://github.com/slowtec/openfairdb#docker) repo
4. `openfairdb` should now be listening on port 6767.

### 3. Get the web app running:

``` sh
    cd /path/to/mapa/
    yarn start
```
or 
```
    npm start
```

The web app is now listening on port 8080.
Open it in your browser `https://localhost:8080`.

On every file change in `src/`, the app will be build
for you and the browser reloads automatically.

### 4. Tests

All the tests can be found in the `spec/` folder.
To run the tests type

    npm t

### 5. Backend

KVM uses the [OpenFairDB](https://github.com/slowtec/openfairdb) as its backend.

## License

Copyright (c) 2015 - 2018 Markus Kohlhase <mail@markus-kohlhase.de>
This project is licensed under the [AGPLv3 license](http://www.gnu.org/licenses/agpl-3.0.txt).
