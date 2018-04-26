Meteor.publish('layoutData', (connectionSlug, databaseName, collectionName) => {
  check(connectionSlug, Match.OneOf(String, null));
  check(databaseName, Match.OneOf(String, null));
  check(collectionName, Match.OneOf(String, null));


  const userId = this.userId || Meteor.call('userIsInRole');
  console.log(userId, 'layoutData');
  let ret = null;
  try {
    ret = JSON.parse(userId);
    const DrRoles = [Meteor.settings.readRole, Meteor.settings.writeRole];
    if(_.intersection(DrRoles, ret.roles).length === 0) {
      throw new Meteor.Error('userIsInRole', `${ret.roles} roles is not vaild!`);
      this.ready();
    }
  } catch (e) {
    throw new Meteor.Error('userIsInRole', `${userId} userId is not vaild!`); 
    this.ready();
  }

  log(connectionSlug, databaseName, collectionName);
  let databasesSelector = null;
  let collectionsSelector = null;

  let connection, database, collection;
  if (connectionSlug) {
    connection = Connections.findOne({slug: connectionSlug});
    if(connection) {
      if (databaseName) {
        database = Databases.findOne({connection_id: connection._id, name: databaseName});
        if(database) {
          databasesSelector = {_id: database._id};

          if (collectionName) {
            collection = Collections.findOne({database_id: database._id, name: collectionName});
            if(collection) {
              collectionsSelector = {_id: collection._id};
            }
          }
        }
      }
    }
  }

  let connectionFilter = {};
  if(ret && ret.roles.indexOf(Meteor.settings.writeRole) === -1) {
    connectionFilter = {
      mongoUri: {$nin: Meteor.settings.writeMongoUrl}
    };
  }

  const publish = [];
  publish.push(Settings.find());
  publish.push(Connections.find(connectionFilter));
  publish.push(FilterHistory.find());

  if(databasesSelector) publish.push(Databases.find(databasesSelector));
  if(collectionsSelector) publish.push(Collections.find(collectionsSelector));

  return publish;
});


Meteor.publish('navigationData', (connectionId, databaseId) => {
  check(connectionId, Match.OneOf(String, null));
  check(databaseId, Match.OneOf(String, null));


  const userId = this.userId || Meteor.call('userIsInRole')
  console.log(userId, 'navigationData');
  let ret = null;
  try {
    ret = JSON.parse(userId);
    const DrRoles = [Meteor.settings.readRole, Meteor.settings.writeRole];
    if(_.intersection(DrRoles, ret.roles).length === 0) {
      throw new Meteor.Error('userIsInRole', `${ret.roles} roles is not vaild!`);
      this.ready();
    }
  } catch (e) {
    throw new Meteor.Error('userIsInRole', `${userId} userId is not vaild!`); 
    this.ready();
  }

  let databasesSelector = null;
  let collectionsSelector = null;

  if(connectionId) {
    databasesSelector = {connection_id: connectionId};
  }

  if(databaseId) {
    collectionsSelector = {database_id: databaseId};
  }


  let connectionFilter = {};
  if(ret && ret.roles.indexOf(Meteor.settings.writeRole) === -1) {
    connectionFilter = {
      mongoUri: {$nin: Meteor.settings.writeMongoUrl}
    };
  }

  const publish = [];
  publish.push(Connections.find(connectionFilter));
  if(databasesSelector) publish.push(Databases.find(databasesSelector));
  if(collectionsSelector) publish.push(Collections.find(collectionsSelector));

  return publish;
});

Meteor.publish('databases', function(connectionSlug) {
  check(connectionSlug, String);

  const connection = Connections.findOne({slug: connectionSlug});

  return [
    Connections.find(connection._id),
    Databases.find({connection_id: connection._id})
  ]
});


Meteor.publish('test', function() {
  console.log(this.userId);
  return null;
});
