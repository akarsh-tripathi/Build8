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

proxy.on('proxyReq',(proxyReq,req, res)=>{
    const url = req.url;
    if (url === '/'){
        proxyReq.path+='index.html'
        return proxyReq;
    }
})

app.listen(PORT, ()=>{console.log(`App has started listening on Port ${PORT}`)})


