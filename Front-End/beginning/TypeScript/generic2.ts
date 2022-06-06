function helloBasic<T, U>(message: T, comment: U): T {
  return message;
}

helloBasic<string, number>('M', 3);
// 위에 처럼 type을 지정해주지 않으면 T를 추론함
helloBasic(3, 'M');
