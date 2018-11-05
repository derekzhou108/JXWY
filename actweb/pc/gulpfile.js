//环境变量 dev开发环境 pro产品
var ENV = process.env.NODE_ENV;

var gulp = require('gulp'),
    less = require('gulp-less'),
    babel = require('gulp-babel'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'), //压缩js
    concat = require('gulp-concat'), //合并js
    htmlMin = require('gulp-htmlmin'),   //压缩html
    imageMin = require('gulp-imagemin'),     //压缩图片
    cleanCss = require('gulp-clean-css'),    //压缩css
    cssVer = require('gulp-make-css-url-version'),   //css文件引用加版本号
    rev = require('gulp-rev-append'),    //页面引用添加版本号
    spritesmith = require('gulp.spritesmith'), //合并雪碧图
    fileinclude = require('gulp-file-include'), //导入html公共部分
    autoprefixer = require('gulp-autoprefixer'), //自动添加浏览器前缀
    plumber = require('gulp-plumber'),  //错误不终止watch
    notify = require('gulp-notify'),    //通知消息
    rename = require('gulp-rename'),    //重命名
    // livereload = require('gulp-livereload'),     //自动刷新，需配合浏览器插件livereload
    flatten = require('gulp-flatten'),  //移动文件
    connect = require('gulp-connect'),  //本地服务器 自动刷新
    proxy = require('http-proxy-middleware'),   //本地服务器代理
    runSequence = require('run-sequence'),    //同步执行gulp任务
    replace = require('gulp-replace'),  //替换路径
    del = require('del'),    //删除文件
    merge = require('merge-stream'),
    ts = require("gulp-typescript"),
    tsify = require("tsify"),
    sourcemaps = require('gulp-sourcemaps'),
    tsProject = ts.createProject("tsconfig.json", {
        noImplicitAny: true
    }),
    tslint = require("gulp-tslint"),
    source = require("vinyl-source-stream"),
    buffer = require("vinyl-buffer"),
    browserify = require("browserify");

//删除dist下面的文件

del.sync(['dist']);

//编译less
gulp.task('sass', () => {

    if (ENV === 'dev') {
        return gulp.src(['src/sass/main.scss'])
            .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))   //错误不终止并给出提示
            .pipe(sass())
            .pipe(autoprefixer({
                browsers: ["last 5 versions"],
                cascade: false, //是否美化属性值 默认：true 像这样：
                //-webkit-transform: rotate(45deg);
                //        transform: rotate(45deg);
                remove: true //是否去掉不必要的前缀 默认：true
            }))
            //.pipe(cssVer())     //css文件引用加版本号
            //  .pipe(cleanCss({  //压缩CSS
            //      advanced: false,//类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
            //      compatibility: 'ie8',//保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
            //      keepBreaks: true,//类型：Boolean 默认：false [是否保留换行]
            //      keepSpecialComments: '*'    //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
            //  }))
            .pipe(plumber.stop())   //返回管道后的默认行为
            //.pipe(concat('index.css'))  //合并css
            .pipe(gulp.dest('dist/css'))
            .pipe(connect.reload());     //自动刷新
    } else if (ENV === 'pro') {
        return gulp.src('src/sass/main.scss')
        //.pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))   //错误不终止并给出提示
            .pipe(sass())
            .pipe(autoprefixer({
                browsers: ["last 5 versions"],
                cascade: false, //是否美化属性值 默认：true 像这样：
                //-webkit-transform: rotate(45deg);
                //        transform: rotate(45deg);
                remove: true //是否去掉不必要的前缀 默认：true
            }))
            .pipe(cssVer())     //css文件引用加版本号
            .pipe(cleanCss({  //压缩CSS
                advanced: true,//类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
                compatibility: 'ie8',//保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
                keepBreaks: false,//类型：Boolean 默认：false [是否保留换行]
                keepSpecialComments: '*'    //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
            }))
            //.pipe(concat('index.css'))  //合并css
            .pipe(gulp.dest('dist/css'))
        //.pipe(livereload())     //自动刷新
    }


});


//******************************************************************************
//* LINT
//******************************************************************************
gulp.task("lint", function () {

    var config = {formatter: "verbose", emitError: !!ENV};

    return gulp.src([
        "src/**/**.ts"
    ])
        .pipe(tslint(config))
        .pipe(tslint.report);

});


/*
gulp.task('ts', function () {
    return gulp.src('src/js/!**!/!*.ts')
        .pipe(sourcemaps.init({
            loadMaps: true,
        }))
        .pipe(tsProject())
        .on("error", () => {
            process.exit(1)
        })
        .pipe(sourcemaps.write('/'))
        .pipe(gulp.dest('./tmp/js'));
});

gulp.task('jsmin', ['ts'], function () {
    return gulp.src(['./tmp/js/main.js'])
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify({
            mangle: {except: ['require', 'exports', 'module', '$', 'layer', 'laypage']}, //排除混淆关键字
            compress: true, //类型：Boolean 默认：true 是否完全压缩
            //preserveComments: 'all' //保留所有注释
        }))
        .pipe(gulp.dest('dist/js'))
        .pipe(connect.reload());
});
*/


//******************************************************************************
//* BUILD DEV
//******************************************************************************
gulp.task("jsmin", function () {

    var libraryName = "main";
    var mainTsFilePath = "src/modules/main.ts";
    var outputFolder = "dist/js";
    var outputFileName = libraryName + ".min.js";

    var bundler = browserify({
        debug: true,
        standalone: libraryName
    });

    return bundler
        .add(mainTsFilePath)
        .plugin(tsify, {noImplicitAny: true})
        .transform('babelify', {extensions: ['.tsx', '.ts'], presets: ['es2015']})
        .bundle()
        .on('error', function (error) {
            console.error(error.toString());
        })
        .pipe(source(outputFileName))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest(outputFolder))
        .pipe(connect.reload());
});

//压缩JS
/*gulp.task('jsmin', () => {
    return gulp.src(['src/js/main.js'])
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify({
            mangle: {except: ['require', 'exports', 'module', '$', 'layer', 'laypage']}, //排除混淆关键字
            compress: true, //类型：Boolean 默认：true 是否完全压缩
            //preserveComments: 'all' //保留所有注释
        }))
        .pipe(gulp.dest('dist/js'))
        .pipe(connect.reload());
});*/

//复制库文件
gulp.task('copyLib', () => {
    return gulp.src('src/assets/**/*')
        .pipe(gulp.dest('dist/assets'))
})

gulp.task('copyMock', () => {
    return gulp.src('src/mock/**/*')
        .pipe(gulp.dest('dist/mock'))
})


/**
 //合并js
 gulp.task('concat', () => {
   return gulp.src('src/lib/*.js')
       .pipe(concat('lib.js'))
       .pipe(gulp.dest('dist/lib'))
});



 //压缩图片
 gulp.task('imageMin', ['less'],() => {
  return  gulp.src('src/img/*.{png,jpg,gif,ico}')
        .pipe(imageMin({
            optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
        }))
        .pipe(gulp.dest('dist/img'));
});
 **/

//压缩html
gulp.task('htmlMin', () => {
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: false,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: false,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: false,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    return gulp.src('dist/*.html')
        .pipe(htmlMin(options))
        .pipe(gulp.dest('dist'));
});


//页面引用添加版本号 ?rev=@hash
gulp.task('rev', () => {

    return gulp.src('dist/*.html')
        .pipe(rev())
        .pipe(gulp.dest('dist'))

});

//雪碧图 图片的名字为a.png 对应的类为.icon-a
gulp.task('spritesmith', () => {
    var indexSprite = gulp.src('src/img/sprite/*.png')
        .pipe(spritesmith({
            imgName: 'img/sprite.png',  //图片地址相对于 dest的地址
            cssName: 'sass/_img.scss',   //保存合并后对于css样式的地址
            padding: 20,
            algorithm: 'binary-tree',
            cssTemplate: "src/img/sprite/template.css"
        })).pipe(gulp.dest('src'));


    /* var noviceSprite = gulp.src('src/img/gift/sprite/!*.png') //新手专区雪碧图
         .pipe(spritesmith({
             imgName: 'img/gift/sprite-gift.png',  //图片地址相对于 dest的地址
             cssName: 'sass/_img-gift.scss',   //保存合并后对于css样式的地址
             padding: 20,
             algorithm: 'binary-tree',
             cssTemplate: "src/img/sprite/template.css"
         })).pipe(gulp.dest('src'));*/

    return merge(indexSprite);

});

gulp.task('copyImg', () => {
    return gulp.src('src/img/**/*.{png,jpg,gif,ico}')
        .pipe(gulp.dest('dist/img'))
        .pipe(connect.reload());

});

gulp.task('copyFont', () => {
    return gulp.src('src/fonts/*.*')
        .pipe(gulp.dest('dist/fonts'))
        .pipe(connect.reload());

});

gulp.task('copyVideo', () => {
    return gulp.src('src/video/*.*')
        .pipe(gulp.dest('dist/video'))
});

//导入html公共部分   @@include('include/meta.html')
gulp.task('fileinclude', () => {
    return gulp.src('src/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload());
});

gulp.task('connect', () => {
    connect.server({
        host: '10.10.20.81', //地址，可不写，不写的话，默认localhost
        port: 8700, //端口号，可不写，默认8000
        root: './', //当前项目主目录
        livereload: true, //自动刷新
        middleware(connect, opt) {
            return [
                proxy('/game-features', {
                    // target: 'http://10.10.40.33:8428',
                    target: 'http://jxwy.ksgame.com',
                    changeOrigin: true
                }),
                proxy('/reserve', {
                    target: 'http://jxwy.ksgame.com',
                    changeOrigin: true
                }),
                proxy('/prize', {
                    target: 'http://jxwy.ksgame.com',
                    changeOrigin: true
                }),
                proxy('/download', {
                    target: 'http://jxwy.ksgame.com',
                    changeOrigin: true
                }),
            ]
        }
    });
});

//移动文件
gulp.task('moveIndex', () => {
    return gulp.src('dist/_index.html')
        .pipe(rename({basename: 'index', extname: ".php"}))
        .pipe(gulp.dest('../../../../trunk/frontend/views/down'));
});


//替换文件路径
var url = '/static/jxwy/pc/dist';
url = '//cdn.ksgame.com/jxwygw/act/pc';
gulp.task('replaceHtml', () => {
    return gulp.src('dist/*.html')
        .pipe(replace('../dist', url))
        .pipe(gulp.dest('dist'));
});

gulp.task('replaceJs', () => {
    return gulp.src('dist/js/*.js')
        .pipe(replace('../dist', url))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('replaceCss', () => {
    return gulp.src('dist/css/main.css')
        .pipe(replace('..', url))
        .pipe(gulp.dest('dist/css'));
});

//复制到cdn目录
/*gulp.task('copyCdnDir', () => {
    return gulp.src('dist/!**')
        .pipe(gulp.dest('../../static/jxwy/pc/dist'))
});*/


gulp.task('watch', () => {

    gulp.watch('src/modules/*.ts', ['jsmin']);
    gulp.watch('src/sass/*.scss', ['sass']);
    gulp.watch('src/img/**/sprite/*.png', ['spritesmith']);
    gulp.watch('src/**/*.html', ['fileinclude']);
    gulp.watch('src/img/**/*.{png,jpg,gif}', ['copyImg']);

});


if (ENV === 'dev') {
    gulp.task('default', () => {
        runSequence('spritesmith', 'copyImg', 'copyFont', 'copyVideo', ['sass', 'jsmin', 'fileinclude', 'copyLib', 'copyMock'], 'connect', 'watch')
    })
} else if (ENV === 'pro') {
    gulp.task('default', () => {
        runSequence('spritesmith', 'copyImg', 'copyFont', 'copyVideo', ['sass', 'jsmin', 'fileinclude', 'copyLib', 'copyMock'], 'rev', 'htmlMin', ['replaceHtml', 'replaceCss', 'replaceJs'], 'moveIndex');
    })
}


