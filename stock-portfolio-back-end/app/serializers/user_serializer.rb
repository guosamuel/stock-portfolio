class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :balance

  has_many :transactions
end
