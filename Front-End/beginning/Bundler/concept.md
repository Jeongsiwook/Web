# Bundler
## Parcel
### 번들러 개요
- 웹 개발자가 하위 툴 그룹을 관리하는 데 도움을 주는 도구. 플러그인을 사용하여 하위 툴을 관리하는 meta-tool
- 모듈들을 하나의 파일로 묶어 브라우저에서 돌아가도록 함
- Parcel vs Webpack
  - 구성 없는 단순한 자동 번들링, 소/중형 프로젝트에 적합
  - 매우 꼼꼼한 구성, 중/대형 프로젝트에 적합

### 프로젝트 생성
0. bundler 설치
```bash
$ npm init -y
$ npm i -D parcel-bundler
```
1. package.json scripts 수정
```json
"sripts": {
  "dev": "parcel index.html",
  "build": "parcel build index.html"
},
```

### 정적 파일 연결
- ico converter
  - 32 pixels, 32 bits

- parcel plugin static files copy
  - dist 폴더에 파일을 넣기 위해
  - static 폴더 안에 파일을 집어 넣고 사용
```bash
$ npm i -D parcel-plugin-static-files-copy
```
```json
"staticFiles": {
  "staticPath": "static"
}
```

### autoprefixer
- 지원하지 않는 브라우저를 위해서 사용
- .postcssrc.js 파일을 만듦
```js
// ESM
// CommonJS: node.js

// import autoprefixer from 'autoprefixer'
const autoprefixer = require('autoprefixer')

// export {
//   plugins: [
//     autoprefixer
//   ]
// }
module.exports = {
  plugins: [
    autoprefixer
  ]
}
```
```bash
$ npm i -D postcss autoprefixer
```
```json
"browserslist": [
  "> 1%",
  "last 2 versions"
]
```

### babel
- 구형 브라우저 버전에서도 돌아갈 수 있게 컴파일 해줌
- postcss가 동반되어야 함
- .babelrc.js
```js
module.exports = {
  presets: ['@babel/preset-env']
  plugins: [
    ['@babel/plugin-transform-runtime'] // 비동기 문법 사용하기 위해
  ]
}
```
```bash
$ npm i -D @babel/core @babel/preset-env
$ npm i -D @babel/plugin-transform-runtime
```

### CLI(커맨드 라인 인터페이스)
- Serve: 개발용
- Build: 제품용
- 결과물 디렉토리 바꾸기
```bash
$ parcel build entry.js --out-dir build/output
```
- 포트 번호 바꾸기
```bash
$ parcel serve entry.js --port 1111
```
- 브라우저에서 열기
```bash
$ parcel entry.js --open
```
- 빠른 모듈 교체 비활성화
```bash
$ parcel entry.js --no-hmr
```
- 파일시스템 캐시 비활성화
```bash
$ parcel build entry.js --no-cache
```

### 저장소 업로드
- .gitignore: .cache, node_modules, dist

---

## Webpack
### 프로젝트 생성
0. bundler 설치
```bash
$ npm init -y
$ npm i -D webpack webpack-cli webpack-dev-server@next
```
1. package.json scripts 수정
```json
"sripts": {
  "dev": "webpack-dev-server --mode development",
  "build": "webpack --mode production"
},
```
2. webpack.config.js 생성
- 사용할 기능을 적음

3. `$ npm run build`

### entry, output
- 파일을 읽어들이기 시작하는 진입점을 설정 및 결과물을 반환하는 설정
- webpack.config.js

```js
// import
const path = require('path')

// export
module.exports = {
  // parcel index.html
  // 파일을 읽어들이기 시작하는 진입점 설정
  entry: './js/main.js',
  
  // 결과물(번들)을 반환하는 설정
  output: {
//    path: path.resolve(__dirname, 'dist'), // __dirname: webpack.config.js가 있는 위치
//    filename: 'main.js',
    clean: true // 기존에 만들어졌던 것들을 제거해줌
  }
}
```

### plugins
- 번들링 후 결과물의 처리 방식 등 다양한 플러그인들을 설정
- 설치

```bash
$ npm i -D html-webpack-plugin
```

- webpack.config.js 설정
```js
const HtmlPlugin = require('html-webpack-plugin')

module.exprots = {
  plugins: [
    new HtmlPlugin({
      template: './index.html' // index.html을 병합해서 결과 도출
    })
  ],
  devServer: {
    host: 'localhost'
  }
}
```

### 정적 파일 연결
0. static 폴더 생성
1. favicon.ico 파일을 static 폴더에, logo.png 파일을 static > imgages 폴더에 넣음
2. index.html을 dist폴더에 결과로 보냈을 경우엔 img src를 `./images/logo.png` 로 가능
3. 설치 `$ npm i -D copy-webpack-plugin`
4. webpack.config.js 설정
```js
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'static' } // 어디에서 복사할 것인지
      ]
    })
  ]
}
```

### module
0. css 파일을 js파일에서 import
1. `$ npm i -D css-loader style-loader` 설치
2. webpack.config.js 설정
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/, // 정규표현식 
        use: [ // 순서가 중요
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
}
```

### SCSS
0. scss 파일을 js파일에서 import
1. `$ npm i -D sass-loader sass` 설치
2. webpack.config.js 설정
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.s?css$/, // 정규표현식 scss, css 둘다 가능
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  }
}
```

### Autoprefixer(PostCSS)
0. `$ npm i -D postcss autoprefixer postcss-loader` 설치
1. webpack.config.js 설정
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.s?css$/, // 정규표현식 scss, css 둘다 가능
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader`,
          'sass-loader'
        ]
      }
    ]
  }
}
```
2. package.json 설정
```json
"browserslist": [
  "> 1%",
  "last 2 versions"
]
```

3. .postcssrc.js 생성
```js
module.exports = {
  plugins: [
    require('autoprefixer')
  ]
}
```

### babel
0. `$ npm i -D @babel/core @babel/preset-env @babel/plugin-transform-runtime` 설치
1. .babelrc.js 생성
```js
module.exports = {
  presets: ['@babel/preset-env'],
  plugins: [
    ['@babel/plugin-transform-runtime']
  ]
}
```
2. webpack.config.js 설정
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/, 
        use: [
          'babel-loader',
        ]
      }
    ]
  }
}
```
3. `$ npm i -D babel-loader` 설치

### Netlify 배포
0. .gitignore 설정
- .cache, .DS_Store, node_modules, dist

1. Netlify 홈페이지 접속
2. New site from Git 클릭
3. GitHub 클릭
4. 해당 저장소 클릭
5. Basic build settings 설정
- Build command: npm run build
- Publish directory: dist/

6. Deploy site 클릭

### NPX, Degit
- digit 사용해서 다운받기
  - git clone과 다르게 버전을 새롭게 쓸 수 있음
```bash
$ ls
$ cd Desktop
$ npx degit 계정이름/저장소이름 다운받은걸넣을폴더이름
$ cd 다운받은걸넣을폴더이름
$ code . -r
```
