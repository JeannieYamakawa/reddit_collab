'use strict';

const express = require('express');
const router = express.Router({
  mergeParams: true
});
const knex = require('../knex');
