class Parent {
  constructor(protected _name: string, private _age: number) {}
  public print(): void {
    console.log(`이름은 ${this._name}이고, 나이는 ${this._age}`);
  }
  // 상속 받으면 사용 가능
  protected printName(): void {
    console.log(this._name, this._age);
  }
}

const p = new Parent('M', 3);

class Child extends Parent {
  public gender = 'male';

  constructor(age: number) {
    // 자식의 생성자에서 가장 먼저 super를 호출
    super('Mark Jr.', age);
    this.printName();
  }
}

const c = new Child(5);
