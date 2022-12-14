const express = require('express');
const router = express.Router();

const pool = require('../database.js');
const { isLoggedIn } = require('../lib/auth');

router.get('/add', isLoggedIn, (req, res)=>{
    res.render('../views/links/add.hbs');
})

router.post('/add', isLoggedIn, async(req, res)=>{
    const { title, url, descripcion} = req.body;
    const newLink = {
        title,
        url,
        descripcion,
        user_id: req.user.id
    }
    await pool.query('INSERT INTO links set ?',[newLink]);
    req.flash('success', 'Link saved successfully')
    res.redirect('/links');
});

router.get('/', isLoggedIn, async(req, res)=>{
    const links = await pool.query('SELECT * FROM links WHERE user_id = ?',[req.user.id]);
    res.render('../views/links/list.hbs', {links});
});

router.get('/delete/:id', isLoggedIn, async(req, res)=>{
    const { id } = req.params;
    await pool.query('DELETE FROM links WHERE ID = ?', [id]);
    req.flash('success', 'Link deleted successfully');
    res.redirect('/links');
});

router.get('/edit/:id', isLoggedIn, async(req, res) =>{
    const { id } = req.params;
    const link = await pool.query('SELECT * FROM links WHERE ID=?',[id]);
    res.render('../views/links/edit.hbs', {link:link[0]});
})

router.post('/edit/:id', isLoggedIn, async(req, res)=>{
    const { id } = req.params;
    const {title, url, descripcion} = req.body;
    const newLink = {
        title,
        url,
        descripcion
    }
    await pool.query('UPDATE links set ? WHERE id = ?', [newLink, id]);
    req.flash('success', 'Link modify successfully');
    res.redirect('/links');
})
module.exports = router;