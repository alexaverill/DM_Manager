async function GetRequest(url){
    const response = await fetch(url,{
        method:'GET'
    });
    if(response.status == 200){
    return response.json();
    }
    return {status:"failed"};
}
async function PostRequest(url,data){
    const response = await fetch(url,{
        method:'POST',
        body:JSON.stringify(data)
    });
    return response.json();
}
async function FilePostRequest(url,data){
    const response = await fetch(url,{
        method:'POST',
        body:data
    })
}
module.exports = {
    GetRequest,
    PostRequest,
    FilePostRequest
}