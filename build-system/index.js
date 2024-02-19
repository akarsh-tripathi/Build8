const {S3Client,PutObjectCommand, S3Client, S3}=require('@aws-sdk/client-s3')
const {exec}= require('child_process')
const path = require('path')
const fs = require('fs')
const mime = require('mime-types')


const PROJECT_ID = process.env.PROJECT_ID


const S3Client = S3Client({
    region: 'ap-south-1',
    credentials:{
<<<<<<< HEAD
        accessKeyId: process.env.AWS_ECS_SECRET_ACCESS_ID,
        secretAccessKey: process.env.AWS_ECS_SECRET_ACCESS_KEY
=======
        accessKeyId: 'Access ID',
        secretAccessKey: 'Access Key'
>>>>>>> 4a04885df9a03a1612078ec902c614a157e7ca27
    }
    
})


async function init(){
    console.log("Starting Index.JS File")
    const Output_Directory_Path = path.join(__dirname,'output')
    const p = exec('cd ${Output_Directory_Path} && npm install && npm run build')
    p.stdout.on('data',function(data){
        console.log(data.toString())
    })
    p.stdout.on('error',function(data){
        console.log('Error: ', data.toString())
    })
    p.on('close', async function(data){
        console.log('Build Complete')
        const distFolderPath = path.join(__dirname,'output','dist')
        const FolderContents = fs.readdirSync(distFolderPath,{recursive:true})
        
        for (const filePath of FolderContents){
            console.log("Uploading File... ", filePath)
            if(fs.lstatSync(filePath).isDirectory()) continue; // We don't need directories
            const command = PutObjectCommand({
                Bucket:'vercel-build-systems',
                Key:'__outputs/${PROJECT_ID)/${filePath}',
                Body: fs.createReadStream(filePath),
                ContentType:mime.lookup(filePath)
            })
            await S3Client.send(command)
            console.log("Files Uploaded Successfully...")
        }
    })

}

init();
