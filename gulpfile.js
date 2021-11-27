/* eslint-disable */
const gulp      = require('gulp');
const watch     = require('gulp-watch');
const sass      = require('gulp-sass')(require('sass'));
const concat    = require('gulp-concat');
const rename    = require('gulp-rename');
const uglify    = require('gulp-uglify');
const uglifycss = require('gulp-uglifycss');
const gulpif    = require('gulp-if');


// Some constants to help keep things fun to write...

const MINIFIABLE_ASSET_TYPES = ['styles', 'scripts']
const DEFAULT_BUILD_FILE_NAME = 'websheet'

const SOURCE_PATHS = {
    styles: './src/styles/**/*.scss',
    scripts: './src/js/**/*.js'
}

const DESTINATION_PATHS = {
    styles: './public/css/',
    scripts: './public/js/'
}

const DESTINATION_FILE_NAMES = {
    styles: {
        full: `${DEFAULT_BUILD_FILE_NAME}.css`,
        minified: `${DEFAULT_BUILD_FILE_NAME}.min.css`
    },

    scripts: {
        full: `${DEFAULT_BUILD_FILE_NAME}.js`,
        minified: `${DEFAULT_BUILD_FILE_NAME}.min.js`
    }
}

buildStyles = () => {
    return gulp.src(SOURCE_PATHS.styles)
        .pipe(sass().on('error', sass.logError))
        .pipe(concat(DESTINATION_FILE_NAMES.styles.full))
        .pipe(gulp.dest(DESTINATION_PATHS.styles))
}

buildScripts = () => {
    return gulp.src(SOURCE_PATHS.scripts)
        .pipe(concat(DESTINATION_FILE_NAMES.scripts.full))
        .pipe(gulp.dest(DESTINATION_PATHS.scripts))
}

// If one day we want a task to minify one specific type of assets (just the scripts, or just the styles)
// we could make a task for it that calls this function.
// For now, it's just called with a loop in the "minifyAll" function defined below
minifyAsset = (asset_type) => {
    if (MINIFIABLE_ASSET_TYPES.includes(asset_type)) {
        console.log(`Minifying all ${asset_type}...`)
        full_build_file_path = DESTINATION_PATHS[asset_type] + DESTINATION_FILE_NAMES[asset_type].full
        console.log(full_build_file_path);
        return gulp.src(full_build_file_path)
            .pipe(rename(DESTINATION_FILE_NAMES[asset_type].minified))
            .pipe(gulpif(asset_type === 'scripts', uglify()))
            .pipe(gulpif(asset_type === 'styles',  uglifycss({"uglyComments": true})))
            .pipe(gulp.dest(DESTINATION_PATHS[asset_type]))
    }
    else {
        console.log(`Asset type "${asset_type}" is not configured to be minified`);
    }
}

buildAll = () => {
    buildStyles()
    buildScripts()
}

minifyAll = () => {
    console.log('Minifying all assets...')
    MINIFIABLE_ASSET_TYPES.forEach(asset_type => minifyAsset(asset_type));
}

// RUNNABLE TASKS, usage:
// npx gulp [task name]
gulp.task('build', ()=>{
    return new Promise ((resolve, reject)=>{
        buildAll()
        resolve();
    });
});

gulp.task('minify', ()=>{
    return new Promise ((resolve, reject)=>{
        minifyAll()
        resolve();
    });
});

// Useful for development, it first builds, then watches our files
// will re-run automatically when files are saved
gulp.task('watch', ()=>{
    buildAll()

    // Watch and build JS
    watch(SOURCE_PATHS.scripts, (event)=>{
        buildScripts();
    });

    // Watch and build stylesheets
    watch(SOURCE_PATHS.styles, (event)=>{
        buildStyles();
    });
});

/* eslint-enable */