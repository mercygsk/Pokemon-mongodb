// require dotenv so that I can use the .env fil
require('dotenv').config();
const express = require('express');
// require mongoose so that I can connect to my db
const mongoose = require('mongoose');

const methodOverride = require("method-override");
const app = express();
const Pokemon = require('./models/pokemon.js');
const jsxViewEngine = require('jsx-view-engine');

// Global configuration
const mongoURI = process.env.MONGO_URI;
const db = mongoose.connection;

// Connect to Mongo
mongoose.connect(mongoURI);
mongoose.connection.once('open', () => {
    console.log('connected to mongo');
})

app.set('view engine', 'jsx');
app.set('views', './views');
app.engine('jsx', jsxViewEngine());

// ================ Middleware ================
//
app.use((req, res, next) => {
    console.log('Middleware: I run for all routes');
    next();
})

//near the top, around other app.use() calls
app.use(express.urlencoded({extended:false}));

app.use(methodOverride("_method"));

app.get('/', (req, res) => {
    res.send("Welcome to the Pokemon App!  <a href='/pokemon'> Pokemon</a> ");
});

// I - INDEX - dsiplays a list of all fruits
app.get('/pokemon/', async(req, res) => {
    //res.send(pokemon);//jason file display
    // res.render('Index' , {pokemon : pokemon});
    try {
        const foundPokemon = await Pokemon.find({});
        res.status(200).render('Index', {pokemon: foundPokemon});
    } catch (err) {
        res.status(400).send(err);
    }
    
});

// N - NEW - allows a user to input a new fruit
app.get('/pokemon/new', async (req, res) => {
    res.render('New');
});


// C - CREATE - update our data store
app.post('/pokemon', async (req, res) => {
    try {
        const searchPokemon = await Pokemon.find({ name: req.body.name });
        console.log(searchPokemon);
        res.render("Show", { pokemon: searchPokemon });
      } catch (err) {
        res.status(400).send(err);
      }
    // pokemon.push(req.body);
    // res.send('data received');
    // res.redirect('/pokemon'); // send user back to /pokemon
});
// // E --Edit --to edit the data 
// app.get("/pokemon/:id/edit", async (req, res) => {
//     try {
//       const foundPokemon = await Pokemon.findById(req.params.id);
//       res.status(200).render("Edit", { pokemon: foundPokemon });
//     } catch (err) {
//       res.status(400).send(err);
//     }
//   });
  
//   // U----Update 
//   app.put("/pokemon/:id", async (req, res) => {
//     try {
//       const updatedPokemon = await Pokemon.findByIdAndUpdate(
//         req.params.id,
//         req.body
//       );
//       res.status(200).redirect(`/pokemon/${req.params.id}`);
//     } catch (err) {
//       res.status(400).send(err);
//     }
//   });
  
//   // D--Delete
//   app.delete("/pokemon/:id", async (req, res) => {
//     try {
//       const deletePokemon = await Pokemon.findByIdAndDelete(req.params.id);
//       res.status(200).redirect("/pokemon");
//     } catch (err) {
//       res.status(400).send(err);
//     }
//   });
  


// S - SHOW - show route displays details of an individual fruit
app.get('/pokemon/:id', async(req, res) => {
    try {
        const foundOnePokemon = await Pokemon.findById(req.params.id);
        res.render("Show", { pokemon: foundOnePokemon });
      } catch (err) {
        res.status(400).send(err);
      }
    // res.send(fruits[req.params.indexOfFruitsArray]);
    // res.render('Show', {pokemon: pokemon[req.params.whatever] });     // second parameter must be an object
    });
   



app.listen(3000, () => {
    console.log('listening');
});