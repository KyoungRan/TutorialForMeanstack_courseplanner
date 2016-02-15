/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import User from '../api/user/user.model';
import Syllabus from '../api/syllabus/syllabus.model';
/*
Syllabus.find({}).removeAsync()
  .then(() => {
    Syllabus.createAsync({
      academy: String,
      year: Number,
      title: String,
      education: String,
      lecturer: String,
      objectives: String,
      iconurl: String,
      owner: {
        type: Schema.ObjectId,
        ref: 'User'
      },
      weekplans: [{
        week: Number,
        summary: String,
        topics: String,
        literature: String,
        videos: String,
        assignments: String,
        teaser: String
      }]
    }
    );
  });
*/
User.find({}).removeAsync()
  .then(() => {
    User.createAsync({
      provider: 'local',
      name: 'Test User',
      email: 'test@example.com',
      password: 'test'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin'
    })
    .then(() => {
      console.log('finished populating users');
    });
  });
