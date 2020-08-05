const fs= require('fs');
const path= require('path');
const http=require('http');

const hostname='localhost';
const port=3000;

const server =http.createServer((req,res)=>{
    //console.log(req.headers);
console.log('Request for'+req.url+'by method'+req.method);
if(req.method=='GET')
{
    var fileUrl;
    if(req.url=='/') fileUrl='/index.html';
    else fileUrl=req.url;

    var filePath=path.resolve('./'+fileUrl);
    const fileExt=path.extname(filePath);
    if(fileExt=='.html')
    {
        fs.exists(filePath,(exists)=>{
            if(!exists)
            {
                res.statusCode=404;
                res.setHeader('content-Type','text/html');
                res.end('<html><body>Error 404:Not found no file path found '+filePath+'</body></html>');
                return;
            }
            
            res.statusCode=200;
            res.setHeader('content-Type','text/html'); 
            fs.createReadStream(filePath).pipe(res);
            
        });

    }
    else{
        res.statusCode=404;
        res.setHeader('content-Type','text/html');
        res.end('<html><body>Not a html file</body></html>');
    }

}
else{
    res.statusCode=404;
    res.setHeader('content-Type','text/html');
    res.end('<html><body>method not supported</body></html>');
}
})
server.listen(port,hostname,()=>{
    console.log(`Server running at http://${hostname}:${port}/`);
});