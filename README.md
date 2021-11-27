### Development workflow
Install npm packages

```angular2html
$ npm install
```

After that, all you have to do is to run the watch task defined in gulpfile.js
```angular2html
$ npx gulp watch
```
And then, you can start working on the source files.

At startup, the watch task will build files and save them in `public` folder structure.

Stylesheets must be located under `./src/styles`, and all Javascript files must be located 
under `./src/js`. Subdirectories are allowed.

As long as the watch task runs, JS files and stylesheets will be automatically concatenated in one file of their respective type. 
By default, JS files will all be contained in `./public/js/websheet.js` and stylesheets in
`./public/css/websheet.css`.

Other available gulp tasks are:
```angular2html
$ npx gulp build   // only builds the files
$ npx gulp minify  // minifies already built files
```

Minified files will be located next to built files, and have `.min.js (or .min.css)` extension.


**Note**: we can (and should) use SCSS / SASS for styling. The build tasks includes a conversion to standard CSS. 
