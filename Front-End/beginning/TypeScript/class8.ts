class Person {
  // 공통적으로 객체간에 공유하고 싶을 때 static 사용
  public static CITY = 'S';
  public static hello() {
    console.log('안');
  }
}

const p1 = new Person();
// static 때문에 불가능
// p1.hello();

// static 덕분에 가능
Person.hello();
Person.CITY;


class Person {
  public static CITY = 'S';
  public hello() {
    console.log('안', Person.CITY);
  }
  public change() {
    Person.CITY = 'L';
  }
}

const p1 = new Person();
p1.hello(); // S

const p2 = new Person();
p2.hello(); // S
p1.change();
p2.hello(); // L
