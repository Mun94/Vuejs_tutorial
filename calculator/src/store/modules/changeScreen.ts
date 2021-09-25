import { IState, IMutations, IGetters } from '../../types';

const state: Pick<IState, 'check'> = {
  check: false,
};

const mutations: Pick<IMutations, 'CHANGE'> = {
  CHANGE: (state) => {
    state.check = !state.check;

    return state.check;
  },
};

const getters: Pick<IGetters, 'checkVal'> = {
  checkVal: (state) => state.check,
};

export default {
  state,
  mutations,
  getters,
};
