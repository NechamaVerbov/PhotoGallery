let numPage = 1

document.addEventListener("DOMContentLoaded", function (event)
{
   /*let tag = localStorage.getItem("tag");
   document.getElementById("txt_tag").value = tag;*/
   getPhotos();
}, false)



function populatePhotos(photoArr)
{
    let container=document.getElementById("image_gallery");
    photoArr.map(
        function (photo)
        {
            let img = new image(photo);
            let elem = img.render();
            container.appendChild(elem);
        })
}

function getTag()
{
    let tag = document.getElementById("txt_tag").value
    return tag;
}

function getImagesByTag()
{
    let val = getTag();
    document.getElementById("image_gallery").innerHTML = "";
    getPhotos();
}

function getPhotos()
{
    let val = getTag();
    if (!val) { val = "sunrise" }
    let container = document.getElementById("image_gallery");
    if (document.getElementsByClassName("loading").length == 0)
    {
        let div = document.createElement("div")
        div.className = "loading";
        container.appendChild(div);
    }
    

    /*localStorage.setItem("tag", val);*/
    let url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=860dc345a325c43cd56de2229b5a35c7&tags=${val}&per_page=30&extras=url_l&page=${numPage}&format=json&nojsoncallback=1`;
    fetch(url)
        .then(function (response)
        {
            return response.json()
            
        }, function (response)
        {
            console.log("error")
        })
    .then(function (res)
    {
        populatePhotos(res.photos.photo);
        document.getElementsByClassName("loading")[0].remove();
    });
}

function checkKey(event) {
    if (event.keyCode === 13) {
        let val = getTag();
        document.getElementById("image_gallery").innerHTML = "";
        getPhotos();
    }
}

function cancelLarge()
{
    let tmp = document.getElementById("enlarged_img");
    tmp.classList.remove("expand_img");
    tmp.className = "hide";
}

function morePics()
{
    let elm = document.getElementById("image_gallery");

    
    if (elm.scrollTop + elm.clientHeight == elm.scrollHeight)
    {
        numPage++;

        getPhotos();

        
    }

}
