class Api::V1::AuthController < ApplicationController

  def create
    @user = User.find_by(email: params[:email])
    if @user && @user.authenticate(params[:password])
      user_id = @user.id
      token = encode_token(user_id)
      render json: {user: UserSerializer.new(@user), token: token}
    else
      render json: {error: true}
    end
  end

  def show
    if logged_in
      render json: {user: UserSerializer.new(current_user)}
    else
      render json: {error: "Please log in"}
    end

  end
end
