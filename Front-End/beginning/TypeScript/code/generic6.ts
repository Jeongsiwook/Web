// 상속이라고 생각히자 말고 T는 string 또는 number만 가능
class PersonExtends<T extends string | number> {
  private _name: T;

  constructor(name: T) {
    this._name = name;
  }
}

new PersonExtends('M');
new PersonExtends(3);
