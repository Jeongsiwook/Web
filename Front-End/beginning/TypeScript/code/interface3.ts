interface Person4 {
  name: string;
  age: number;
  //
  hello(): void;
}

const p41: Person4 = {
  name: 'Mark',
  age: 39,
  // 인자로 this 지정 가능
  hello: function(this: Person4): void {
    console.log(`안녕하세요! ${this.name} 입니다.`)
  }
};

const p42: Person4 = {
  name: 'Mark',
  age: 39,
  hello(): void {
    console.log(`안녕하세요! ${this.name} 입니다.`)
  }
};

// 애로우 함수에서 this 사용 불가능
// const p43: Person4 = {
//   name: 'Mark',
//   age: 39,
//   hello: (): void => {
//     console.log(`안녕하세요! ${this.name} 입니다.`)
//   }
// };


// interface 구조에 맞춤
interface HelloPerson {
  (name: string, age?: number): void;
}

const helloPerson: HelloPerson = function (name: string) {
  console.log(`안녕하세요! ${name} 입니다.`);
};

helloPerson('M', 3);
