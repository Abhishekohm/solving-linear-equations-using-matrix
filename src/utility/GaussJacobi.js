const abs = (num) => Math.abs(num);

const check = (input) => {
  return (
    abs(input[0][0]) >= abs(input[0][1]) + abs(input[0][2]) &&
    abs(input[1][1]) >= abs(input[1][0]) + abs(input[1][2]) &&
    abs(input[2][2]) >= abs(input[2][1]) + abs(input[2][0])
  );
};

const getMaximun = (input) => {
  const res = [];
  for (let i = 0; i < 3; i++) {
    let max = 0; // stores abs maximum
    let maxIndex = 0; // stores index corresponding to maximum value
    for (let j = 0; j < 3; j++) {
      if (abs(max) < abs(input[i][j])) {
        max = input[i][j];
        maxIndex = j;
      }
    }
    res.push(maxIndex);
  }
  return res;
};

const change = (input) => {
  const [c1, c2, c3] = getMaximun(input);
  const r1 = input[0];
  const r2 = input[1];
  const r3 = input[2];
  input[c1] = [...r1];
  input[c2] = [...r2];
  input[c3] = [...r3]; // ... spread operator
};

const equals = (x0y0z0, x1y1z1) => {
  let res = 1;
  for (let i = 0; i < 3; i++) {
    res = res && x0y0z0[i] === x1y1z1[i];
  }
  return res;
};

const copy = (x0y0z0, x1y1z1) => {
  for (let i = 0; i < 3; i++) {
    x0y0z0[i] = x1y1z1[i];
  }
  return;
};

const guassJacobi = ({ input, iterations, precision }) => {
  const res = check(input);
  console.log(iterations, precision);
  if (res === false) {
    change(input);
  }
  let x0y0z0 = [0, 0, 0];
  let intermediateRes = [];
  let itr = iterations;

  let precisionSetter = 1;

  for (let i = 0; i < precision; i++) {
    precisionSetter = precisionSetter * 10;
  }

  while (itr--) {
    let x1y1z1 = [];
    for (let i = 0; i < 3; i++) {
      let num = 0;
      for (let j = 0; j < 3; j++) {
        if (i !== j) num += input[i][j] * x0y0z0[j];
      }
      num = input[i][3] - num;
      num = num / input[i][i];
      num = Math.round(num * precisionSetter) / precisionSetter;
      x1y1z1.push(num);
    }
    const res = equals(x0y0z0, x1y1z1);
    if (res === true) {
      break;
    } else {
      copy(x0y0z0, x1y1z1);
      intermediateRes.push([...x0y0z0]);
    }
  }
  console.log(intermediateRes);
  return [...intermediateRes];
};

export default guassJacobi;
