import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import reducer from "../store/reducers";
import rootSaga from "../store/sagas";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { wrapperApi } from "./helper/wrapperApi";

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware).concat(wrapperApi.middleware),
});

sagaMiddleware.run(rootSaga);
setupListeners(store.dispatch);
