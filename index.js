const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');


//Model
const Member = require('./model/members.model');
//Routes
const memberRoute = require('./routes/members.routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(methodOverride('_method'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//home route
app.get('/', async(req, res) => {
  const members = await Member.find({});
  console.log({ members });

  res.render('index', { title: "Members List", members });
});

//members routes
app.use('/api/members', memberRoute);


mongoose
  .connect("mongodb://127.0.0.1:27017/member_manager", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log("Connected to Database!");
    app.listen(3000, () => console.log(`Server has started on PORT 3000`));
  })
  .catch(err => {
    console.log(err);
  });
