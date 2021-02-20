
const endpoint = "http://localhost:3000/api/v1/reviews"

document.addEventListener("DOMContentLoaded", function() {
    getReviews()

    const form  = document.querySelector('#form-container')
    form.addEventListener("submit", (e) => formHandler(e))

  });

//Dom content loaded explainer  

function getReviews() {
  fetch(endpoint)
    .then(response => response.json())
    .then(r => r.forEach(review => {
      // debugger
      let newReview = new Review(review)
      document.querySelector('#r-container').innerHTML += newReview.renderReview()
        // const p = `
        // <div data-id=${review.id}>
        // <p>Reviewer: <b>${review.reviewer}</b></p>
        // <p>Movie: ${review.movie.title}</p>
        // <h3>${review.header}</h3>
        // <h4>${review.body}</h4>
        // </div>
        // <br><br>
        // `;
        // document.querySelector('#r-container').innerHTML += p;
    }))
    .catch(err => console.log(err))
}

//fetch review data from our endpoint, change data to json
//using forEach to create new instance of Review class for every review in the array from DB (put'em through our constructor!)
//to update the dom, we target where we want it to show up (querySelector), run the renderReview() located in Review class

function formHandler(e){
    e.preventDefault()
    const reviewer = document.querySelector('#name').value
    const header = document.querySelector('#header').value
    const body = document.querySelector('#body').value
    const movie_id = parseInt(document.querySelector('#movie').value)
    postFetch(reviewer, header, body, movie_id)
    //debugger
    //console.log(e)
}

//Used debugger and browser console to find and select the form values entered
//We parseInt to go from string to integer, which is what a movie_id is

function postFetch(reviewer, header, body, movie_id){
  const bodyData =  {reviewer, header, body, movie_id}
  fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'},
    body: JSON.stringify(bodyData)
  })
    .then(resp => resp.json())
    .then(review => {console.log(review)
      // debugger
      let newReview = new Review(review)
      document.querySelector('#r-container').innerHTML += newReview.renderReview()
    
    
    })
    
}

//console.log("test")
//To test script tag is connecting the file to index.html