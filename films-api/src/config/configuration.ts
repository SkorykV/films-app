export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    type: 'postgres',
    host: process.env.DB_HOSTNAME || 'localhost',
    port: parseInt(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    autoLoadEntities: true,
    synchronize: parseBooleanEnvVariable(process.env.TYPEORM_SYNC) || false,
    logging: parseBooleanEnvVariable(process.env.TYPEORM_LOGGING) || false,
  },
});

function parseBooleanEnvVariable(value) {
  return !!value && value.toLowerCase() === 'true';
}
