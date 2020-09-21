const { io } = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();
bands.addBand(new Band('Kittie'));
bands.addBand(new Band('Sepultura'));
bands.addBand(new Band('Apocaliptica'));
bands.addBand(new Band('Opeth'));
bands.addBand(new Band('Dream Theater'));
bands.addBand(new Band('Korn'));


io.on('connection', client => {
    console.log('Cliente conectado');

    client.emit('activeBands', bands.getBands());


    client.on('delete-band',(payload)=>{
    
        
        bands.deleteBand(payload.id);        
        console.log("Banda eliminada")
        io.emit('activeBands',bands.getBands());        
    });

    client.on('add-band',(payload)=>{
        const b = new Band(payload.name);
        bands.addBand(b);        
        io.emit('activeBands',bands.getBands());        
    });

    client.on('mensaje', (payload) => {
        console.log(`Mensaje `, payload);
        //io.emit('mensaje', {admin:'Respuesta del admin'})
    });
    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });


    client.on('emitir-mensaje', (payload) => {
        console.log(`Desde el cliente Web`, payload);
        client.broadcast.emit('nuevo-mensaje', payload)
    });
    
    client.on('vote', (band) => {   
        bands.voteBand(band.id);
        io.emit('activeBands',bands.getBands());
    });

});