class Person {
  public name: string = 'M';
  // private 변수는 이름 앞에 _를 붙여주는 관습이 있음
  private _age: number;

  public constructor(age?: number) {
    if (age === undefined) {
      this._age = 2;
    } else {
      this._age = age;
    }
  }
}

const p1: Person = new Person();
console.log(p1);
const p2: Person = new Person(3);
console.log(p2);
