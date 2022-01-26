let helpObj=require('./help')
let fs= require('fs')
let path=require('path')
const chalk= require('chalk');
function treefn(dirPath){
    if(dirPath == undefined){
        treeHelper(process.cwd(),"")
        return;
    }
    else{
        let doesExist= fs.existsSync(dirPath)
        if(doesExist){
           treeHelper(dirPath,"")
        }
        else{
            console.log("!! folder doesn't exist !!")
            helpObj.helpKey()
            return;
        }
    }
    return;
}
function treeHelper(src,output){
    let doesExist=fs.lstatSync(src).isFile();
    if(doesExist){
        console.log(output+"├──",path.basename(src))
        return;
    }
    let basename=path.basename(src);
    console.log(output+"└──"+basename)
    let filesList=fs.readdirSync(src)
    for(let i=0; i<filesList.length; i++){
        let destpath=path.join(src,filesList[i])
        treeHelper(destpath,output+"\t");
    }
    return;
}

module.exports={
    treefn
}

