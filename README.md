Hdd Scheduler Simulator
=======================

Dependencies
------------

All dependencies are handled in the [package.json](./package.json) file.

```bash
npm install
```

Development
-----------

Compilation is done using webpack:

```bash
npm run webpack
```

Theres also a script to wacht for file changes and recompile on demand after
saving a file.

```bash
npm run watch
```

To start a server that also compiles on demand thers the `serve` script;
Configurations are under the `devServer` key inside
[webpack.config.js](./webpack.config.js)
```bash
npm run serve
```

The project also counts with a [yat.sh][yat_sh] [session file](./hdd) to automatically
create a tmux session ready for development.

[yat_sh]: http://github.com/farfanoide/yat.sh

Tests
-----

The project aims to have a comprehensive suite of tests for the algorithms
library. It runs automatically on Travis, to run it locally make sure you have
installed the requirements with `npm install` and then run the following
commmand:

```bash
npm run test
```

