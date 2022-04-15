const spells = require('./db.json')


module.exports = {
    getFortune: (req, res) => {
        const fortunes = ['You will find luck in your second endeavor of next tuesday', '27 hours and 42 seconds from now, your left shoe will become untied', 'it will be 62 degress at some point on may the 17'];
        let randI = Math.floor(Math.random()*fortunes.length);
        let randFort = fortunes[randI];

        res.status(200).send(randFort);
    },
    getAllSpells: (req, res) => res.status(200).send(spells),
    getOneSpell: (req, res) => {
        let index = spells.findIndex(elem => elem.id === +req.params.id)
        res.status(200).send(spells[index])
    },
    createSpell: (req, res) => {
        const {name, details, level} = req.body;
        let newSpell = {
            id: spells.length + 1,
            name, 
            details,
            level
        }
        spells.push(newSpell)
        res.status(200).send(spells)

    },
    deleteSpell: (req, res) => {
        let index = spells.findIndex(elem => elem.id === +req.params.id)
        spells.splice(index, 1)
        res.status(200).send(spells)

    },
    updateSpell: (req, res) => {
        const {id} = req.params;
        const {type} = req.body;
        let index = spells.findIndex(elem => elem.id === +req.params.id)
        switch(type){
            case 'increase':
                spells[index].level += 1;
                res.status(200).send(spells);
                break;
            case 'decrease':
                spells[index].level -= 1;
                res.status(200).send(spells);
                break;
            default:
                res.status(400).send('something went wrong')
        }    

    }

}