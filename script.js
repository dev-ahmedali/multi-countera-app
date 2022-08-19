let counterElement = document.getElementById('counter');
const addCounterElement = document.getElementById('addCounter');
const resetElement = document.getElementById('reset');

// initial state
let initialState = [
  {
    id: 1,
    value: 0,
  },
];

// create id
let id = 1;

// action identifiers
const INCREMENT = 'increment';
const DECREMENT = 'decrement';
const ADDCOUNT = 'add';
const RESET = 'reset';

// create reducer function
function counterReducer(state = initialState, action) {
  if (action.type === ADDCOUNT) {
    const updateState = state.map((item) => {
      return {
        ...item,
      };
    });
    updateState.push({
      id: initialState.length + id,
      value: 0,
    });
    ++id;
    return updateState;
  }
  if (action.type === INCREMENT) {
    const updateState = state.map((item) => {
      return {
        ...item,
      };
    });

    const index = updateState.findIndex(
      (item) => item.id === action.payload.id
    );

    updateState[index].value += action.payload.value;
    return updateState;
  } else if (action.type === DECREMENT) {
    const updateState = state.map((item) => {
      return {
        ...item,
      };
    });
    const index = updateState.findIndex(
      (item) => item.id === action.payload.id
    );
    if (updateState[index].value > 0) {
      updateState[index].value -= action.payload.value;
    }

    return updateState;
  } else if (action.type === RESET) {
    const updateState = state.map((item) => {
      return {
        ...item,
      };
    });
    updateState.forEach((item) => (item.value = 0));
    return updateState;
  } else {
    return state;
  }
}

// create store
const store = Redux.createStore(counterReducer, initialState);

// action creators
const increment = (id, value) => {
  return {
    type: INCREMENT,
    payload: {
      value: value,
      id: id,
    },
  };
};

const decrement = (id, value) => {
  return {
    type: DECREMENT,
    payload: {
      value: value,
      id: id,
    },
  };
};

const add = () => {
  return {
    type: ADDCOUNT,
  };
};

const reset = () => {
  return {
    type: RESET,
  };
};

// add counter
function createCounter(id, value) {
  const div = document.createElement('div');
  div.classList =
    'p-4 h-auto flex flex-col items-center justify-center space-y-5 bg-white rounded shadow counter';
  const counter = document.createElement('div');
  counter.classList = 'text-2xl font-semibold';
  div.appendChild(counter);
  const buttonContainer = document.createElement('div');
  buttonContainer.classList = 'flex space-x-3';
  const incrementButton = document.createElement('button');
  incrementButton.classList =
    'bg-indigo-400 text-white px-3 py-2 rounded shadow';
  incrementButton.innerText = 'Increment';
  incrementButton.onclick = function () {
    store.dispatch(increment(id, value));
  };
  const decrementButton = document.createElement('button');
  decrementButton.classList = 'bg-red-400 text-white px-3 py-2 rounded shadow';
  decrementButton.innerText = 'Decrement';
  decrementButton.onclick = function () {
    store.dispatch(decrement(id, value));
  };
  buttonContainer.appendChild(incrementButton);
  buttonContainer.appendChild(decrementButton);
  div.appendChild(buttonContainer);
  counterElement.append(div);
}

createCounter(1, 1);

addCounterElement.addEventListener('click', () => {
  let id = store.getState().length + 1;
  let value = prompt(
    'Enter how many numbers you want to increment or decrement on each click: '
  );
  value = parseInt(value);
  createCounter(id, value);
  store.dispatch(add());
});

resetElement.addEventListener('click', () => {
  const isReset = confirm('Are you sure you want Reset all counter value?');
  if (isReset) {
    store.dispatch(reset());
  }
});

// create render function
function render() {
  const state = store.getState();
  state.forEach((item, index) => {
    counterElement.children[index].children[0].innerText = item.value;
  });
}

render();

store.subscribe(render);
