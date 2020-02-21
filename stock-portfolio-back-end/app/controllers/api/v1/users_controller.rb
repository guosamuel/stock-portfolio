class Api::V1::UsersController < ApplicationController

  def create
    new_user = User.new(name: params[:name], email: params[:email], password: params[:password], balance: 5000.00)
    if new_user.save
      render json: {error: false}
    else
      render json: {error: true}
    end
  end

end
