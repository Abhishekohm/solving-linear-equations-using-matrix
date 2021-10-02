import React, { useRef, useState } from "react";
import guassJacobi from "../utility/GaussJacobi";
import guassSiedel from "../utility/guassSiedel";
import Entry from "./Entry";

const GJ = "gaussJacobi";
const GS = "guassSiedel";

const Form = () => {
  const formRef = useRef();
  const iterations = useRef();
  const precision = useRef();
  const [entries, setEntries] = useState([]);
  const [x0, setX0] = useState();
  const [y0, setY0] = useState();
  const [z0, setZ0] = useState();
  const [algo, setAlgo] = useState("");

  // formSubmit Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    const input = [];
    for (let child of formRef.current.children[0].children) {
      let arr = [];
      for (let child1 of child.children) {
        arr.push(parseInt(child1.value));
      }
      input.push([...arr]);
    }

    const callObj = {
      input,
      iterations: parseInt(iterations.current.value),
      precision: parseInt(precision.current.value),
      x0,
      y0,
      z0,
    };
    if (algo === GJ) {
      setEntries(guassJacobi(callObj));
    } else {
      setEntries(guassSiedel(callObj));
    }
  };
  return (
    <>
      <div className="form-ctn">
        <div className="title-ctn">
          <h1>Iterative Methods of Solving linear equations</h1>
        </div>
        <form ref={formRef} onSubmit={handleSubmit}>
          <div className="input-ctn">
            <div>
              <input type="number" required />
              <input type="number" required />
              <input type="number" required />
              <input type="number" required />
            </div>
            <div>
              <input type="number" required />
              <input type="number" required />
              <input type="number" required />
              <input type="number" required />
            </div>
            <div>
              <input type="number" required />
              <input type="number" required />
              <input type="number" required />
              <input type="number" required />
            </div>
          </div>
          <div className="precision-ctn">
            <input
              type="number"
              placeholder="No. of iterations"
              ref={iterations}
            />
            <input
              type="number"
              placeholder="No. of digits after decimal"
              ref={precision}
            />
          </div>
          <div>
            <div>
              <label>
                <b>Enter initial values:</b>
              </label>
            </div>
            <div>
              <input
                type="number"
                placeholder="x0"
                onChange={(e) => {
                  setX0(e.target.value);
                }}
                value={x0}
              />
              <input
                type="number"
                placeholder="y0"
                onChange={(e) => {
                  setY0(e.target.value);
                }}
                value={y0}
              />
              <input
                type="number"
                placeholder="z0"
                onChange={(e) => {
                  setZ0(e.target.value);
                }}
                value={z0}
              />
            </div>
          </div>
          <div className="algo">
            <label htmlFor="algo">
              <b>Select Method</b>
            </label>
            <select id="algo" onChange={(e) => setAlgo(e.target.value)}>
              <option value={GJ}>Guass Jacobi</option>
              <option value={GS}>Guass Siedel</option>
            </select>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="result-ctn">
        {entries.length !== 0 &&
          entries.map((entry, i) => {
            return <Entry key={i} entry={entry} />;
          })}
      </div>
    </>
  );
};

export default Form;
