var url = 'http://mylogger.io/log';

const log = message => {
  console.log(message);

  emitter.emit('messageLogged', {
    id: 1,
    url: 'http://'
  });
}

module.exports = log;