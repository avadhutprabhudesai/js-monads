/* eslint-disable no-unused-vars */
/* eslint-disable @babel/new-cap */
/* eslint-disable no-undef */

import { Either, Identity, Left, Right } from 'monet';
import { curry, length, map, path, toUpper } from 'ramda';
import { users } from '../mock-data';

export const EitherMonad = () => {
  console.log('\n\n%c****Either Monad****', 'font-size: 20px;color: green');

  /**
   * Example 1
   * Given a list of users, perform following operations on each user,
   * 1. Retrieve city.
   * 2. Convert to uppercase
   * 3. Put it in a sentence frame.
   */

  const fromNullable = (x) => (x ? Right(x) : Left('N/A'));

  const getCity = (user) => {
    const city = path(['address', 'city'], user);
    return city ? Right(city) : Left('City not found');
  };
  const frameResidence = (city) => `Lives in ${city}`;

  const getResidence = (user) =>
    fromNullable(user)
      .flatMap(getCity)
      .map(toUpper)
      .fold((x) => x, frameResidence);
  console.log(map(getResidence, users));

  /**
   * Example 2
   * Improve try/catch with Either monad
   *
   */
  const Try = (fn) => (val) => {
    try {
      return Either.Right(fn(val));
    } catch (error) {
      return Either.Left(error);
    }
  };

  /**
   * Example 3
   *
   * Decide the complexity of a password string
   * 1. low: if the length is less than 5
   * 2. medium: if it contains at least 1 digit
   * 3. high: if it contains at least 1 uppercase char
   *
   * Given an array of passwords, decide the complexity
   */

  const lengthCheck = (str) =>
    str.length >= 5 ? Either.Right(str) : Either.Left('L0');

  const digitCheck = (str) =>
    /\d/.test(str) ? Either.Right(str) : Either.Left('L1');

  const upperCharCheck = (str) =>
    /[A-Z]+/.test(str) ? Either.Right('L3') : Either.Left('L2');

  const testPassword = (pwd) =>
    Either.of(pwd)
      .flatMap(lengthCheck)
      .flatMap(digitCheck)
      .flatMap(upperCharCheck)
      .fold(
        (x) => x,
        (x) => x
      );

  console.dir(
    map(testPassword, ['avb', '1nb', 'Gbb', '1sdfasldjf', '1njbhbhbGjjk'])
  );

  /**
   * Example 4
   *
   * Given an array of positive integers perform following operations sequentially on each integer
   * . Add 1
   * . Multiply by 5
   * . Subtract 5
   * . Mod by 6
   * . Divide by 2
   *
   * If, at any stage, result becomes negative, record that stage in a string and skip following operations
   */

  const ints = [11, 127, 15, 30, 67, 88, 2];
  const ifPositive = (x, msg) =>
    x > 0
      ? Either.Right(x)
      : Either.Left(`Negative value obtained while ${msg}`);

  const add = curry((x, y) => ifPositive(x + y, `adding ${x}`));
  const sub = curry((x, y) => ifPositive(y - x, `subtracting ${x}`));
  const div = curry((x, y) => ifPositive(y / x, `dividing by ${x}`));
  const mult = curry((x, y) => ifPositive(x * y, `multiplying by ${x}`));
  const mod = curry((x, y) => ifPositive(y % x, `mod by ${x}`));

  const arithTest = (x) =>
    Either.of(x)
      .flatMap(add(1))
      .flatMap(mod(20))
      .flatMap(sub(4))
      .flatMap(div(2))
      .flatMap(mult(5))
      .fold(
        (x) => x,
        (x) => x
      );

  console.dir(map(arithTest, ints));
};
