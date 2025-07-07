pub mod read_from_table;


use diesel::SqliteConnection;
use std::env;
use dotenvy::dotenv;
use diesel::r2d2::{ConnectionManager, Pool};

pub type DbPool = Pool<ConnectionManager<SqliteConnection>>;

pub fn establish_pool() -> Result<DbPool, String> {
    dotenv().ok();

    let database_url = env::var("DATABASE_URL")
        .map_err(|_| "DATABASE_URL must be set in .env or environment".to_string())?;

    let manager = ConnectionManager::<SqliteConnection>::new(database_url);

    Pool::builder()
        .build(manager)
        .map_err(|e| format!("Failed to create DB pool: {}", e))
}
// pub fn establish_connection() -> Result<SqliteConnection, String> {
//     dotenv().ok();
//
//     let database_url = env::var("DATABASE_URL")
//         .map_err(|_| "DATABASE_URL must be set".to_string())?;
//
//     SqliteConnection::establish(&database_url)
//         .map_err(|_| format!("Error connecting to {}", database_url))
// }
