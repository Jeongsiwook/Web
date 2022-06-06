# 개요
## Docker란?    
✔️ 도커는 리눅스의 응용 프로그램들을 프로세스 격리 기술들을 사용해 컨테이너로 실행하고 관리하는 오픈 소스 프로젝트   

## Docker를 사용하는 이유
1. 단점
  - 서버에 Docker를 설치 및 image 파일을 만들어 줘야 함
2. 장점
  - 서버 세팅 및 애플리케이션 띄우기 반복 가능 

## Docker로 Nginx 띄우기   
✔️ Docker가 잘 설치 되었는지 잘 실행 되었는지 테스트 할 때 가장 먼저 해볼만한 테스트

### 현재 프로세스(컨테이너) 목록 확인
```bash
$ docker ps
```
### nginx 띄우기1   
✔️ 이미지가 없다면 다운로드   
```bash
$ docker run nginx
```

### nginx 띄우기2   
✔️ 포트 기본 값은 80   
```bash
$ docker run -p 호스트포트:컨테이너포트 nginx
```

### 데몬 형태로 띄우기   
✔️ cmd창을 닫아도 nginx에 접근 가능   
```bash
$ docker run -d -p 호스트포트:컨테이너포트 nginx
```

### container 내리기
```bash
$ docker kill 컨테이너아이디
```

---

# 활용
## 컨테이너 다루기   
1. ` $ docker images` 현재 호스트에 설치된 image들 확인
2. ` $ docker rmi nginx` nginx 이미지 지움
3. ` $ docker container ls -a` 내려간 컨테이너까지 확인
4. ` $ docker container rm 컨테이너아이디` 컨테이너 지움

## Docker로 Flask App 띄우기   
✔️ Flask는 파이썬으로 작성된 마이크로 웹 프레임워크의 하나   

### 가상 환경 만들기
1. venv를 생성
```bash
$ python -m venv venv
$ python3 -m venv .venv
```

2. venv 활성
```bash
$ venv/Scripts/activate.bat
$ source .venv/bin/activate
```

3. flask 다운
```bash
$ pip install flask
```

4. 설치된 라이러리 목록 확인
```bash
$ pip freeze
```

5. 실행할 파이썬 파일에 `app.run` 옆에 `(host='0.0.0.0', port=5000)`

6. python 실행
```bash
$ python 파일이름.py
$ python3 파일이름.py
```

## Dockerfile 작성하기      
✔️ Docker image를 어떻게 만들 것인지 정하는 기능   
```bash
FROM python:3.8-alpine
COPY . /app
WORKDIR /app
RUN pip3 install flask
RUN chmod +x /app/app.py
CMD ["python3", "app.py"]
```
- `FROM`은 어떤 리눅스(이미지)를 사용할 것인지
- `COPY`은 현재 디렉토리에서 컨테이너 디렉토리에 소스코드를 복사 
  - `.` 현재 디렉토리, `/app` 컨테이너 디렉토리
- `WORKDIR`은 컨테이너에서 명령어가 실행되는 디렉토리
- `RUN`은 컨테이너를 구성할 파일(이미지)을 만들 때 사용
  - `flask` 라이브러리 설치, `app.py`의 권한을 바꿔주는 명령
- `CMD`는 컨테이너가 실행될 때 실행할 명령어
  - `app.py`를 실행하여 flask app을 실행

## Docker build 후 Container로 띄우기
0. txt 파일 처리
  - 파일이름은 `Dockerfile`을 사용해야 함
```bash
$ move 파일이름.txt 파일이름
$ mv 파일이름.txt 파일이름
```

1. 작성한 Dockerfile로 build
```bash
$ docker build -t 이미지이름 .
$ docker build -t 이미지이름:버전 .
```

2. 컨테이너 실행
  - `(host='0.0.0.0', port=5000)`에서 포트번호 입력
```bash
docker run -d -p 호스트포트번호:5000 이미지이름
```

---

# AWS EC2 띄우기
## AWS 들어가기   
✔️ AWS는 아마존에서 만든 클라우드 컴퓨팅 서비스, EC2는 클라우드 상에 서버 컴퓨터를 띄우는 서비스   
✔️ AWS => EC2 => 인스턴스 => 인스턴스 시작 => ubuntu Server => 보안그룹 추가 80포트(nginx), 5000포트(flask) => 새 키 페어 생성 => 키 페어 다운로드   

## PuTTY, PuTTyYgen 다운 받기   
1. Putty, PuttyGen 다운
2. PuttyGen의 Conversions에 키를 넣고 private key로 저장
3. Putty의 IP address에 AWS EC2 퍼블릭 주소 or DNS 넣기
4. Putty의 카테고리 SSH => Auth Browse에 private key 넣고 Open
5. `ubuntu` 입력(SSH 로그인 계정), 기본 포트: 22

---

# AWS에 Container 띄우기
## Oh My BASH 설치하기   
✔️ 리눅스를 편하게 사용하기 위해 설치   
1. putty ubuntu 접속(서버)
2. `$ sudo su -` 관리자 권한으로 사용
3. oh my bash 설치 명령어 복사 붙여넣기

## AWS EC2에 Docker 설치하기   
✔️ Install Docker Engine on Ubuntu 검색해서 명령어 ubuntu에 모두 입력   

## AWS EC2에 Nginx 띄우기
1. putty ubuntu 접속(서버)
2. `$ sudo su -` 관리자 권한으로 사용
3. `$ docker run -p 80:80 nginx` 입력
4. AWS EC2 퍼블릭 주소 링크에 접속

## AWS EC2에 Flask App 띄우기   
1. putty ubuntu 접속(서버)
2. `$ mkdir python_flask` python_flask라는 디렉토리 생성
3. `$ cd python_flask` 
4. `$ vim app.py` app.py 파일을 생성 및 편집
5. `$ pip3 install flask` flask 설치
6. `$ python3 app.py`
7. AWS EC2 퍼블릭 주소 링크:5000에 접속

## Dockerfile로 Image 만들고 띄우기
1. putty ubuntu 접속(서버)
2. `$ vim Dockerfile` Dockerfile 파일을 생성 및 편집
3. `$ docker build -t 이미지이름 .` 이미지 빌드(생성)
4. `$ docker run -d -p 호스트포트:5000 이미지이름` 이미지를 컨테이너로 띄우기

## Docker Hub에서 Image Pull 하기   
✔️ Docker Hub는 Docker 컨테이너 이미지를 위한 세계 최대 라이브러리 및 커뮤니티   
✔️ 직접 구성할 필요 없이 Docker Hub에서 Pull 해온 이미지들을 바로 사용할 수 있음   

### 방법
1. Docker Hub에서 원하는 이미지 이름을 검색 및 클릭
2. 우측 상단에 해당 이미지를 가져오기 위한 명령어를 복사
3. docker가 실행된 터미널에서 복사한 명령어를 붙여넣기
  - 사용자가 root:docker 권한이 없어서 에러가 발생할 수 있음
  - `Got permission denied while trying to connect to the Docker daemon socket at...` 
  - `$ sudo usermod -a -G docker $USER` 로 해결

---
