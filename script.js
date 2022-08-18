// Select dom element
const counterEl = document.getElementById('counter');
const incrementEl = document.getElementById('increment');
const decrementEl = document.getElementById('decrement');
const resetEl = document.getElementById('reset');
const addCounterEl = document.getElementById('addCounter');

// added counter
function addCount() {
  const addCountReset = document.querySelector('.addcount-reset');
  const counter = `<div class="mx-auto max-w-md mt-10 space-y-5">
    <div
      class="p-4 h-auto flex flex-col items-center justify-center space-y-5 bg-white rounded shadow"
    >
      <div class="text-2xl font-semibold">0</div>
      <div class="flex space-x-3">
        <button
          class="bg-indigo-400 text-white px-3 py-2 rounded shadow"
        >
          Increment
        </button>
        <button
          class="bg-red-400 text-white px-3 py-2 rounded shadow"
        >
          Decrement
        </button>
      </div>
    </div>
  </div>`;
  addCountReset.insertAdjacentHTML('afterend', counter);
}

// actions identifire
const INCREMENT = 'increment';
const DECREMENT = 'decrement';
const RESET = 'reset';

// action creators
const increment = (value) => {
  return {
    type: INCREMENT,
    payload: value,
  };
};

const decrement = (value) => {
  return {
    type: DECREMENT,
    payload: value,
  };
};
const reset = (value) => {
  return {
    type: RESET,
    payload: value,
  };
};

// initial state
const initialState = [
  {
    id: 1,
    value: 0
  }
]

// added reducer function
const counterReducer = (state = initialState, action) => {
  if (action.type === INCREMENT) {
    return {
      ...state,
      value: state.value + action.payload,
    };
  } else if (action.type === DECREMENT) {
    return {
      ...state,
      value: state.value - action.payload,
    };
  } else if (action.type === RESET) {
    return {
      ...state,
      value: 0,
    };
  } else {
    return state;
  }
};

// create Store
const store = Redux.createStore(counterReducer);

const render = () => {
  const state = store.getState();
  counterEl.innerText = state.value.toString();
};

render();
store.subscribe(render);

incrementEl.addEventListener('click', () => {
  store.dispatch(increment(1));
});

decrementEl.addEventListener('click', () => {
  store.dispatch(decrement(1));
});

resetEl.addEventListener('click', () => {
  store.dispatch(reset(0));
});
