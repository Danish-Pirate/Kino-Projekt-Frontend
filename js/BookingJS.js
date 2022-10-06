const seatID = [];
const seatColors = ['bookedColor'];
var seatClickedID;
var seatClickedName;
var rowClicked;
var ticketList = "";
var currentTotalPrice = 0;

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

function handleTicket(){

    if($("#" + seatClickedID).css("background-color") != "rgb(230, 230, 250)"){
        ticket = '<ticket added_ticket_id="ticket' + seatClickedID +'">' + " r: " + rowClicked +" s: " +seatClickedName +
        '<input class="customer_type" list="customer_type' + seatClickedID + '" name="customer_type' + seatClickedID + '"><datalist id="customer_type' + seatClickedID +
        '"><option value="Voksen"><option value="Barn"><option value="Pensionist"></ticket>'+" Pris: "+ (currentMovieShow.price)+ " dkk"+'<br>';


        this.ticketList = this.ticketList + ticket;

    }

    if($("#" + seatClickedID).css("background-color") != "rgb(255, 0, 0)"){

        removeTicket = '<ticket added_ticket_id="ticket' + seatClickedID +'">' + " r: " + rowClicked +" s: " +seatClickedName +
        '<input class="customer_type" list="customer_type' + seatClickedID + '" name="customer_type' + seatClickedID + '"><datalist id="customer_type' + seatClickedID +
        '"><option value="Voksen"><option value="Barn"><option value="Pensionist"></ticket>'+" Pris: "+ (currentMovieShow.price)+ " dkk"+'<br>';

        this.ticketList = this.ticketList.replace(removeTicket, "");
        
        

    }

    document.getElementById('ticket_id').innerHTML = this.ticketList;

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

