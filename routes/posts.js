'use strict';

const express = require( 'express' );
const router = express.Router();
const knex = require( '../knex' );
const bcrypt = require( 'bcrypt-as-promised' );

router.get( '/', ( req, res, next ) => {
    knex( 'posts' ).then( ( posts ) => {
        res.render( 'posts', {
            posts: posts
        } )
    } )
} )

router.get( '/:id', ( req, res, next ) => {
    let postID = req.params.id;
    knex( 'posts' ).where( 'id', postID ).first().then( ( post ) => {
        res.render( 'single-post', {
            post: post
        } )
    } )
} )

router.get( '/:id/edit', ( req, res, next ) => {
    let postID = req.params.id;
    knex( 'posts' ).where( 'id', postID ).first().then( ( post ) => {
        res.render( 'edit-post', {
            post: post
        } )
    } )
} )


module.exports = router;
