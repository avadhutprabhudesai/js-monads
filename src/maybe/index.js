/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Maybe } from 'monet';
import {
  add,
  allPass,
  anyPass,
  filter,
  map,
  pathEq,
  prop,
  propEq,
  reduce,
} from 'ramda';
import { generateUsers } from '../mock-data';

export const MayBeMonad = () => {
  console.log('\n\n%c****Composition****', 'font-size: 20px;color: green');

  /**
   * Example 1
   * Using Maybe monad to access nested property on the object
   */
  const user1 = {
    name: 'John',
    address: {
      geo: {
        lat: '44.34',
        long: '32.02',
      },
    },
  };
  const user2 = {
    name: 'John',
    address: {},
  };
  const user3 = {
    name: 'John',
    address: {
      geo: {},
    },
  };
  const user4 = {
    name: 'John',
  };

  const printLatLong = (user) =>
    Maybe.fromEmpty(user)
      .flatMap((x) => Maybe.fromEmpty(prop('address')(x)))
      .flatMap((x) => Maybe.fromEmpty(prop('geo')(x)))
      .orSome('No geo info');

  console.log(printLatLong(user1));
  console.log(printLatLong(user2));
  console.log(printLatLong(user3));
  console.log(printLatLong(user4));
  /**
   * Example 2
   *
   * Given a list of employees of a company, calculate total salary paid to the employees satisfying following criteria,
   * 1. Employee is from America
   * 2. Employee has the designation as Developer/Engineer/Consultant/Officer
   *
   * Display 'No records found' if no employee matches the criteria.
   *
   *
   */

  const fromCountry = pathEq(['address', 'country']);
  const withTitle = propEq('designation');

  // Mock implementation of network request to fetch records of users with specific query params
  const fetchEmployeesFromDB = (filterCriteria) => {
    var results = filter(filterCriteria, generateUsers());
    // This branching is done to mimick the behavior of APIs where empty values are generally represented by null.
    if (results.length) return results;
    return null;
  };

  const employeesFromUSA = allPass([
    fromCountry('United States of America'),
    anyPass([
      withTitle('Developer'),
      withTitle('Engineer'),
      withTitle('Consultant'),
      withTitle('Officer'),
    ]),
  ]);

  console.log(
    Maybe.fromEmpty(fetchEmployeesFromDB(employeesFromUSA))
      .map(map(prop('salary')))
      .map(reduce(add, 0))
      .orSome('No records found')
  );
};
