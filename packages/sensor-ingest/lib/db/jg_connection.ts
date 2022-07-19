import { Sequelize } from 'sequelize'

// In a real app, you should keep the database connection URL as an environment variable.
// But for this example, we will just use a local SQLite database.
// const sequelize = new Sequelize(process.env.DB_CONNECTION_URL);
const databaseUrl:any = process.env.JG_POSTGRES_URI

const sslConfig:any = process.env.NODE_ENV === 'production' && {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
}

let JGConnection:any;

async function verifyConnection(db: any){
  await db.authenticate()
}

if (process.env.USE_DB) {
  JGConnection = new Sequelize(databaseUrl, {
    ...sslConfig,
    dialect: 'postgres',
    protocol: 'postgres'
  })
  verifyConnection(JGConnection)
}

export default JGConnection
