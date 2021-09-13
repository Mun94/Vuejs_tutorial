import { createStore } from 'vuex'
import calculationVal from './modules/calculationVal';

export default createStore<any>({
  ...calculationVal
})
