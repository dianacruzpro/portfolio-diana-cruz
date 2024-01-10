# Setting up the gulp file and dependencies

In order for file changes to be updated automatically, we'll use the gulp and its dependencies to make the job faster.

## Installing Gulp-cli

- In the command console Install gulp-cli globally with
 <pre><code>npm install gulp-cli -g</code></pre>

- Then we will open the project to work in the command console and start npm with 

 <pre><code>npm init -y</code></pre>
This will create a **_package.json_** file, with the basic information of the project.


## Installing all dependencies
- Now we install all the dependencies that will help us in the work.

  ```cmd
  npm install @babel/core @babel/preset-env postcss autoprefixer browser-sync cssnano dart-sass gulp gulp-babel gulp-postcss gulp-sass gulp-terser sass
  ```

 This may take a few minutes depending on our computer.

And it will create a folder called **_node_modules_** and inside all the dependencies


- We create a folder called **_dist_**, which is where all the minified files will be stored.

- Now we create and configure the file called **_gulpfile.js_** with the following code, to use the dependencies that are installed

```js 
//Initialize modules
const {src, dest, watch, series } = require("gulp");
const sass = require('gulp-sass')(require('sass'));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const babel = require("gulp-babel");
const terser = require("gulp-terser");
const browsersync = require("browser-sync").create();

//sass task
function scssTask(){
  return src('app/scss/styles.scss', {sourcemaps: true})
    .pipe(sass())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(dest('dist', {sourcemaps: '.'}));
}

//Javascript Task
function jsTask(){
  return src('app/js/script.js', {sourcemaps:true})
    .pipe(babel({presets : ['@babel/preset-env']}))
    .pipe(terser())
    .pipe(dest('dist',{sourcemaps:'.'}));
}

//Browsersync
function browserSyncServer(cb){
  browsersync.init({
    server:{
      baseDir:'.'
    },
    notify:{
      styles:{
        top: 'auto',
        bottom:'0',
      },
    },
  });
  cb();
}

function browserSyncReload(cb){
  browsersync.reload();
  cb();
}

//Watch Task
function watchTask(){
  watch('*.html',browserSyncReload);
  watch(
    ['app/scss/**/*.scss', 'app/**/*.js'],
    series(scssTask,jsTask,browserSyncReload)
  );
}

//Default Gulp Task
exports.default = series(scssTask,jsTask,browserSyncServer,watchTask);
```

- And finally run the following command to use the gulpfile.js file

```
gulp
```




