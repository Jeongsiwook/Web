# 웹 브라우저에 www.google.com을 치고 엔터를 누르면 일어나는 일

구글 서버에서 index.html을 GET요청으로 가져 와야 하는데 가져오기 위해선 (구글)IP 주소가 필요합니다
.그래서 google.com이라는 도메인 네임을 통해 IP 주소를 찾아야 되는데, 그래서 dns에 요청을 보내서 구글 IP주소를 찾고 그걸로 index.htmlㅇ을 가져와서 브라우저에 렌더링합니다.

what happens when type google 검색

# 브라우저 렌더링 과정

1. DOM tree 생성  
   렌더 엔진이 HTML을 파싱하여 DOM 노드로 이루어진 트리 생성.

2. render tree 생성  
   CSS파일과 inline 스타일을 파싱.  
   DOM + CSSOM = 렌더 트리를 생성.

3. Layout(reflow)  
   각 노드들의 스크린에서의 좌표에 따라 위치 결정.

4. Paint(repaint)  
   실제 화면에 그리기.

# Virtual DOM

DOM의 복사본이자, HTML DOM의 추상화 버전.
실제 DOM obect와 같은 속성은 가지고 있지만, 실제 DOM이 갖고 있는 api는 갖고 있지 않음.

## 왜 등장하였는가?

어떤 인터랙션에 의해 DOM에 변화가 발생하면 render tree가 그때마다 재생성이 됨.
이러한 비효율을 막기 위해 등장.

## 역할

원본 DOM에 필요한 변화만 반영되어서 전체 real DOM을 바꾸지 않고도 필요한 UI의 업데이트를 적용할 수 있음.

1. 데이터가 변경되면 전체 UI는 virtual DOM에 렌더링 됨
2. 이전 virtual DOM에 있던 내용과 업데이트 후에 내용을 비교하여 바뀐 부분만 실제 DOM에 적용.

## 장점

- 실제 DOM이 아닌 메모리상에서 동작해 훨씬 더 빠르게 동작
- 실제 렌더링이 되지 않기 때문에 연산 비용이 적음

## 장점만 있는가?

정보 제공만 하는 웹페이지라면 인터랙션이 발생하지 않기 때문에 일반 DOM의 성능이 더 좋을 수도 있음.

# html, css, js가 브라우저에 어떻게 렌더링 되는지

## repainting, reflow

# display: none이면 브라우저에서 어떻게 처리하는지, 어느정도까지 새로 그리는지
