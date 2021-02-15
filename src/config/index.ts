export default {
	/**
	 * Your favorite port
	 */
	port: process.env.PORT,

	/**
	 * That long string from mlab
	 */
	databaseURL: process.env.MONGODB_URI || '',

	/**
	 * Your secret sauce
	 */
	jwtSecret: process.env.JWT_SECRET,

	/**
	 * Used by winston logger
	 */
	logs: {
		level: process.env.LOG_LEVEL || 'silly',
	},

	// /**
	//  * Agenda.js stuff
	//  */
	// agenda: {
	// 	dbCollection: process.env.AGENDA_DB_COLLECTION,
	// 	pooltime: process.env.AGENDA_POOL_TIME,
	// 	concurrency: parseInt(process.env.AGENDA_CONCURRENCY, 10),
	// },

	// /**
	//  * Agendash config
	//  */
	// agendash: {
	// 	user: 'admin',
	// 	password: 'admin',
	// },
	/**
	 * API configs
	 */
	api: {
		prefix: '/api',
	},
	/**
	 * Mailgun email credentials
	 */
	// emails: {
	// 	apiKey: process.env.MAILGUN_API_KEY,
	// 	domain: process.env.MAILGUN_DOMAIN,
	// },
};
