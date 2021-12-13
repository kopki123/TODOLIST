export class State {
  constructor(state) {
    this.state = state;
    this.callbacks = [];
  }

  setSate(newValue) {
    if (newValue === this.state) {
      return;
    }

    const oldValue = this.state;
    this.state = newValue;

    this.callbacks.forEach((fun) => {
      fun(this.state, oldValue, this);
    });
  }

  sub(callback) {
    this.callbacks.push(callback);
  }
}

export let state = [];
export const callbacks = [];

export function setup(defaultValue) {
  state = defaultValue;
}

export function setSate(newValue) {
  if (newValue === state) {
    return;
  }

  const oldValue = state;
  state = newValue;

  this.callbacks.forEach((fun) => {
    fun(state, oldValue);
  });
}

export function sub(callback) {
  callbacks.push(callback);
}
