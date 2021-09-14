interface IState {
    check: boolean;
};

const state: IState = {
    check: false
};

const mutations = {
    'CHANGE': (state: IState) => {
        state.check = !state.check;
    }
};

const getters = {
    checkVal: (state: IState) => state.check
};

export default {
    state,
    mutations,
    getters
};