//Sends data from form to endpoint /// Endpoint = /bookings (POST)

$(document).ready(function () {
    $("#modal-candy").submit(function (event) {
        let formData = {
            candyName: $("#candyName").val(),
            candySize: $("#candySize").val(),
            candyAmount: $("#candyAmount").val(),
            candyPrice: $("#candyPrice").val(),
            productLink: $("#productLink").val(),

        };

        $.ajax({
            type: "POST",
            url: "/addCandy",
            data: JSON.stringify(formData),
            dataType: "json",
            encode: true,
            headers:{"Content-Type":"application/json;charset=UTF-8"}
        }).done(function (data) {
            console.log(data);
        });
        event.preventDefault();
    });

});

async function deleteCandy(candyId) {
    await fetch('/deleteCandy/' + candyId, {
        method: 'DELETE'
    })
    refreshPage();
}

async function updateCandy(id){

    let formDataEdit = {
        candyName: $("#editcandy-name"+id).val(),
        candySize: $("#editcandy-size"+id).val(),
        candyAmount: $("#editcandy-amount"+id).val(),
        candyPrice: $("#editcandy-price"+id).val(),
        productLink: $("#editcandy-productLink"+id).val(),
        candyId: $("#editcandy-candyId"+id).val(),
    };

    $.ajax({
        type: "PUT",
        url: "/editCandy/"+formDataEdit.candyId,
        data: JSON.stringify(formDataEdit),
        dataType: "json",
        encode: true,
        headers:{"Content-Type":"application/json;charset=UTF-8"}
    }).done(function (data) {
        console.log(data);
    });
    event.preventDefault();

    refreshPage();
}

function refreshPage(){

    setTimeout(()=> window.location.reload(), 500)
}



//Pop up

function gallModal(element) {
    document.getElementById("modal-candy").src = element.src;
}

class CandyRenderer {

    endpointUrlCandy = "/getAllCandy";

    constructor() {
        this.dataCandy = null;
        this.fetchDataFromCandy();
    }

    //Fetch data from Candy
    async fetchDataFromCandy() {
        let responseCandy = await fetch(this.endpointUrlCandy);
        this.dataCandy = await responseCandy.json();
        this.updateUI();
    }

    updateUI() {
        //Loops over all Candy entries
        for (let dataCandyIndex in this.dataCandy) {

            var entryCandy = this.dataCandy[dataCandyIndex];

            //sets target for JS
            let target = $("#candy-cards");

                //First part of candy-Card
            var cards = `<div class="container my-3">
                      <div class="row border border-solid bg-light">
                          <div class="col-3 p-0">
                              <img src="${entryCandy.productLink}" alt="Candy poster" class="film-poster-img">
                          </div>
                          <div class="col-9 p-5">
                              <div class="row d-flex justify-content-space">
                                  <div class="col-4">
                                      <h4>Navn: </h4>
                                      <p>${entryCandy.candyName}</p>
                                  </div>
                                  <div class="col-4">
                                      <h4>Pris: </h4>
                                      <p>${entryCandy.candyPrice} kr.</p>
                                  </div>
                                  <div class="col-4">      
                                  <h4>Mængde: </h4>
                                  <p>${entryCandy.candyAmount}</p>
                                  </div>
                              </div>
                              <div class="row d-flex justify-content-space">
                                <div class="col-4">
                                    <h4>Størrelse: </h4>
                                    <p>${entryCandy.candySize}</p>
                                    </div>
                                    
                                    
                                    <div class="col-4">
                                     <div  data-bs-toggle="modal" data-bs-target="#modal${entryCandy.candyId}">
                                         <button class="btn btn-primary">Opdater</button>
                                        
                                    </div>
                                     <div >
                                <button id="candy-delete-btn" class="btn btn-primary" onclick="deleteCandy( ${entryCandy.candyId} )">Slet</button>
                            </div>
                            </div>
                                </div>
                            </div>
                            
                          
                                <!--JS for opstater vinduet-->
                            <div class="modal bg-dark bg-opacity-75 fade" tabindex="-1" role="dialog" id="modal${entryCandy.candyId}">
                                <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                                    <div class="modal-content">
                                        <div class="modal-body">
                        
                                            <form id="modal-candy-edit" method="PUT">
                        
                                                <div id="editcandy-name-group" class="form-group">
                                                    <label for="editcandy-name${entryCandy.candyId}">candyName</label>
                                                    <input
                                                            type="text"
                                                            class="form-control"
                                                            id="editcandy-name${entryCandy.candyId}"
                                                            name="editcandy-name"
                                                            value="${entryCandy.candyName}"
                                                    />
                                                </div>
                        
                                                <div id="editcandy-price-group" class="form-group">
                                                    <label for="editcandy-price${entryCandy.candyId}">Price</label>
                                                    <input
                                                            type="number"
                                                            class="form-control"
                                                            id="editcandy-price${entryCandy.candyId}"
                                                            name="editcandy-price"
                                                              value="${entryCandy.candyPrice}"
                                                    />
                                                </div>
                        
                                                <div id="editcandy-size-group" class="form-group">
                                                    <label for="editcandy-size${entryCandy.candyId}">candySize</label>
                                                    <input
                                                            type="text"
                                                            class="form-control"
                                                            id="editcandy-size${entryCandy.candyId}"
                                                            name="editcandy-size"
                                                             value="${entryCandy.candySize}"
                                                    />
                                                </div>
                        
                                                <div id="editcandy-amount-group" class="form-group">
                                                    <label for="editcandy-amount${entryCandy.candyId}">candyAmount</label>
                                                    <input
                                                            type="text"
                                                            class="form-control"
                                                            id="editcandy-amount${entryCandy.candyId}"
                                                            name="editCandy-amount"
                                                            value="${entryCandy.candyAmount}"
                                                    />
                                                </div>
                        
                                                <div id="editcandy-productLink-group" class="form-group">
                                                    <label for="editcandy-productLink${entryCandy.candyId}">Link til slik billede</label>
                                                    <input
                                                            type="text"
                                                            class="form-control"
                                                            id="editcandy-productLink${entryCandy.candyId}"
                                                            name="editcandy-productLink"
                                                              value="${entryCandy.productLink}"
                                                    />
                                                </div>
                                                <input
                                                            type="number"
                                                            id="editcandy-candyId${entryCandy.candyId}"
                                                            name="editcandy-candyId"
                                                            value="${entryCandy.candyId}"
                                                            hidden
                                                    />
                                                <button class="btn btn-success mt-2" data-bs-dismiss="modal" onclick="updateCandy(${entryCandy.candyId})">Opdater</button>
                                            </form>
                                        </div>
                                        <div class="modal-footer justify-content-center">
                                            <button type="button" class="btn btn-secondary modal-btn" data-bs-dismiss="modal" onclick="refreshPage()">Luk</button>
                                        </div>
                                    </div>
                               </div>         
                            </div>
                           
                          </div>
                      </div>
                      </div>`;



            //Closing HTML
            cards += `</table></div></div></div>`;
            //Adds candy-cards to HTML
            target.append(cards);
        }
    }
}

var candyRenderer = new CandyRenderer();
