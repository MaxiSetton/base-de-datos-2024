import { conn } from "../db.js";

const getArtistas = async (req, res) => {
    try{ 
        const [rows, fields]= await conn.query(
    "SELECT * FROM artistas"
    )
    res.json(rows)}
    catch(err){
        console.log(err)
    }
    
};

const getArtista = async (req, res) => {
    const id= req.params.id;
    try{ 
        const [rows, fields]= await conn.query(
    "SELECT * FROM artistas WHERE artistas.id=?",[id]
    )
    res.json(rows[0])}
    catch(err){
        console.log(err)
    }// Completar con la consulta que devuelve un artista
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    /*
        {
            "id": "Id del artista",
            "nombre": "Nombre del artista"
        }
    */
};

const createArtista = async (req, res) => {
    const nombreArtista= req.body.nombre
    
    try{ 
        const [rows, fields]= await conn.query(
    "INSERT INTO artistas (nombre) VALUES (?)",[nombreArtista]
    )
    res.send("Se insertó el artista correctamente")}
    catch(err){
        console.log(err)
    }
    // Completar con la consulta que crea un artista
    // Recordar que los parámetros de una consulta POST se encuentran en req.body
    // Deberían recibir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre del artista",
        }
    */
};

const updateArtista = async (req, res) => {
    const id=req.params.id
    const nombreArtista= req.body.nombre
    
    try{ 
        const [rows, fields]= await conn.query(
    "UPDATE artistas SET nombre=? WHERE artistas.id=?",[nombreArtista,id]
    )
    res.send("Artista actualizado correctamente")}
    catch(err){
        console.log(err)
    }
    // Completar con la consulta que actualiza un artista
    // Recordar que en este caso tienen parámetros en req.params (el id) y en req.body (los demás datos)
    // Deberían recibir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre del artista"
        }
    */
};

const deleteArtista = async (req, res) => {
    const id=req.params.id
    try{ 
        const [rows, fields]= await conn.query(
    "DELETE FROM artistas WHERE id=?",[id]
    )
    res.send("Se borró el artista correctamente")}
    catch(err){
        console.log(err)
    }
    // Completar con la consulta que elimina un artista
    // Recordar que los parámetros de una consulta DELETE se encuentran en req.params
};

const getAlbumesByArtista = async (req, res) => {
    const id=req.params.id
    try{ 
        const [rows, fields]= await conn.query(
    `SELECT albumes.id, albumes.nombre, artistas.nombre AS nombre_artista 
    FROM artistas 
    JOIN albumes ON artistas.id = albumes.artista 
    WHERE artistas.id=?`,[id]
    )
    res.json(rows)}
    catch(err){
        console.log(err)
    }
    // Completar con la consulta que devuelve las canciones de un artista
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la misma forma que getAlbumes
};

const getCancionesByArtista = async (req, res) => {
    const id=req.params.id
    try{ 
        const [rows, fields]= await conn.query(
    `SELECT canciones.id, canciones.nombre,artistas.nombre AS nombre_artista, albumes.nombre AS nombre_album, canciones.duracion, canciones.reproducciones 
    FROM artistas 
    JOIN albumes ON artistas.id=albumes.artista 
    JOIN canciones ON albumes.id=canciones.album
    WHERE artistas.id=?`,[id]
    )
    res.json(rows)}
    catch(err){
        console.log(err)
    }
    // Completar con la consulta que devuelve las canciones de un artista
    // (tener en cuenta que las canciones están asociadas a un álbum, y los álbumes a un artista)
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la misma forma que getCanciones
};

const artistas = {
    getArtistas,
    getArtista,
    createArtista,
    updateArtista,
    deleteArtista,
    getAlbumesByArtista,
    getCancionesByArtista,
};

export default artistas;
