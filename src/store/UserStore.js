// combine where state lives, we need to generate store object
import { compose, createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { rootReducer } from "./RootReducer";

const middleware = [logger]

const composeEnhancers = compose(applyMiddleware(...middleware))

export const store = createStore(rootReducer, undefined, composeEnhancers)
