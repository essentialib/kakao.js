import * as T from '../src/typing';

const cmd = T.function
    .args(T.user, T.number, T.string)
    .implement((user, age, title) => {
        user.
    });