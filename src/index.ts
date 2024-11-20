import server from './server';
import colors from 'colors';



console.log('index');

//process.env.PORT: EL PUERTO QUE ME DARA EL SERVIDOR ES ESTE
const port=process.env.PORT || 3000

server.listen(port,()=>{
    console.log(colors.white.bgCyan(`rest api en el puerto ${port}`));
})

