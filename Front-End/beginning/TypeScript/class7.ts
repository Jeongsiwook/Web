class Students {
  [index: string]: 'male' | 'female';
  // mark는 항상 male
  mark: 'male' = 'male';
}

const a = new Students();
a.mark = 'male';
a.jade = 'male';

const b = new Students();
b.chloe = 'female';
b.alex = 'male';
a.anna = 'female';
