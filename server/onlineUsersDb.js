const { mapValues, pickBy } = require('lodash');

const onlineUsers = {};

exports.logIn = (userId, socket) => {
  onlineUsers[userId] = socket;
};

exports.logOut = (userId) => {
  onlineUsers[userId] = undefined;
};

exports.getAll = () => pickBy(mapValues(onlineUsers, (o) => {
  return (o === undefined) ? 0 : 1;
}), v => v === 1);

exports.getSocket = userId => onlineUsers[userId];
