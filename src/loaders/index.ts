import Logger from './logger';
import expressLoader from './expressLoader'
import mongooseLoader from './mongooseLoader'

export default async ({ expressApp }: {expressApp: any}) => {

  await mongooseLoader()
  Logger.info('✌️ DB loaded and connected!');

  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');

}