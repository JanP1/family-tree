use diesel::prelude::*;
use serde::Serialize;

#[derive(Debug, Queryable, Selectable, Serialize)]
#[diesel(table_name = crate::schema::trees)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct Tree {
    pub id: i32,
    pub name: String,
}
