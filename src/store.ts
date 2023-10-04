import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import { Reducer, State } from "./reducer";
import thunk from "redux-thunk";
// 非同期処理を含むアクションを簡単に扱えるようにしてくれるライブラリです。
// コードを見ると非常にシンプルながら、これを使うことでかなりスッキリしたコードを書くことができます。
// 非同期用のライブラリとしてredux-sagaというのもありますがそちらは別の機会に。

export type AppState = {
  state: State;
};

const storeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers<AppState>({
    state: Reducer
  }),
  storeEnhancers(applyMiddleware(thunk))
);

export default store;
