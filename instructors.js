const Intl = require('intl');
const fs = require('fs');
const data = require('./data.json');
const { age, date } = require('./utils');

//show (mostrar)
exports.show = function(req, res){
    //req.params = /:id
    const { id } = req.params;

    const foundInstructor = data.instructors.find(function(instructor){
        return instructor.id == id;
    });

    if(!foundInstructor) return res.send('Instructor not found!');

    const instructor = {
        ...foundInstructor,
        age: age(foundInstructor.birth),
        services: foundInstructor.services.split(','),
        created_at: new Intl.DateTimeFormat("pt-BR").format(foundInstructor.created_at),
    }

    return res.render('instructors/show', { instructor });
}

//create
exports.post = function(req, res){
    //req.body=
    //["avatar_url", "name", "birth", "gender", "services"]
    const keys = Object.keys(req.body);

    for(key of keys){
        //req.body.key == ""
        if(req.body[key] == ""){
            return res.send('Please, fill all fields!');
        }
    }

    let {avatar_url, birth, name, services, gender} = req.body;

    birth = Date.parse(birth);
    const created_at = Date.now();
    const id = Number(data.instructors.length + 1);

    //[]
    data.instructors.push({
        id,
        avatar_url,
        name,
        birth,
        gender,
        services,
        created_at,
    }); //[{...}]

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if(err) return res.send('Write file error!');

        return res.redirect('/instructors');
    });

    //return res.send(req.body);
}

//edit
exports.edit = function(req, res){
    //req.params = /:id
    const { id } = req.params;

    const foundInstructor = data.instructors.find(function(instructor){
        return instructor.id == id;
    });

    if(!foundInstructor) return res.send('Instructor not found!');

    // instructor.birth = 5465165864844
    // date(instructor.birth)
    //return yyyy-mm-dd

    const instructor = {
        ...foundInstructor,
        birth: date(foundInstructor.birth)
    }

    return res.render('instructors/edit', { instructor });
}