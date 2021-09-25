import React, { useRef, useState } from "react";
import guassJacobi from "../utility/GaussJacobi";
import Entry from "./Entry";

const Form = () => {
  const formRef = useRef();
  const iterations = useRef();
  const precision = useRef();
  const [entries, setEntries] = useState([]);
  // formSubmit Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    const input = [];
    for (let child of formRef.current.children) {
      const arr = [];
      for (let child1 of child.children) {
        arr.push(parseInt(child1.value));
      }
      input.push([...arr]);
    }
    console.log(input);
    const callObj = {
      input,
      iterations: parseInt(iterations.current.value),
      precision: parseInt(precision.current.value),
    };
    console.log(callObj);
    const res = guassJacobi(callObj);
    console.log(res);
    setEntries(res);
  };
  return (
    <>
      <div className="form-ctn">
        <div className="title-ctn">
          <h1>Guass Jacobi Method</h1>
        </div>
        <form ref={formRef} onSubmit={handleSubmit}>
          <div>
            <input type="number" name="" id="" />
            <input type="number" name="" id="" />
            <input type="number" name="" id="" />
            <input type="number" name="" id="" />
          </div>
          <div>
            <input type="number" name="" id="" />
            <input type="number" name="" id="" />
            <input type="number" name="" id="" />
            <input type="number" name="" id="" />
          </div>
          <div>
            <input type="number" name="" id="" />
            <input type="number" name="" id="" />
            <input type="number" name="" id="" />
            <input type="number" name="" id="" />
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
