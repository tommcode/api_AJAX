const map = L.map('mapid').setView([51.919437, 19.145136], 5);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1Ijoia2FydG9mZWxlazAwNyIsImEiOiJjanRpazhyM2owbHUwNDluem40Ynljdm5hIn0.kYoJkNni5ksRyA0gy1yV7A'
}).addTo(map);


$(function(){

    let $select = $("#countrySelect")
    let url = "https://restcountries.eu/rest/v2/all?fields=iso2Code;name"
    let urlName =  "https://restcountries.eu/rest/v2/name/"
    let $countryinf = $(".country-sidebar")

    function loadSelect (){

    
    $.ajax({
        dataType : "json",
        url : url,
        method : "get",
    }).done(function(res){
        console.log(res)
        for (let el of res) {
            let $newSel = (`
            
            
                <option value="${el.name}">${el.name}</option>
        
            
            `)
            $select.append($newSel)
        }
    })
}
loadSelect();

$select.on("change", function(){

    $.ajax({
        dataType : "json",
        url :  `https://restcountries.eu/rest/v2/name/${$select.val()}`,

    }).done(function(resp){
        console.log(resp)
 
            let detail = `
            
            <div class="country-sidebar">
                <div class="country-flag" >
                    <img  id="countryFlag" src="${resp[0].flag}">
                </div>
            <div class="country-data" id="countryData">
                <h3 class="country-name">
                   ${resp[0].name}
                </h3>
                <div>
                    Stolica: <strong>${resp[0].capital}</strong>
                </div>
                <div>
                    Region: <strong>${resp[0].region}</strong>
                </div>
                <div>
                    Podregion: <strong>${resp[0].subregion}</strong>
                </div>
                <div>
                    Liczba ludności: <strong>${resp[0].population}</strong>
                </div>
                <div>
                    Strefa czasowa: <strong>${resp[0].timezones}</strong>
                </div>
                </div>
            </div>
            `;
        
        $countryinf.html(detail) 
        
    })

})

})