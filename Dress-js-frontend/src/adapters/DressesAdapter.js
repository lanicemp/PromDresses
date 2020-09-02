class DressesAdapter {
    constructor(){
        console.log('Im in the DressesAdapter ')
        this.baseUrl = "http://localhost:3000/api/v1/dresses"
    }
    getDresses(){
        console.log('Im in get get dresses ')
        return fetch(this.baseUrl).then((res) => res.json());
    }
    createDress(name, silhouette, neckline, img_url, price, length){
      // debugger
        const dress = {
          name: name,
          silhouette: silhouette,
          neckline: neckline,
          img_url: img_url,
          price: price, 
          length: length
          
        }
       
        return fetch(this.baseUrl,{
          
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(dress),
          
        }).then(res=>res.json())
      }
}