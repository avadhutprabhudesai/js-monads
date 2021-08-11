/* eslint-disable @babel/new-cap */
/* eslint-disable no-undef */

import { Left, Right } from 'monet';
import { map, path, toUpper } from 'ramda';
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

  const fromNullable = (x) => (x ? Right(x) : Left(x));

  const getCity = (user) => {
    const city = path(['address', 'city'], user);
    return city ? Right(city) : Left(city);
  };
  const frameResidence = (city) => `Lives in ${city}`;

  const getResidence = (user) =>
    fromNullable(user)
      .flatMap(getCity)
      .map(toUpper)
      .fold(() => 'Location unknown', frameResidence);
  console.log(map(getResidence, users));

  /**
   * Example 2
   * Improve try/catch with Either monad
   *
   */
};
