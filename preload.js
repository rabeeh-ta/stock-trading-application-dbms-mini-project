const { contextBridge } = require('electron');
const { login, createUser } = require('./backend/userApi');

contextBridge.exposeInMainWorld('backend', {
  login: login,
  createUser: createUser,
});
