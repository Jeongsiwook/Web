function helloArray<T>(message: T[]): T {
  return message[0];
}

helloArray(['H', 'W']);
helloArray(['H', 5]);

function helloTuple<T, K>(message: [T, K]): T {
  return message[0];
}

helloTuple(['H', 'W']);
helloTuple(['H', 5]);
