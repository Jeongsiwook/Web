# Vue.js
## Vue 시작하기
### CDN, Codepen
- JS 파일 설정에 CDN 주소를 넣어주면 html에 CDN을 추가 안해줘도 사용할 수 있음

### Vue CLI, Vetur
0. `npm install -g @vue/cli`
1. `vue create 폴더이름`

### Vue3 Webpack Template
0. `npx degit Jeongsiwook/webpack-template-basic 폴더이름`
1. js 폴더 삭제
2. src 폴더 > main.js, App.vue 파일 생성
3. `npm i vue@next`
4. `npm i -D vue-loader@next vue-style-loader @vue/compiler-sfc`
5. webpack.config.js 수정
```js
// path: NodeJS에서 파일 및 디렉토리 경로 작업을 위한 전역 모듈
const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  // 파일을 
  resolve: {
    extensions: ['.js', '.vue'],
  },
  // 파일을 읽어들이기 시작하는 진입점 설정
  entry: './src/main.js',

  // 결과물(번들)을 반환하는 설정
  output: {
    // 주석은 기본값!, `__dirname`은 현재 파일의 위치를 알려주는 NodeJS 전역 변수
    // path: path.resolve(__dirname, 'dist'),
    // filename: 'main.js',
    clean: true,
  },

  // 모듈 처리 방식을 설정
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.s?css$/,
        use: [
          // 순서 중요!
          'vue-style-loader',
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/, // 제외할 경로
        use: ['babel-loader'],
      },
    ],
  },

  // 번들링 후 결과물의 처리 방식 등 다양한 플러그인들을 설정
  plugins: [
    new HtmlPlugin({
      template: './index.html',
    }),
    new CopyPlugin({
      patterns: [{ from: 'static' }],
    }),
    new VueLoaderPlugin(),
  ],

  // 개발 서버 옵션
  devServer: {
    host: 'localhost',
    port: 8080,
    hot: true,
  },
};
```

6. `npm i -D webpack-cli @webpack-cli/serve`: 오류 뜨면 
7. src > components > 파스칼 표기법으로 vue 파일 생성
8. static 폴더를 src 폴더 밑에 넣고 폴더 이름으로 assets로 변경
