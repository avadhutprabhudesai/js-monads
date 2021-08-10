/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Identity, Maybe } from 'monet';
import {
  compose,
  concat,
  flip,
  identity,
  map,
  path,
  prop,
  toLower,
  toUpper,
} from 'ramda';
import { languageOfCountry, users } from '../mock-data';

export const MayBeMonad = () => {
  console.log('\n\n%c****Composition****', 'font-size: 20px;color: green');

  /**
   * Example 1
   * Given a list of users, perform following operations on each user,
   * 1. Extract address
   * 2. Extract city
   * 3. Lowercase
   * 4. Find the language of the country. Default to English.
   */
  const maybeFromNullable = (transform) => (arg) =>
    Maybe.fromEmpty(transform(arg));

  const getLang = maybeFromNullable(flip(prop)(languageOfCountry));

  const getCountry = maybeFromNullable(path(['address', 'country']));

  const toLowerCase = maybeFromNullable(toLower);

  const findLanguageOfUser = (user) =>
    Maybe.fromEmpty(user)
      .flatMap(getCountry)
      .flatMap(toLowerCase)
      .flatMap(getLang)
      .orSome('English');

  console.log(map(findLanguageOfUser, users));
};
