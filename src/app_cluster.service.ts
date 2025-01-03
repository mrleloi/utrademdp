/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
const cluster = require('cluster');
import * as os from 'os';
import { Injectable } from '@nestjs/common';
import config from '@config/app.config';

const maxCPUs = os.cpus().length;

@Injectable()
export class AppClusterService {
  static clusterize(callback: any): void {
    if (cluster.isMaster) {
      const savedEnv = {};
      let numCPUs = parseInt(config.clusters);
      if (numCPUs <= 0 || numCPUs > maxCPUs) {
        numCPUs = maxCPUs;
      }

      for (let i = 1; i <= numCPUs; i++) {
        const c = cluster.fork({ clusterId: i });
        savedEnv[c.process.pid] = i;
      }
      cluster.on('exit', (worker, _code, _signal) => {
        cluster.fork({ clusterId: savedEnv[worker.process.pid] });
      });
    } else {
      callback();
    }
  }
}
