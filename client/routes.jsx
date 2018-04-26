import React from 'react';
import {mount} from 'react-mounter';

FlowRouter.route('/login/:token', {
  name: 'loginToken',
  action(params) {
    mount(ContentLayout, {content: <LoginToken {...params} /> });
  }
});

FlowRouter.route('/', {
  name: 'Connections',
  action(params) {
    Meteor.call('userIsInRole', sessionStorage.DrLoginToken, (error, result) => {
      if(error) {
        mount(ContentLayout, {content: <Loading />});
      } else {
        // done
        mount(SimpleLayout, {content: <ConnectionsPage />});
      }
    });
  }
});

FlowRouter.route('/_theme_', {
  name: 'Theme',
  action(params) {
    
    Meteor.call('userIsInRole', sessionStorage.DrLoginToken, (error, result) => {
      if(error) {
        mount(ContentLayout, {content: <Loading />});
      } else {
        // done
        mount(SimpleLayout, { content: <ThemePage /> });
      }
    });
  }
});

FlowRouter.route('/:connection', {
  name: 'ConnectionDashboard',
  action(params) {
    
    Meteor.call('userIsInRole', sessionStorage.DrLoginToken, (error, result) => {
      if(error) {
        mount(ContentLayout, {content: <Loading />});
      } else {
        // done
        mount(SimpleLayout, {content: <ConnectionDashboardPage {...params} />});
      }
    });
  }
});

FlowRouter.route('/:connection/:database', {
  name: 'DatabaseDashboard',
  action(params) {
    
    Meteor.call('userIsInRole', sessionStorage.DrLoginToken, (error, result) => {
      if(error) {
        mount(ContentLayout, {content: <Loading />});
      } else {
        // done
        mount(DefaultLayout, {content: <DatabaseDashboardPage {...params} />});
      }
    });
  }
});

FlowRouter.route('/:connection/:database/:collection/:filter?', {
  name: 'Documents',
  action(params, queryParams) {
    params = _.extend(params, queryParams);
    
    Meteor.call('userIsInRole', sessionStorage.DrLoginToken, (error, result) => {
      if(error) {
        mount(ContentLayout, {content: <Loading />});
      } else {
        // done
        mount(DefaultLayout, {content: <DocumentsPage {...params} />});
      }
    });
  }
});
