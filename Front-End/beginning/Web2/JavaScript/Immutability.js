// 객체의 복사
var o1 = {name:'kim'}
var o2 = Object.assign({}, o1);
o2.name = 'lee';

// 중첩된 객체의 복사
var o1 = {name:'kim', score:[1,2]}
var o2 = Object.assign({}, o1);
o2.score = o2.score.concat(); // 배열 때문에
o2.score.push(3);

// 불변의 함수
function fn(person){
    person = Object.assign({}, person);
    person.name = 'lee';
    return person;
}
var o1 = {name:'kim'}
var o2 = fn(o1);
 
function fn(person){
    person.name = 'lee';
}
var o1 = {name:'kim'}
var o2 = Object.assign({}, o1);
fn(o2);

// object freeze
var o1 = {name:'kim', score:[1,2]}
Object.freeze(o1);
Object.freeze(o1.score); // 배열은 따로 해줘야함
o1.name = 'lee';
o1.city = 'seoul';
o1.score.push(3);

/*
  const: 이름이 가리키는 값을 다른 것으로 바꾸지 못 하게 함
  freeze: 값 자체를 바꾸지 못 하게 함
*/
const o1 = {name:'kim'}
Object.freeze(o1);
const o2 = {name:'lee'}
// o1 = o2; const 때문에 불가능
o1.name = 'park'; // freeze 때문에 불가능
