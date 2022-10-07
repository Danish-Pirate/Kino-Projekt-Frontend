const seatID = [];
const seatColors = ['bookedColor'];
var seatClickedID;
var seatClickedName;
var rowClicked;
var ticketList = "";
var ticketPrice;
var currentTotalPrice = 0;
var radioId;
var firstP;


console.log("nannas linje");

// Laver gridden til sæderne.
function seatNumbering(){

    var seats = "";
    var row = "";
    var seatNum = 1;
    var rowNum = 1;
    const seatNumberIDs = [];
    var gridcount = 1;
    var seat_id = 0;
    var name;


    for(let i = 0; i < 260; i++){


        if (gridcount == 1){
            seats = seats + '<row class="row_class">' + "R" + rowNum + '</row>';
        }else{
            seat_id++;
            seats = seats + '<seats class="cinema_one_seat_class" id="seat_id_' + seat_id +
            '"  " onclick="getDataFromClick(this.id,'+ seatNum +','+ rowNum +');seatColorChange();handleTicket();updateTotalTicketPrice();"><img class="moviechair" src="../images/moviechair.png"></img></seats>'; /* ' + "sæde: " + seatNum+ ' */
            seatID.push("seat_id_" + seat_id);
            if(seatNum==12){
                seatNum = 1;
            }else{
                seatNum++;
            }
        }
        gridcount++;
        if(gridcount == 13){
            rowNum++;
            gridcount = 0;
        }
    }

    document.getElementById('cinema_one_grid_id').innerHTML = seats;
}

function calculateIndividualTicketPrice(id){
    ticketPrice = currentMovieShow.price;

    var firstLetter = id.charAt(0);
    console.log(firstLetter);
    
    if(firstLetter == "a"){
        this.ticketPrice = this.ticketPrice;
        console.log(this.radioId);
        document.getElementById(this.radioId).innerHTML = this.ticketPrice;
    }
    if(firstLetter == "c"){
        this.ticketPrice = this.ticketPrice * 0.5; 
        console.log(this.radioId);
        document.getElementById(this.radioId).innerHTML = this.ticketPrice;
    }
    if(firstLetter == "p"){
        this.ticketPrice= this.ticketPrice * 0.7;
        console.log(this.radioId);
        document.getElementById(this.radioId).innerHTML = this.ticketPrice;
    }
}

function setTicketPrice(){
    ticketPrice = currentMovieShow.price;
}

function handleTicket(){
   

    if($("#" + seatClickedID).css("background-color") != "rgb(230, 230, 250)"){
        ticket = '<ticket class="ticket_class" added_ticket_id="ticket' + seatClickedID +'">' + " R" + rowClicked +" S" +seatClickedName + " &nbsp&nbsp&nbsp&nbsp" +
        '<label class="radio-inline"><input type="radio" onclick="setPriceTagId(this.id);calculateIndividualTicketPrice(this.id)" name="optradio' + seatClickedID +'" id="adult' + seatClickedID +'" checked>V</label>' +
        '<label class="radio-inline"><input type="radio" onclick="setPriceTagId(this.id);calculateIndividualTicketPrice(this.id)" name="optradio' + seatClickedID +'" id="child' + seatClickedID +'">B</label><label class="radio-inline">' +
        '<input type="radio" onclick="setPriceTagId(this.id);calculateIndividualTicketPrice(this.id)" name="optradio' + seatClickedID +'" id="pensioner' + seatClickedID +'">P</label>'+ 
        '</ticket>'+ '<pricetag id="pricetag_id"> Pris: '+ (ticketPrice)+ " dkk"+'</pricetag><br>';

        this.ticketList = this.ticketList + ticket;

    }

    if($("#" + seatClickedID).css("background-color") != "rgb(255, 0, 0)"){

        removeTicket = '<ticket class="ticket_class" added_ticket_id="ticket' + seatClickedID +'">' + " R" + rowClicked +" S" +seatClickedName + " &nbsp&nbsp&nbsp&nbsp" +
        '<label class="radio-inline"><input type="radio" onclick="setPriceTagId(this.id);calculateIndividualTicketPrice(this.id)" name="optradio' + seatClickedID +'" id="adult' + seatClickedID +'" checked>V</label>' +
        '<label class="radio-inline"><input type="radio" onclick="setPriceTagId(this.id);calculateIndividualTicketPrice(this.id)" name="optradio' + seatClickedID +'" id="child' + seatClickedID +'">B</label><label class="radio-inline">' +
        '<input type="radio" onclick="setPriceTagId(this.id);calculateIndividualTicketPrice(this.id)" name="optradio' + seatClickedID +'" id="pensioner' + seatClickedID +'">P</label>'+ 
        '</ticket>'+ '<pricetag id="pricetag_id"> Pris: '+ (ticketPrice)+ " dkk"+'</pricetag><br>';


        this.ticketList = this.ticketList.replace(removeTicket, "");
        
        

    }

    document.getElementById('ticket_id').innerHTML = this.ticketList;

}

function setPriceTagId(id){

    this.radioId = id.split("/").pop();

    this.radioId = "/" + radioId;
    
    if(firstP == null){
    firstP = document.getElementById("pricetag_id");
    firstP.setAttribute("id", this.radioId)
    }
    
    if(firstP != null){        
    firstP.setAttribute("id", this.radioId);
    }
    this.radioId = radioId;
}
 


function seatColorChange(){

    if($("#" + seatClickedID).css("background-color") != "rgb(255, 0, 0)"){

        $("#" + seatClickedID).css("background-color", "red");

    }
    else {
        $("#" + seatClickedID).css("background-color", "lavender");

    }

}

function getSeatIDFromClick(clicked_id){

    seatClickedID = clicked_id;
}

function getSeatnameFromClick(clicked_name){

    seatClickedName = clicked_name;
}

function getSeatRowFromClick(clicked_row){

    rowClicked = clicked_row;
}

function getDataFromClick(clicked_id, clicked_name, clicked_row){

    seatClickedID = clicked_id;

    seatClickedName = clicked_name;

    rowClicked = clicked_row;
}

function updateTotalTicketPrice(){

    
    if($("#" + seatClickedID).css("background-color") != "rgb(230, 230, 250)"){
        
        this.currentTotalPrice = this.currentTotalPrice + currentMovieShow.price;
    
        
}
    
if($("#" + seatClickedID).css("background-color") != "rgb(255, 0, 0)"){

    this.currentTotalPrice = this.currentTotalPrice - currentMovieShow.price;

}
    $("#total_ticket_price").text(this.currentTotalPrice + " dkk");

    document.getElementById("total_price_input_id").value = currentTotalPrice;

    console.log(document.getElementById("total_price_input_id").value);
    


}

function redirect(){

    window.location.href = "https://witty-hill-0dbba6903.2.azurestaticapps.net/index";
}