class TransactionSerializer < ActiveModel::Serializer
  attributes :ticker, :bought_price, :shares
end
