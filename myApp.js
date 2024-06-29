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
  Person.findById({ _id: personId }, (err, people) => {
    if (err) return done(err);
    done(null, people);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  // Find the person by ID
  Person.findById(personId, (err, person) => {
    if (err) {
      return done(err);
    }
    if (!person) {
      return done(new Error('Person not found'));
    }

    // Add "hamburger" to the favoriteFoods array
    person.favoriteFoods.push(foodToAdd);

    // Save the updated person document
    person.save((err, updatedPerson) => {
      if (err) {
        return done(err);
      }
      // Return the updated person document
      done(null, updatedPerson);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  // Find the person by Name
  Person.findOne({ name: personName }, (err, person) => {
    if (err) {
      return done(err);
    }
    if (!person) {
      return done(new Error('Person not found'));
    }

    // Change Person's age
    person.age = ageToSet;

    // Save the updated person document
    person.save((err, updatedPerson) => {
      if (err) {
        return done(err);
      }
      // Return the updated person document
      done(null, updatedPerson);
    });
  });
};

const removeById = (personId, done) => {
  // Use findByIdAndRemove to find the person by ID and remove the document
  Person.findByIdAndRemove(personId, (err, removedPerson) => {
    if (err) {
      return done(err);
    }
    // Pass the removed document to the callback
    done(null, removedPerson);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({ name: nameToRemove }, (err, result) => {
    if (err) {
      return done(err);
    }
    // Pass the result to the callback
    done(null, result);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  // Build up the query using chaining syntax
  Person.find({ favoriteFoods: foodToSearch })
    .sort('name')
    .limit(2)
    .select('-age')
    .exec((err, data) => {
      if (err) {
        return done(err);
      }
      // Pass the result to the callback
      done(null, data);
    });
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