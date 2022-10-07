const urlParams = new URLSearchParams(window.location.search);

const paramPrice = urlParams.get('price');
const paramMovieName = urlParams.get('movieName');
const paramDate = urlParams.get('date');
const paramAgeRestriction = urlParams.get('ageRestriction');
const paramStartTime = urlParams.get('startTime');

console.log(paramDate);

var currentMovieShow = {
    price : parseInt(paramPrice),
    cinemaName : 'Bio1',
    movieName : paramMovieName,
    date : paramDate,
    startTime : paramStartTime,
    ageRestriction : paramAgeRestriction
  };
  
  var calculatedPrice = {
      adult: currentMovieShow.price * 1,
      child: currentMovieShow.price * 0.5,
      pensioner: currentMovieShow.price * 0.7
  };
  
  function addData(){
  
      class movieShow{
  
          endPointUrl = "localhost:8080/";
  
          constructor(data){
              this.data = data;
          }
  
          async fetchData() {
  
              let response = await fetch(this.endPointUrl);
  
              if(response.status == 200){
                  this.data = await response.json();
  
              }
              
          }
  
      }
      document.getElementById('movie_name_head').textContent = "" + currentMovieShow.movieName;
  
      document.getElementById('cinema_name_infobox_id').textContent = "Sal : " + currentMovieShow.cinemaName;
  
      document.getElementById('movie_name_infobox_id').textContent = "Film : " + currentMovieShow.movieName;
  
      document.getElementById('date_infobox_id').textContent = "Dato : " +  currentMovieShow.date;
  
      document.getElementById('start_time_infobox_id').textContent = "Start kl : " + currentMovieShow.startTime;
  
      document.getElementById('age_infobox_id').textContent = "Min. alder : " + currentMovieShow.ageRestriction + " år.";
  
      document.getElementById('price_infobox_id').textContent = "Pris : "+ currentMovieShow.price + " dkk";
  
      document.getElementById('movie_name_input').textContent = currentMovieShow.movieName;
      document.getElementById('time_slot_input').textContent = currentMovieShow.startTime; 
      document.getElementById('date_input').textContent = currentMovieShow.date;
      document.getElementById('cinema_name_input').textContent = currentMovieShow.cinemaName;
  
      document.getElementById('movie_name_input').value = currentMovieShow.movieName;
      document.getElementById('time_slot_input').value = currentMovieShow.startTime; 
      document.getElementById('date_input').value = currentMovieShow.date;
      document.getElementById('cinema_name_input').value = currentMovieShow.cinemaName;
  
      }
  