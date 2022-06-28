type HelloFunctionGeneric1 = <T>(message: T) => T;

const HelloFunction1: HelloFunctionGeneric1 = <T>(message: T): T => {
  return message;
};

interface HelloFunctionGeneric2 {
  <T>(message: T): T;
}

const HelloFunction2: HelloFunctionGeneric2 = <T>(message: T): T => {
  return message;
};
