async function GetRequest(url){
    const response = await fetch(url,{
        method:'GET'
    });
    if(response.status == 200){
    return response.json();
    }
    return {status:"failed"};
}

module.exports = {
    GetRequest
}