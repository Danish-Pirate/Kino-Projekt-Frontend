//global variables
let searchDate;
//const filmCardsHallOne = document.getElementById('film-schedule-cards-hall1');


$(document).ready( function() {
    //odays date in date format
    let now = new Date();

    //Making the date a string and making it in the format: YYYY-MM-DD
    let day = ("0" + now.getDate()).slice(-2);
    let month = ("0" + (now.getMonth() + 1)).slice(-2);
    let today = now.getFullYear()+"-"+(month)+"-"+(day) ;

    //Sends the new string date to html form
    $('#datePicker').val(today);
    searchDate = today;

    //Updates UI when clicking on the search button
    $('#selectNewDate').click( () =>{
        searchDate = document.getElementById("datePicker").value;
        console.log(searchDate);

        //Removes the old film cards
        $('#film-schedule-cards-hall1').html('');
        $('#film-schedule-cards-hall2').html('');

        //Updates UI with new film cards
        filmsScheduleRenderer.updateUI();
    });


});


class FilmsScheduleRenderer {

    endpointUrlFilmsSchedule = "https://hiazure.azurewebsites.net/getAllMovie";



    constructor() {
        this.dataScheduleFilm = null;
        this.fetchDataFromFilms();
    }

    //Fetch data from Film
    async fetchDataFromFilms() {
        let responseFilms = await fetch(this.endpointUrlFilms, { method: 'GET', headers: { token: "5566"}});
        this.dataScheduleFilm = await responseFilms.json();
        this.updateUI();
    }

    updateUI() {

        //sets standard date to todays date
        let filmsScheduleDate = searchDate;


        //Loops over all Film entries
        for (let dataScheduleFilmIndex in this.dataScheduleFilm) {

            //Checker to see if a hall have any film entries
            let filmEntriesChecker = false;

            //Resets card to append
            let cardsHall1 = "";


            let entryFilmSchedule = this.dataScheduleFilm[dataScheduleFilmIndex];

            //sets target for JS
            var targetOne = $("#film-schedule-cards-hall1");
            var targetTwo = $("#film-schedule-cards-hall2");


            //Boolean for checking if film is already on the list
            let isAlreadyOnTheList = 0;


            for (let i = 0; i < entryFilmSchedule.showList.length; i++) {

                //confirms that the film has a show that is in hall 1 with the selected date
                if(
                    entryFilmSchedule.showList[i].cinemaHall.name == "Sal 1"
                    &&
                    entryFilmSchedule.showList[i].date == filmsScheduleDate
                    &&
                    isAlreadyOnTheList == 0
                ){



                    //Checker to see if a hall have any film entries
                    filmEntriesChecker = true;

                    //Sets checker to 1 to indicate that the film is already on the list
                    isAlreadyOnTheList += 1;

                    //Building the start of the film cards
                    cardsHall1 +=
                        `<div class="row bg-light border border-solid p-5 m-2">
                    <div class="col-6">
                        <h4>${entryFilmSchedule.name}</h4>
                        <img src="${entryFilmSchedule.posterLink}" alt="Scooby-doo"  class="film-poster-img">
                    </div>
                    <div class="col-6">

                        <div>
                            <h4>Pris: </h4>
                            <p>${entryFilmSchedule.moviePrice} kr.</p>         
                            <h4>Aldersgrænse: </h4>
                            <p>${entryFilmSchedule.movieAgeRestriction} år</p>
                            <div class="py-5">`;
                }

                if(entryFilmSchedule.showList[i].cinemaHall.name == "Sal 1" && entryFilmSchedule.showList[i].date == filmsScheduleDate){


                    cardsHall1 +=
                        `<button class="mb-2 mx-1"><a href="/html/BookingUI.html?price=${entryFilmSchedule.moviePrice}&movieName=${entryFilmSchedule.name}&date=${filmsScheduleDate}&startTime=${entryFilmSchedule.showList[i].time}&ageRestriction=${entryFilmSchedule.movieAgeRestriction}" >${entryFilmSchedule.showList[i].time}</a></button>`;
                }

            }
            //Closes the tags IF there have been added film cards
            if(filmEntriesChecker == true){
                //closing tags
                cardsHall1 += `
            </div>
            </div>               
            </div>
            </div>`;

                //Adds cards to html
                targetOne.append(cardsHall1);
            }

            //Checker to see if a hall have any film entries
            filmEntriesChecker = false;

            let cardsHall2 = "";

            for (let i = 0; i < entryFilmSchedule.showList.length; i++) {



                //confirms that the film has a show that is in hall 1 with the selected date
                if(
                    entryFilmSchedule.showList[i].cinemaHall.name == "Sal 2"
                    &&
                    entryFilmSchedule.showList[i].date == filmsScheduleDate
                    &&
                    isAlreadyOnTheList == 0
                ){



                    //Checker to see if a hall have any film entries
                    filmEntriesChecker = true;

                    //Sets checker to 1 to indicate that the film is already on the list
                    isAlreadyOnTheList += 1;

                    //Building the start of the film cards
                    cardsHall2 +=
                        `<div class="row bg-light border border-solid p-5 m-2">
                  <div class="col-6">
                      <h4>${entryFilmSchedule.name}</h4>
                       <img src="${entryFilmSchedule.posterLink}" alt="Scooby-doo"  class="film-poster-img">
                  </div>
                  <div class="col-6">

                      <div>
                          <h4>Pris: </h4>
                          <p>${entryFilmSchedule.moviePrice} kr.</p>         
                          <h4>Aldersgrænse: </h4>
                          <p>${entryFilmSchedule.movieAgeRestriction} år</p>
                          <div class="py-5">`;
                }

                if(entryFilmSchedule.showList[i].cinemaHall.name == "Sal 2" && entryFilmSchedule.showList[i].date == filmsScheduleDate){

                    cardsHall2 +=
                        `<button class="mb-2 mx-1">${entryFilmSchedule.showList[i].time}</button>`;
                }

            }
            if(filmEntriesChecker == true){
                //closing tags
                cardsHall2 += `
          </div>
          </div>               
          </div>
          </div>`;
                //Adds cards to html
                targetTwo.append(cardsHall2);
            }


        }
    }
}

var filmsScheduleRenderer = new FilmsScheduleRenderer();
