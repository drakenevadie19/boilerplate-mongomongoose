require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favoriteFoods: [String]
});

let Person;
const person_schema = mongoose.model('Person' , personSchema);
Person = person_schema;

const createAndSavePerson = (done) => {
  const drake = new Person({
     name: "Drake", age: 20, favoriteFoods: ["chocolate"]
  });
  console.log(drake);
  drake.save((err, savedPerson) => {
    if (err) return done(err);
    done(null, savedPerson);
  });
};

const arrayOfPeople = [
  {
    name: "Duc Toan Nguyen",
    age: 21,
    favoriteFoods: ["Bun Thit Nuong", "Canh rau muong"]
  },
  {
    name: "Quoc An Dinh",
    age: 21,
    favoriteFoods: ["Trung ran", "Canh rau muong"]
  },
  {
    name: "Trong Dung Nguyen",
    age: 21,
    favoriteFoods: ["Deep Fries", "Xuc xich nhung deeply fries"]
  },
  {
    name: "Thanh Nguyen Do",
    age: 20,
    favoriteFoods: ["Bun Thit Nuong", "Com Tam"]
  },
  {
    name: "Trung Kien Pham",
    age: 20,
    favoriteFoods: ["Mi nui", "Com Tam"]
  },
  {
    name: "Phuc Thao Vy Nguyen",
    age: 19,
    favoriteFoods: ["Bun dau mam tom", "Com Tam"]
  },
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, savedPerson) => {
    if (err) return done(err);
    done(null, savedPerson);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, people) => {
    if (err) return done(err);
    done(null, people);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, people) => {
    if (err) return done(err);
    done(null, people);
  });
};

const findPersonById = (personId, done) => {
  done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;