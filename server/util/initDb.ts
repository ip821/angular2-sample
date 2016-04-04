import {connect as dbConnect} from "pg";

var databaseUrl = process.env.DATABASE_URL || "pg://postgres:123@localhost/postgres";

export function initDb() {
    dbConnect(databaseUrl, (err, client, done) => {
        client.query("select 1 from information_schema.tables where table_name='actor'", (err, result) =>{
            if(result.rows.length == 0){
                client.query(
                    `create table actor(id serial, first_name varchar, last_name varchar, username varchar); \
                    insert into actor(first_name, last_name, username) values('1', '2', '3');
                    `, (err, result) =>{});
            }
        });
    });
}