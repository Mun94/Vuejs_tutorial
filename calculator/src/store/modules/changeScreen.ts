interface IState {
    check: boolean;
}

interface IMutations {
    CHANGE: (state: IState) => boolean;
}

interface IGetters {
    checkVal: (state: IState) => boolean
}

const state: IState = {
  check: false,
};

const mutations: IMutations = {
  CHANGE: (state) => {
    state.check = !state.check;

    return state.check;
  },
};

const getters: IGetters = {
  checkVal: (state) => state.check,
};

export default {
  state,
  mutations,
  getters,
};
