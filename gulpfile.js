const gulp = require('gulp');
// const gutil = require('gulp-util');
const glob = require('glob');
const sass = require('gulp-sass');
const sassGlob = require('sass-glob-importer');
const sourcemaps = require('gulp-sourcemaps');
// const imagemin = require('gulp-imagemin');
// const imageminJpegoptim = require('imagemin-jpegoptim');
const gulpif = require('gulp-if');
const eventStream = require('event-stream');
const autoprefixer = require('gulp-autoprefixer');
const source = require('vinyl-source-stream');
const purify = require('gulp-purifycss');
const buffer = require('vinyl-buffer');
const browserify = require('browserify');
const watchify = require('watchify');
const uglify = require('gulp-uglify');
const runSequence = require('run-sequence');
const rename = require('gulp-rename');
const tinypng = require('gulp-tinypng-compress');
const handlebars = require('gulp-compile-handlebars');
const del = require('del');

require('dotenv').config();

const paths = {
	styles: {
		src: './src/**/css/**/*.scss',
		dest: './public/static/',
		build: './build/static/',
		filename: ''
	},
	scripts: {
		src: './src/**/js/*.js',
		dest: './public/static/',
		build: './build/static/',
		filename: ''
	},
	fonts: {
		src: './src/**/fonts/*',
		dest: './public/static/fonts/',
		build: './build/static/fonts/'
	},
	images: {
		src: './src/**/images/**/*',
		dest: './public/static/',
		build: './build/static/'
	},
	templates: {
		src: './src/**/templates/*.hbs',
		build: './build/static/',
		public: "./public/static/"
	}

};

const supportedBrowsers = [
	'ie >= 9',
	'ie_mob >= 9',
	'ff >= 35',
	'chrome >= 35',
	'safari >= 7',
	'opera >= 25',
	'ios >= 7',
	'android >= 4.3',
	'bb >= 10'
];

// const env = gutil.env;

/*
	* ----------------------------- *
	| Browserify compile/watch func |
	* ----------------------------- *

	* Browserify - entry main.js
	* Watchify - enable watching for browserify
	* Babelify - Babel transform for browserify
	* Write sourcemaps if not production
	* Uglify if production
	* Rename to <FILENAME>-min.js if production
*/

function compile(done, watch) {
	
	let isProduction = process.env.node_env === "production" ? false : true;
	glob(paths.scripts.src, (err, files) => {

		if (err) done(err);

		const tasks = files.map((entry) => {
			let arrayString = entry.split('/');
			var newSrcPath = './public/static/' + arrayString[2] + "/js/";
			var newBuildPath = './build/static/' + arrayString[2] + "/js/";		
			let b = browserify({
				entries: [entry],
				extensions: ['.js'],
				debug: isProduction,
				cache: {},
				packageCache: {}
			}).transform('babelify', {
				presets: ['es2015'],
				plugins: ['transform-object-rest-spread']
			});

			const bundle = () => b.bundle()
				.on('error', function handleError(bundleErr) { console.log(bundleErr); this.emit('end'); })
				.pipe(source(entry))
				.pipe(buffer())
				.pipe(rename((path) => {
					const rtnPath = path;
					rtnPath.dirname = '';
					rtnPath.basename += '.bundle';
					return rtnPath;
				}))
				.pipe(gulpif(process.env.node_env !== 'production', sourcemaps.init({ loadMaps: true }))) // dev env only
				.pipe(gulpif(process.env.node_env !== 'production', sourcemaps.write())) // dev env only

				.pipe(gulpif(process.env.node_env !== 'production', gulp.dest(newSrcPath))) // dev env only
				.pipe(gulpif(paths.scripts.filename.length && process.env.node_env !== 'production', rename({ prefix: `${paths.scripts.filename}-` }))) // prod env only
				// .pipe(gulpif(process.env.node_env === 'production', rename({ suffix: '.min' }))) // prod env only
				.pipe(gulpif(process.env.node_env === 'production', gulp.dest(newBuildPath))); // prod env only

			if (watch) {
				b = watchify(b);
				b.on('update', () => {
					console.log('-> bundling...');
					bundle();
				});
			}

			return bundle();
		});

		eventStream.merge(tasks).on('end', done);
	});
}

/*
	* ----------- *
	| Style tasks |
	* ----------- *

	* Write sourcemaps if not on production
	* Compile minified scss to css
	* Apply browser prefixes with autoprefixer
	* Rename file to <FILENAME>-min.css on production
	* Place in destination folder
*/

gulp.task('styles', () => gulp.src(paths.styles.src)
		.pipe(gulpif(process.env.node_env !== 'production', sourcemaps.init({loadMaps: true}))) // dev env only
		.pipe(sass({ outputStyle: 'compressed', importer: sassGlob() }))
		.on('error', function handleStyleError(err) { console.log(err); this.emit('end'); })
		.pipe(autoprefixer(supportedBrowsers))
		.pipe(gulpif(process.env.node_env !== 'production', sourcemaps.write())) // dev env only
		.pipe(gulpif(process.env.node_env !== 'production', gulp.dest(paths.styles.dest))) // dev env only
		.pipe(gulpif(process.env.node_env === 'production' && paths.styles.filename.length, rename({ prefix: `${paths.styles.filename  }-` }))) // prod env only
		// .pipe(gulpif(process.env.node_env === 'production', rename({ suffix: '-min' }))) // prod env only
		.pipe(gulpif(process.env.node_env === 'production', purify(['./public/static/js/**/*.js', './public/static/*html'], { minify: true, rejected: true }))) // prod env only
		.pipe(gulpif(process.env.node_env === 'production', gulp.dest(paths.styles.build))) // prod env only
);

gulp.task('styles:watch', () => {
	gulp.watch(paths.styles.src, ['styles']);
});

/*
	* ------------ *
	| Script tasks |
	* ------------ *

	* Browserify - entry main.js
	* Watchify - enable watching for browserify
	* Babelify - Babel transform for browserify
	* Write sourcemaps if not production
	* Uglify if production
*/

gulp.task('scripts', done => compile(done));
gulp.task('scripts:watch', done => compile(done, true));



/*
	* ------------ *
	| Images tasks |
	* ------------ *

	* move images to build folder
*/

gulp.task('images', () => gulp.src(paths.images.src)
	.pipe(gulpif(process.env.node_env === 'production', tinypng({
		key: process.env.tiny_png_api_key,
		checkSigs: true,
        sigFile: './public/images/.tinypng-sigs',
		log: true
	})))
	.pipe(gulp.dest(paths.images.dest))
	.pipe(gulpif (process.env.node_env === "production", gulp.dest(paths.images.build)))
);

/*
	* ----------- *
	| Fonts tasks |
	* ----------- *

	* move fonts to build folder
*/

// gulp.task('fonts', () => gulp.src(paths.fonts.src)
// 	.pipe(gulp.dest(paths.fonts.dest))
// 	.pipe(gulp.dest(paths.fonts.build))
// );

// gulp.task('fonts:watch', () => {
// 	gulp.watch(paths.fonts.src, ['fonts']);
// });

/*
	* ---------- *
	| Build task |
	* ---------- *

	* Run scripts build task
	* Run styles build task
	* Run images build task
	* Run fonts build task
	*
*/

/** copy html over  */
// gulp.task('handlebars', function () {
// 	del(['./public/static/*.html'], function() {
// 		var data = JSON.parse(fs.readFileSync('./data/data.json'));
// 		// var templateData = {}; // data to pass into templates - using ./data/data.json above
// 		options = {
// 			ignorePartials: true, // ignores any unknown partials. Useful if you only want to handle part of the file
// 			// partials : {}, // Javascript object that will fill in partials using strings
// 			batch : ['partials'] // Javascript array of filepaths to use as partials
// 			// helpers : {
// 			//     capitals : function(str){
// 			//         return str.toUpperCase();
// 			//     }
// 			// } // javascript functions to stand in for helpers used in the handlebars files
// 		};
// 		return gulp.src(paths.templates.src)
// 			.pipe(handlebars(data, options))
// 			.pipe(rename(function(path) {
// 				path.extname = '.html';
// 			}))
// 			.pipe(gulp.dest('./public/'))
// 			.pipe(livereload())
// 	});
// });

gulp.task('markup', ()=>{
	console.log('markup called')
	gulp.src("./src/**/*.html")
	.pipe(gulpif(process.env.node_env !== 'production', gulp.dest("./public/static/"))) // dev env only
	.pipe(gulpif(process.env.node_env == 'production', gulp.dest("./build/static/")));
});


gulp.task('markup:watch', function(){
	gulp.watch('./src/**/*.html', ['markup'])
})

gulp.task('images:watch', function(){
	gulp.watch('./src/**/images/*', ['images']);
})

// gulp.task('handlebars:watch', function(){
// 	gulp.watch('./src/**/templates/**/*', ['handlebars']);
// })

gulp.task('build', ['styles', 'scripts', 'images', 'markup']);


gulp.task('watch', ['styles', 'scripts', 'markup', 'images'], () => {
	runSequence(['styles:watch', 'scripts:watch', 'markup:watch', 'images:watch']);
});

gulp.task('default', ['styles', 'scripts', 'images', 'markup']);