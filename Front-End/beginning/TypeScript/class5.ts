class Person {
  public constructor(private _name: string, private _age: number) {}

  // getter
  get name() {
    return this._name + ' L';
  }

  // setter
  set name(n: string) {
    this._name = n;
  }
}

const p1: Person = new Person('M', 3);
console.log(p1.name);
p1.name = 'W';
console.log(p1.name);
