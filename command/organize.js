let helpObj=require('./help')
let fs= require('fs')
let path=require('path')
const chalk= require('chalk');
let fileTypes={
    app: ['exe','msi','dmg','pkg','deb'],
    photo: ['jpeg','jpg','png','gif','tiff','psd', 'eps','ai','indd'],
    media: ['mp3','wav','mp4','mkv', 'mov','wmv','flv', 'avi','avchd','webm'],
    document: ['docx','doc','pdf', 'xlsx','odt','xls','ods','ppt','pptx','txt','tex','odp'],
    archive: [ 'zip','7z','rar','tar','gz','ar','iso','xz']
   
}
function organizefn(dirPath){
    // 1.input --> directory path
    if(dirPath == undefined){
        let destpath= path.join(process.cwd(),"organized_files");
           if(!fs.existsSync(destpath)){
            fs.mkdirSync(destpath);
           }
           organizeHelper(process.cwd(),destpath)
        return;
    }
    else{
        let doesExist= fs.existsSync(dirPath)
        if(doesExist){
           // 2.create --> organized files--> directory
           let destpath= path.join(dirPath,"organized_files");
           if(!fs.existsSync(destpath)){
            fs.mkdirSync(destpath);
           }
           organizeHelper(dirPath ,destpath)

        }
        else{
            console.log("!! file doesn't exist !!")
            helpObj.helpKey()
            return;
        }
     
    }
    
    // 3.identity categories of all the files present in that input directory 
    // 4.copy/cut files to that organised directory insideof any category folder

}
function organizeHelper(src,dest){
    let files=fs.readdirSync(src)
    // console.log(files);
    let fileLoc,ext,category; 
    for(let i=0; i<files.length; i++){
        fileLoc=path.join(src,files[i])
        if(fs.lstatSync(fileLoc).isFile()){
            ext=path.extname(fileLoc);
            let category=getcategory(ext);
            // console.log(category);

            //copying files
            let destpath=path.join(dest,category)
            if(!fs.existsSync(destpath)){
            fs.mkdirSync(destpath)
            }
            let destFile=path.join(destpath,files[i])
            if(!fs.existsSync(destFile)){
            fs.copyFileSync(fileLoc,destFile)
            console.log(files[i],chalk.green("copying  to ",category))
            fs.unlinkSync(fileLoc)
           }
           else{
            console.log(files[i],chalk.yellow(" already copied to ",category))

           }
        }

    }
   
}

function getcategory(ext){
    ext=ext.slice(1);
    for(let type in fileTypes){
        let typeArr=fileTypes[type];
        for(let i=0; i<typeArr.length; i++){
            if(typeArr[i]==ext)
            return type;
        }
    }
    return 'others';
}
module.exports={organizefn };

