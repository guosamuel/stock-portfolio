class UserSerializer < ActiveModel::Serializer
  attributes :name, :email, :balance

  has_many :transactions
end
