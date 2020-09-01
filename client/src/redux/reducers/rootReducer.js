import { combineReducers } from "redux"
import customizer from "./customizer/"
import auth from "./auth/"
import navbar from "./navbar/Index"
import dataList from "./data-list/"

const rootReducer = combineReducers({
  customizer: customizer,
  auth: auth,
  navbar: navbar,
  dataList: dataList,
})

export default rootReducer
