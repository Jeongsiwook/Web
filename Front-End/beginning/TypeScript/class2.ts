// !
class Person {
  name: string = 'M';
  // !: 동적 할당
  age!: number;
}

const p1: Person = new Person();
console.log(p1);
p1.age = 3;
console.log(p1.age);


// 인자를 넣거나 안 넣거나
class Person {
  name: string = 'M';
  age: number;

  constructor(age?: number) {
    if (age === undefined) {
      this.age = 2;
    } else {
      this.age = age;
    }
  }
}

const p1: Person = new Person();
console.log(p1);
const p2: Person = new Person(3);
console.log(p2);
