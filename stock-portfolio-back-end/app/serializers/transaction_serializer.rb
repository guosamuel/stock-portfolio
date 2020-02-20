class TransactionSerializer < ActiveModel::Serializer
  attributes :id, :ticker, :bought_price, :shares, :user_id
end
