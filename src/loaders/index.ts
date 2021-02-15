import Logger from './logger';
import expressLoader from './express-loader'
import mongooseLoader from './mongoose-loader'

export default async ({ expressApp }: {expressApp: any}) => {

  await mongooseLoader()
  Logger.info('✌️ DB loaded and connected!');

  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');

}