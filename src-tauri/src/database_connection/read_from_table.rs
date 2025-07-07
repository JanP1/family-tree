use diesel::prelude::*;
use crate::database_connection::DbPool;
use tauri::State;
use crate::models::Tree;

#[tauri::command]
pub fn get_all_trees(pool: State<DbPool>) -> Result<Vec<Tree>, String> {
    use crate::schema::trees::dsl::*;

    let mut conn = pool.get().map_err(|e| format!("Failed to get DB connection: {}", e))?;

    let results = trees
        .limit(5)
        .select(Tree::as_select())
        .load::<Tree>(&mut conn)
        .map_err(|e| e.to_string())?;

    Ok(results)
}
