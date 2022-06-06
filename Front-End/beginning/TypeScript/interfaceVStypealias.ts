// type alias: 어떤 타입을 부르는 이름
// interface: 새로운 타입을 만드는 것

// function
// type alias
type EatType = (food: string) => void;
// interface
interface IEat {
  (food: string): void;
}

// array
// type alias
type PersonList = string[];
// interface
interface IPersonList {
  [index: number]: string;
}

// intersection
interface ErrorHandling {
  success: boolean;
  error?: { message: string };
}
interface ArtistsData {
  artists: { name: string }[];
}
// type alias
type ArtistsResponseType = ArtistsData & ErrorHandling;
// interface
interface IArtistsResponse extends ArtistsData, ErrorHandling {}
let art: ArtistsResponseType;
let iar: IArtistsResponse;

// union types
interface Bird {
  fly(): void;
  layEgss(): void;
}
interface Fish {
  swim(): void;
  layEggs(): void;
}
type PetType = Bird | Fish;
// error
// interface IPet extends PetType {}
// class Pet implements PetType {}

// Declaration Merging - interface
interface MergingInterface {
  a: string;
}
interface MergingInterface {
  b: string;
}
// 인터페이스 두개가 합쳐짐
let mi: MergingInterface;

// Declaration Merging - type alias
// 불가능
// type MergingType = {
//   a: string;
// };
// type MergingType = {
//   b: string;
// };
