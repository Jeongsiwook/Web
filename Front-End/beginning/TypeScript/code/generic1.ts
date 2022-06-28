function helloString(message: string): string {
  return message;
}

function helloNumber(message: number): number {
  return message;
}

// 더 많은 반복된 함수들...
function hello(message: any): any {
  return message;
}
console.log(hello('M').length);
// type을 확인하지 못해 에러가 발생하지 않음
console.log(hello(3).length);

// generic
function helloGeneric<T>(message: T): T {
  return message;
}
console.log(helloGeneric('M').length);
// type이 number로 간주되어 에러가 발생함
// console.log(helloGeneric(3).length);
