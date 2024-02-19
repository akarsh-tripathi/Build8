const express = require('express');
const httpProxy  = require('http-proxy');

const AWS_ECS_URL = '';
const proxy = httpProxy.createProxy();

const app = express()
const PORT = 8000


app.use((req,res)=>{
    const hostname = req.hostname;
    const subdomain = hostname.split('.')[0];


    const resolveto = `${AWS_ECS_URL}/${subdomain}`;
    return proxy.web(req, res,{target:resolveto, changeOrigin:true})
})

app.listen(PORT, ()=>{console.log(`App has started listening on Port ${PORT}`)})


