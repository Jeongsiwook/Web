// 완전하지 않은 클래스를 표현, new를 통한 객체 생성 불가능, 상속 후 완전하게 만들어 사용
abstract class AbstractPerson {
  protected _name: string = 'M';

  abstract setName(name: string): void;
}

class Person extends AbstractPerson {
  setName(name: string): void {
    this._name = name;
  }
}
