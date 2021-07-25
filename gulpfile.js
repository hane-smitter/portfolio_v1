const {src, dest, watch, series} = require('gulp');
const compileSass = require('gulp-sass')(require('sass'));
const SynchronizeBrowser = require('browser-sync').create();
const gulpClean = require('gulp-clean');

function syncBrowser(cb) {
    SynchronizeBrowser.init({
        server: {
            baseDir: '.'
        }
    });
    cb();
}

function bundleSass() {
    return src('./scss/**/*.scss', { sourcemaps: true })
    .pipe(compileSass().on('error', compileSass.logError))
    .pipe(dest('./public/css/', { sourcemaps: "." }))
    .pipe(SynchronizeBrowser.stream());
}

function cleanStyle() {
    return src('./public/css/style.css', {read: false, allowEmpty: true})
            .pipe(gulpClean());
}

const watchSass = () => {
    return watch(['./scss/**/*.scss'], series(bundleSass));
}
const watchAll = () => {
    watch(['./scss/**/*.scss'], series(cleanStyle, bundleSass));
    watch(['./public/scripts/**/*.js'], SynchronizeBrowser.reload);
    watch(['./**/*.html']).on('change', SynchronizeBrowser.reload);
}

exports.bundleSass = bundleSass;
exports.watchSass = watchSass;
exports.watchAll = watchAll;
exports.default = series(bundleSass, syncBrowser, watchAll);