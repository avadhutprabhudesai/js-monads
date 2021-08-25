/* eslint-disable no-unused-vars */
/* eslint-disable @babel/new-cap */
import Future, {
  chain,
  chainRej,
  encaseP,
  fork,
  map,
  reject,
  resolve,
  value,
} from 'fluture';
import { prop, toUpper } from 'ramda';

export const IOMonad = () => {
  console.log('\n\n%c****IO Monad****', 'font-size: 20px;color: green');

  /**
   * Issues
   * . How to get value contained inside a Future?
   * . How to have success and reject path in same function
   */

  Future((rej, res) => {
    rej(422);
    return () => {};
  }).pipe(fork(console.error)(console.log));

  const futureFetch = encaseP(fetch);

  const fetchAllUsers = () =>
    futureFetch('https://jsonplaceholder.typicode.com/posts')
      .pipe(chain(encaseP((res) => res.json())))
      .pipe(chainRej((e) => reject(e)));

  const fetchUsersById = (id) =>
    fetchAllUsers().pipe(
      chain((x) => resolve(x.filter((ele) => ele.userId === id)))
    );

  var result;
  fetchUsersById(1)
    .pipe(map((x) => x.map((x) => toUpper(x.title))))
    .pipe(
      fork((x) => {
        result = 'Unable to  fetch the data';
        console.log(result);
      })((x) => {
        result = x;
        console.log(result);
      })
    );
};
