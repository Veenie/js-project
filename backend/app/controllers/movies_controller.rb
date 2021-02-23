class Api::V1::MoviesController < ApplicationController
  
    def index
      movies = Movie.all 
      render json: MovieSerializer.new(movies)
    end    

end
