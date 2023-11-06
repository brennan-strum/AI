class Matrix {
  rows;
  cols;
  data = [];

  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;

    // initialize the size of the matrix with value = 0
    for (let i = 0; i < this.rows; i++) {
      this.data[i] = [];
      for (let j = 0; j < this.cols; j++) {
        this.data[i][j] = 1;
      }
    }
  }

  /**
   * Random number between -1 and 1
   */
  randomize() {
    for (const row in this.data) {
      for (const col in this.data[row]) {
        this.data[row][col] = Math.random() * 2 - 1;
        // this.data[row][col] = Math.floor(Math.random() * 10) - 1;
      }
    }
  }

  /**
   * Add another matrix to this matrix
   */
  add(value) {
    if (value instanceof Matrix) {
      for (const row in this.data) {
        for (const col in this.data[row]) {
          this.data[row][col] += value.data[row][col];
        }
      }
    } else {
      for (const row in this.data) {
        for (const col in this.data[row]) {
          this.data[row][col] += value;
        }
      }
    }
  }

  /**
   * Multiply this matrix by a single value
   */
  multiply(value) {
    if (value instanceof Matrix) {
      for (const row in this.data) {
        for (const col in this.data[row]) {
          this.data[row][col] *= value.data[row][col];
        }
      }
    } else {
      for (const row in this.data) {
        for (const col in this.data[row]) {
          this.data[row][col] *= value;
        }
      }
    }
  }

  /**
   * Apply a function to every value of this matrix
   */
  map(func) {
    for (const row in this.data) {
      for (const col in this.data[row]) {
        this.data[row][col] = func(this.data[row][col]);
      }
    }
  }

  /**
   * Create array output from Matrix object
   */
  toArray() {
    let arr = [];
    for (const row in this.data) {
      for (const col in this.data[row]) {
        arr.push(this.data[row][col]);
      }
    }

    return arr;
  }

  /**
   * Output Matrix data to console in table format
   */
  print(label) {
    if (label) console.log(label);
    console.table(this.data);
  }

  /** Vector Dot Product
   *  c = column
   *  r = row
   *
   * m1    0  1  2    m2    0  1    result     0       1
   *    0|[a, b, c]|     0|[g, j]|        0|[c1*r1, c1*r2]|
   *    1|[d, e, f]|  *  1|[h, k]|    =   1|[c2*r1, c2*r2]|
   *                     2|[i, l]|
   */
  static multiply(m1, m2) {
    if (m1 instanceof Matrix && m2 instanceof Matrix) {
      if (m1.cols !== m2.rows) {
        console.log("ERROR: input matrix 1 cols doesn't match matrix 2 rows.");
        // console.table(m1.data);
        // console.table(m2.data);
        return undefined;
      }

      const res = new Matrix(m1.rows, m2.cols);

      for (const row in res.data) {
        for (const col in res.data[row]) {
          let sum = 0;
          for (let i = 0; i < m1.cols; i++) {
            sum += m1.data[row][i] * m2.data[i][col];
          }
          res.data[row][col] = sum;
        }
      }

      return res;
    }
  }

  /**
   * Transpose
   * this          result
   * |[a, b, c]|   |[a, d]|
   * |[d, e, f]| = |[b, e]|
   *               |[c, f]|
   */
  static transpose(m) {
    const res = new Matrix(m.cols, m.rows);

    for (const row in m.data) {
      for (const col in m.data[row]) {
        res.data[col][row] = m.data[row][col];
      }
    }

    return res;
  }

  /**
   * Subtract Matrix 1 from Matrix 2 and Store values in Matrix 3
   * @returns Matrix
   */
  static subtract(m1, m2) {
    const m3 = new Matrix(m1.rows, m1.cols);
    for (const row in m3.data) {
      for (const col in m3.data[row]) {
        m3.data[row][col] = m1.data[row][col] - m2.data[row][col];
      }
    }

    return m3;
  }

  /**
   * Create a Matrix object from a 1d array
   * @returns Matrix
   */
  static fromArray(arr) {
    let mtx = new Matrix(arr.length, 1);
    for (let i = 0; i < mtx.rows; i++) {
      mtx.data[i][0] = arr[i];
    }

    return mtx;
  }

  /**
   * Apply a function to every value of this matrix
   */
  static map(m, func) {
    const res = new Matrix(m.rows, m.cols);

    for (const row in m.data) {
      for (const col in m.data[row]) {
        res.data[row][col] = func(m.data[row][col]);
      }
    }

    return res;
  }
}
