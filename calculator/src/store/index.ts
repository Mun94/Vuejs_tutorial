import { createStore } from 'vuex'
import calculationVal from './modules/calculationVal';
import changeScreen from './modules/changeScreen';

export default createStore({
  modules: {
    calculationVal,
    changeScreen
  }
} as any)
