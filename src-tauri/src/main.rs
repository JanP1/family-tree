// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use family_tree_lib::database_connection::establish_pool;

use family_tree_lib::database_connection::read_from_table;

fn main() {
    let pool = establish_pool().expect("Failed to create DB pool");

    tauri::Builder::default()
        .manage(pool)
        .invoke_handler(tauri::generate_handler![
            read_from_table::get_all_trees

        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri app");
}
