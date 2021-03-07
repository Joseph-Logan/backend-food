import express from 'express';
import Logger from '@loaders/logger'
import config from '@config';
class Server {
  private app: express.Application;

  constructor () {
    this.app = express();
  }

  public initServer() {
    new Promise(resolve => {
      resolve(require('./loaders').default({expressApp: this.app}))
    }).then(() => {
      this.startServer(this.app)
    })
  }

  private startServer(app: express.Application) {
    app.listen(config.port, () => {
      Logger.info(`
        ################################################
        🛡️  Server listening on port: ${config.port} 🛡️
        🌐 http://localhost:${config.port}
        ################################################
      `);
    });
  }
}

new Server().initServer();