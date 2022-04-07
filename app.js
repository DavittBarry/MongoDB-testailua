const express = require('express')
const dotenv = require('dotenv')
const ejs = require('ejs')
const connectDB = require('./db.js')
const mongoose = require('mongoose')
const app = express()
dotenv.config({ path: "./config/config.env" })
const port = process.env.PORT || 3333
app.set('view engine', 'ejs')
connectDB() //heti alkuun, jotta nähdään konsolissa onnistuiko yhteys

//Mongoose:n luonti
const animalSchema = new mongoose.Schema({
    animal_name: String,
    continent: String,
    animal_says: String
})

//Olion mallin luonti 
const Animal = mongoose.model('Test', animalSchema) //->luo tests-collectionin

//itse olioiden luonti (manuaalisesti tässä vain harjoituksen vuoksi)
const Tiger = new Animal({
    animal_name: 'Tikru',
    continent: 'Africa',
    animal_says: 'ROAR'
})

const Icebear = new Animal({
    animal_name: 'IceBear',
    continent: 'North America',
    animal_says: 'MUR'
})

const Dog = new Animal({
    animal_name: 'Doggie',
    continent: 'Africa',
    animal_says: 'WUF'
})


async function saveToDB(name) { //huom. sisällyttää await
    await name.save(function (err) { 
        if (err) return console.log(err)
        console.log(name.animal_name + " lisättiin")
    })
}
//saveToDB(Tiger)
//saveToDB(Dog)
//saveToDB(Icebear)

let animals = {}
let sortedAfricanAnimalsByName={}

async function getAllAnimalsLivingInAfrica(){
    //asetetaan find-metodille ehdoksi että continent = 'Africa'
    animals = await Animal.find({continent: 'Africa'})
    //mapataan objektiin tulokset, sortattuna animal_name:n mukaan:
    sortedAfricanAnimalsByName = animals.map(x=>x.animal_name).sort();
}
getAllAnimalsLivingInAfrica()

//ROUTES---------------->
app.get('/', (req, res) => {
    res.render('index',{
        animal: sortedAfricanAnimalsByName
    })
})

app.listen(port)