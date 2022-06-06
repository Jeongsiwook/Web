class Person {
  public readonly name: string = 'M';
  private readonly country: string;
  public constructor(private _name: string, private _age: number) {
    // 생성자는 가능
    this.country = "U"
  }

  hello() {
    // readonly로 클래스 안에서도 불가능
    // this.country = "C";
  }
}
