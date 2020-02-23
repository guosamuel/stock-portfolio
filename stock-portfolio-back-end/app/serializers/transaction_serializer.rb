class TransactionSerializer < ActiveModel::Serializer
  attributes :ticker, :bought_price, :shares, :user_id
end
