import faker from 'faker';

export const generateUsers = (qty = 200) => {
  var users = [];
  for (let i = 0; i < qty; i++) {
    users.push({
      ...faker.helpers.createCard(),
      designation: faker.name.jobType(),
      salary: faker.finance.amount(),
    });
  }
  return users;
};

export const users = [
  {
    firstName: 'John',
    lastName: 'Doe',
    address: {
      country: 'IND',
      city: 'Pune',
    },
  },
  {
    firstName: 'Paulo',
    lastName: 'Martini',
    address: {
      country: 'ESP',
      city: 'Barcelona',
    },
  },
  {
    firstName: 'Smith',
    lastName: 'Doe',
  },
  {
    firstName: 'Marshall',
    lastName: 'Doe',
    address: {},
  },
  {
    firstName: 'Jane',
    lastName: 'Doe',
    address: {
      country: 'SRB',
      city: 'Belgrade',
    },
  },
  null,
  undefined,
];

export const languageOfCountry = {
  ind: 'Hindi',
  usa: 'English',
  esp: 'Spanish',
  gbr: 'English',
  ger: 'German',
  rus: 'Russia',
};
