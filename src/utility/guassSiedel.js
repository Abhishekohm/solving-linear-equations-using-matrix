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
  input[c3] = [...r3]; // ...spread operator
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

const guassSiedel = ({ input, x0, y0, z0, iterations, precision }) => {
  const res = check(input);
  console.log(input, x0, y0, z0, iterations, precision);
  if (res === false) {
    change(input);
  }
  let x0y0z0 = [x0 ? x0 : 0, y0 ? y0 : 0, z0 ? z0 : 0];
  let intermediateRes = [];
  let itr = iterations ? iterations : 10;
  precision = precision ? precision : 4;
  let pwer = 10 ** precision;
  console.log(itr, pwer);

  while (itr--) {
    let x1y1z1 = [];
    let x1 =
      (input[0][3] - input[0][1] * x0y0z0[1] - input[0][2] * x0y0z0[2]) /
      input[0][0];
    x1 = Math.round(x1 * pwer) / pwer;
    let y1 =
      (input[1][3] - input[1][0] * x1 - input[1][2] * x0y0z0[2]) / input[1][1];
    y1 = Math.round(y1 * pwer) / pwer;
    let z1 = (input[2][3] - input[2][0] * x1 - input[2][1] * y1) / input[2][2];
    z1 = Math.round(z1 * pwer) / pwer;
    x1y1z1.push(x1, y1, z1);
    const res = equals(x0y0z0, x1y1z1);
    if (res === true) {
      break;
    } else {
      copy(x0y0z0, x1y1z1);
      intermediateRes.push([...x0y0z0]);
    }
  }
  return [...intermediateRes];
};

// guassSiedel(input);

export default guassSiedel;
