// ?: 선택 속성
interface Person2 {
  name: string;
  age?: number; 
}

function hello2(person: Person2): void {
  console.log(`안녕하세요! ${person.name} 입니다.`);
}

hello2({ name: 'Mark', age: 39 });
hello2({ name: 'Anna' });


// indexable type
interface Person3 {
  name: string;
  age?: number;
  //
  [index: string]: any;
}

function hello3(person: Person3): void {
  console.log(`안녕하세요! ${person.name} 입니다.`);
}

const p31: Person3 = {
  name: 'Mark',
  age: 39,
};

const p32: Person3 = {
  name: 'Anna',
  systers: ['sung', 'chan'],
};

const p33: Person3 = {
  name: 'Bokdaengi',
  father: p31,
  mother: p32,
};
