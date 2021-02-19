class Api::V1::ReviewsController < ApplicationController

    def index
        reviews = Review.all 
        render json: reviews, include: [:movie]
    end
    
    #all reviews rendered in json format for fetching, don't need instance variables (no erb display)

    def create
        review = Review.new(review_params)
        if review.save
            render json: review
        else
            render json: {errors: review.errors.full_messages}
        end
    end        

    #create new review and render based on what's entered on frontend or display error if attribute is missing based on strong params


    private

    def review_params
        params.require(:review).permit(:reviewer, :header, :body, :movie_id)
    end

    #review is top level hash required, requiring these attributes to be present




end