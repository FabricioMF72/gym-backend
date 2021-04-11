const express = require('express') /*commonjs import*/
const cors = require('cors')
const app = express() /* creating express application */

app.use(cors())
app.use(express.json())
const port = 3000

let rutines = [
        {
            id:1,
            day:"monday",
            exercise:[
                "polea",
                "mancuerna",
                "bicicleta"
            ]
        },
        {
            id:2,
            day:"tuesday",
            exercise:[
                "barra",
                "sentadilla",
                "polea"
            ]
        },
        {
            id:3,
            day:"wednesday",
            exercise:[
                "correr",
                "saltar",
                "plancha"
            ]
        },
    ]

/* creating a new route*/ 
app.get('/', (req, res) => {           
  res.send("<h1> Hello World </h1>");
})

app.get('/api/rutines', (req, res) => {
    res.json(rutines);
})

/* creating a new route get rutine day by id*/ 
app.get('/api/rutines/:id', (req, res) => {
    const id = Number(req.params.id)
    const rutine = rutines.find(rutine => rutine.id === id);
    rutine? res.json(rutine) : res.send("<h1> Error en la rutina buscada </h1>");
})

/* creating a new route delete rutine day by id*/ 
app.delete('/api/rutines/:id', (req, res) => {
    const id = Number(req.params.id);
    rutines = rutines.filter(rutine => rutine.id !== id);
    res.status(204).end();
})

/* creating a new route create rutine day*/ 
app.post('/api/rutines', (req, res) => {
    const rutine = req.body
    if(!rutine){
        return res.status(400).json({
            error: "rutine content is missing"
        });
    }
    const ids = rutines.map(rutine => rutine.id)
    const maxId = Math.max(... ids)
    const newRutine = {
        id: maxId+1,
        day: rutine.day,
        exercise: rutine.exercise
    }
    rutines = rutines.concat(newRutine)
    res.status(201).json(newRutine)
    
})

/*middleware that helps in case the route doesnt exist */
app.use((request, response,next) =>{
    response.status(404).json({
        error: 'Not found'
    })
    next();
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})