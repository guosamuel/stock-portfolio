class Api::V1::TransactionsController < ApplicationController

  def create
    #{"email"=>"test@gmail.com", "bought_price"=>293.3, "ticker"=>"aapl", "shares"=>1,
    user = User.find_by(email: params[:email])
    uppercase_ticker = params[:ticker].upcase
    new_transaction = Transaction.new(ticker: uppercase_ticker, bought_price: params[:bought_price], shares: params[:shares], user_id: user.id)

    new_balance = user.balance - params[:cost]
    User.update(user.id, email: user.email, password_digest: user.password_digest, balance: new_balance)

    if new_transaction.save
      render json: {error: false}
    else
      render json: {error: true}
    end
  end

  def index
    user = User.find_by(email: request.headers[:email])
    transactions = user.transactions
    render json: {transactions: transactions}
  end
end
