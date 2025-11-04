import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "../slices/counterSlice";

export default function Counter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-500 to-indigo-700 text-white">
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl text-center w-80">
        <h1 className="text-3xl font-bold mb-6">Tailwind Redux Counter</h1>

        <p className="text-6xl font-extrabold mb-8">{count}</p>

        <div className="flex justify-center gap-6">
          <button
            aria-label="Decrement value"
            onClick={() => dispatch(decrement())}
            className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition-transform transform hover:scale-105 shadow-md"
          >
            −
          </button>

          <button
            aria-label="Increment value"
            onClick={() => dispatch(increment())}
            className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-transform transform hover:scale-105 shadow-md"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
