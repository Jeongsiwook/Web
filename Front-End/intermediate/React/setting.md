# React
## 시작하기
https://create-react-app.dev/docs/getting-started/   
이전에 전역적으로 설치한 경우, 패키지를 제거 후에 전역적으로 재설치
```bash
$ npm uninstall -g create-react-app
```
```bash
$ yarn global remove create-react-app
```

## 설치하기
```bash
$ npx create-react-app 파일이름
$ cd 파일이름
$ npm start
```
```bash
$ yarn global add create-react-app
$ yarn create react-app 파일이름
$ cd 파일이름
$ yarn start
```

## ESLint   
### .eslintrc 파일 생성   
```json
{
  "extends": "react-app"
}
```
```json
{
  "extends": "react-app",
  "rules": {
    "quotes": ["error", "single", { "avoidEscape": true }],
    "indent": ["error", 2]
  }
}
```

## Prettier   
확장 메뉴에서 설치

## Prettier를 ESLint와 연동
```bash
yarn add --dev prettier-eslint
```

### CMD + ,
```json
{
  "editor.formatOnSave": true,
  "javascript.format.enable": false,
  "prettier.eslintIntegration": true
}
```
