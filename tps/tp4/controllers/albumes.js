import { conn } from "../db.js";

const getAlbumes = async (_, res) => {
    try{ 
        const [rows, fields]= await conn.query(
    "SELECT albumes.id, albumes.nombre, artistas.nombre AS nombre_artista FROM albumes JOIN artistas ON albumes.artista = artistas.id"
    )
    res.json(rows)}
    catch(err){
        console.log(err)
    }
};

const getAlbum = async (req, res) => {
    const id=req.params.id
    try{ 
        const [rows, fields]= await conn.query(
    "SELECT albumes.id, albumes.nombre, artistas.nombre AS nombre_artista FROM albumes JOIN artistas ON albumes.artista = artistas.id WHERE albumes.id=?",[id]
    )
    res.json(rows[0])}
    catch(err){
        console.log(err)
    }
};

const createAlbum = async (req, res) => {
    const nombreAlbum= req.body.nombre
    const artista= req.body.artista
    try{ 
        const [rows, fields]= await conn.query(
    "INSERT INTO albumes (nombre, artista) VALUES (?,?)",[nombreAlbum, artista]
    )
    res.send("Se creó el album correctamente")}
    catch(err){
        console.log(err)
    }
    // Completar con la consulta que crea un album
    // Recordar que los parámetros de una consulta POST se encuentran en req.body
    // Deberían recbir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre del album",
            "artista": "Id del artista"
        }
    */

};

const updateAlbum = async (req, res) => {
    const id=req.params.id
    const nombreAlbum= req.body.nombre
    const artista= req.body.artista
    try{ 
        const [rows, fields]= await conn.query(
    "UPDATE albumes SET  nombre=?, artista=?WHERE albumes.id= ?",[nombreAlbum, artista, id]
    )
    res.send("Se actualizó el album correctamente")}
    catch(err){
        console.log(err)
    }// Completar con la consulta que actualiza un album
    // Recordar que en este caso tienen parámetros en req.params (el id) y en req.body (los demás datos)
    // Deberían recbir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre del album",
            "artista": "Id del artista"
        }
    */
};

const deleteAlbum = async (req, res) => {
    const id=req.params.id
    try{ 
        const [rows, fields]= await conn.query(
    "DELETE FROM albumes WHERE id=?",[id]
    )
    res.send("Se borró el album correctamente")}
    catch(err){
        console.log(err)
    }
    // Completar con la consulta que elimina un album
    // Recordar que los parámetros de una consulta DELETE se encuentran en req.params
};

const getCancionesByAlbum = async (req, res) => {
    // Completar con la consulta que devuelve las canciones de un album
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la misma forma que getCanciones
};

const albumes = {
    getAlbumes,
    getAlbum,
    createAlbum,
    updateAlbum,
    deleteAlbum,
    getCancionesByAlbum,
};

export default albumes;
