var pug = require('gulp-pug');
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var watch = require('gulp-watch');
var prefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var newer = require('gulp-newer');
var rimraf = require('rimraf');
var rigger = require('gulp-rigger');

var path = {
	src: {
		pug: './src/html/*.pug',
		scss: './src/css/*.scss',
		js: './src/js/**/*.js',
		images: './src/images/**/*.*'
	},
	build: {
		html:'./build/html/',
		css:'./build/css/',
		js:'./build/js/',
		images: './build/images/'
	},
	watch: {
		pug: './src/html/*.pug',
		scss: './src/css/*.scss',
		js: './src/js/**/*.js',
		images: './src/images/**/*.*'
	},
	clean: './build'
}
var server = {
	server: {
			baseDir: "./build/"
	}
}

gulp.task('clean', function(cb){
	rimraf(path.clean, cb)
})

gulp.task('html', function(){
	gulp.src(path.src.pug)
		.pipe(plumber())
		.pipe(pug({
			pretty:true
		}))
		.pipe(gulp.dest(path.build.html))
		.on('end', browserSync.reload);
});



gulp.task('sass:build', function(){
	gulp.src(path.src.scss)
	//return gulp.src('src/css/main.scss')
		.pipe(plumber())
		.pipe(sass({
			pretty:true
		}))
		
		//.pipe(gulp.dest('build/css'))
		.pipe(prefixer())
		.pipe(cssnano({
			zindex:false
		}))
		.pipe(gulp.dest(path.build.css))
		
})

gulp.task('sass:dev', function(){
	gulp.src(path.src.scss)
	//return gulp.src('src/css/main.scss')
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(sass({
			pretty:true
		}))
		
		//.pipe(gulp.dest('build/css'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(path.build.css))
		.on('end', browserSync.reload);
})

gulp.task('js:dev', function(){
	gulp.src(path.src.js)
	.pipe(plumber())
	.pipe(rigger())
	.pipe(gulp.dest(path.build.js))
	.on('end', browserSync.reload);


})

gulp.task('js:build', function(){
	gulp.src(path.src.js)
	.pipe(plumber())
	.pipe(rigger())
	.pipe(gulp.dest(path.build.js))
	.pipe(uglify())
	

})

gulp.task('images', function () {
    gulp.src(path.src.images)
    	.pipe(newer(path.src.images))
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true,
            options: {
                cache: true
            }
        }))
        .pipe(gulp.dest(path.build.images));
        
});


gulp.task('watch', function(){
	watch([path.watch.pug], function(event, cb){
		gulp.start('html');
	});
	watch([path.watch.scss], function(event, cb){
		gulp.start('sass:dev');
	});
	watch([path.watch.js], function(event, cb){
		gulp.start('js:dev');
	});
	watch([path.watch.images], function(event, cb){
		gulp.start('images');
	});
});
/*gulp.task('watch', function(){
	//gulp.watch(path.watch.pug, ['html']);
	watch([path.watch.pug, path.watch.scss], function(event, cb){
		gulp.start('html','sass');
	});
});*/

gulp.task('webserver', function(){
	browserSync(server);
});



gulp.task('build', function(){
	gulp.start('html','sass:build', 'js:build', 'images');
})
gulp.task('dev', function(){
	gulp.start('html','sass:dev', 'js:dev', 'images');
})
gulp.task('default',['dev','watch','webserver']);