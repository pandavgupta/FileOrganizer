function helpfn(){
    console.log(`
    List of all command:
       node main.js tree "directorPath"
       node main.js organize "directoryPath"
       node main.js help 
    `);
}

module.exports={
    helpKey: helpfn
}