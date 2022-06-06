interface Person8 {
  name: string;
  age?: number;
  readonly gender: string;
}

const p81: Person8 = {
  name: 'M',
  gender: 'male',
};

// readonly 이기 때문에 에러 발생
// p81.gender = 'female';
