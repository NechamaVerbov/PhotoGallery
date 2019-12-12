class image
    {
        constructor(photo)
        {
            this.photo = photo;
        }
        buildUrl()
        {
            return `https://farm${this.photo.farm}.staticflickr.com/${this.photo.server}/${this.photo.id}_${this.photo.secret}.jpg`
        }
        render()
        {
            let img_src = this.buildUrl();
            let div = document.createElement("div")
            div.className = "pictureFrame";
            div.style.backgroundImage = `url(${img_src})`;

            let div2 = document.createElement("div");
            div2.className = "buttons";

            let btn1 = document.createElement("button");
            btn1.className = "img_btn"; 
            let i1 = document.createElement("i");
            i1.className = "fa fa-expand fa-lg";
            btn1.appendChild(i1);
            btn1.onclick = () => {
                this.enlarge(this.photo.url_l)
            };

            let btn2 = document.createElement("button");
            btn2.className = "img_btn";
            let i2 = document.createElement("i");
            i2.className = "fa fa-trash fa-lg";
            btn2.appendChild(i2);
            btn2.onclick = ()=> {
                this.removeElement(div)
            };

            let btn3 = document.createElement("button");
            btn3.className = "img_btn";
            let i3 = document.createElement("i");
            i3.className = "fa fa-download fa-lg";
            btn3.appendChild(i3);
            btn3.onclick = ()=> {
                this.downloadImg(img_src)
            };

            let btn4 = document.createElement("button");
            btn4.className = "img_btn";
            let i4 = document.createElement("i");
            i4.className = "fa fa-adjust fa-lg";
            btn4.appendChild(i4);
   
            btn4.onclick = ()=> {
                this.invertImage(this.photo.url_l);
            };

            div2.appendChild(btn1);
            div2.appendChild(btn2);
            div2.appendChild(btn3);
            div2.appendChild(btn4);

            div.appendChild(div2);
            return div;
        }
        removeElement(div)
        {
            div.remove();
        }
        enlarge(img_src)
        {
            let tmp = document.getElementById("enlarged_img");
            tmp.classList.remove("hide");
            tmp.className = "expand_img";
            tmp.style.backgroundImage = `url(${img_src})`; 
        }

        downloadImg(urlImg) {
            this.toDataURL(urlImg).then((obj_url) => {
                let a = document.createElement('a');
                a.href = obj_url;
                a.download = "image.png";
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            });

        }

        toDataURL(urlImg) {
            return fetch(urlImg).then((response) => {
                return response.blob();
            }).then((blob) => {
                return URL.createObjectURL(blob);
            });
        }

        invertImage(img_src)
        {
            let tmp = document.getElementById("enlarged_img");
            tmp.classList.remove("hide");
            tmp.className = "expand_img";
            tmp.style.backgroundImage = `url(${img_src})`;
            tmp.classList.add("invert");
        }
    }