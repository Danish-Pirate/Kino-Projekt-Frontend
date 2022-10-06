var currentMovieShow = {
    price : 100,
    cinemaName : 'Bio1',
    movieName : 'Dødets Gab 7',
    date : '22/10/20220',
    startTime : '14:15',
    ageRestriction : 13
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
  