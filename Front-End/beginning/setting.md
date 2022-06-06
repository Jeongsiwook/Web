# Project 생성
0. Bundler
```bash
$ npm init -y
$ npm i -D parcel-bundler
```

1. package.json 
```json
"scripts": {
  "dev": "parcel index.html",
  "build": "parcel build index.html"
},
```

2. index.html
```html
<head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reset-css@5.0.1/reset.min.css" /> 
  <link rel="stylesheet" href="./scss/main.scss" />
  <script defer src="./js/main.js"></script>
</head>
```

