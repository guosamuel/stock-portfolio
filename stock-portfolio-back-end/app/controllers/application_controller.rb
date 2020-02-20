class ApplicationController < ActionController::API

  def encode_token(user_id)
    JWT.encode({user_id: user_id}, ENV['SECRET_TOKEN'])
  end

  def token
    request.headers['Authorization']
  end

  def decoded_token
    begin
      JWT.decode(token, ENV['SECRET_TOKEN'])
    rescue JTWT::DecodeError
      nil
    end
  end

  def current_user
    begin
      user_id = decoded_token[0]["user_id"]
      User.find(user_id)
    rescue
      nil
    end
  end

  def logged_in
    !!current_user
  end

end
