
const state: {check: boolean} = {
    check: false
};

const mutations = {
    'Change': (state: {check: boolean}, payload: boolean) => {
        state.check = !state.check;
    }
};

const getters = {
    checkVal: (state: {check: boolean}) => state.check
};

export default {
    state,
    mutations,
    getters
}