const Intl = require('intl');
const Member = require('../models/Member');
const { age, date } = require('../../lib/utils');

module.exports = {
    
    index(req, res){

        Member.all(function(members){
            return res.render('members/index', { members });
        });
        
    },

    create(req, res){

        return res.render('members/create');

    },
    
    post(req, res){

        //req.body=
        //["avatar_url", "name", "birth", "gender", "services"]
        const keys = Object.keys(req.body);

        for(key of keys){
            //req.body.key == ""
            if(req.body[key] == ""){
                return res.send('Please, fill all fields!');
            }
        }

        Member.create(req.body, function(member){
            return res.redirect(`/members/${member.id}`);
        });

    },

    show(req, res){

        Member.find(req.params.id, function(member){
            if(!member) return res.send('Member not found!');
            
            member.birth = date(member.birth).birthDay;

            return res.render('members/show', { member });
        });

    },

    edit(req, res){

        Member.find(req.params.id, function(member){
            if(!member) return res.send('Member not found!');
            
            member.birth = date(member.birth).iso;

            return res.render('members/edit', { member });
        });

    },

    put(req, res){

        //req.body=
        //["avatar_url", "name", "birth", "gender", "services"]
        const keys = Object.keys(req.body);

        for(key of keys){
            //req.body.key == ""
            if(req.body[key] == ""){
                return res.send('Please, fill all fields!');
            }
        }

        Member.update(req.body, function(){
            return res.redirect(`/members/${req.body.id}`);
        });

    },

    delete(req, res){

        Member.delete(req.body.id, function(){
            return res.redirect(`/members`);
        });
    },

}