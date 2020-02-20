class Transaction < ApplicationRecord
  belongs_to :user

  validates :ticker, presence: true
  validates :bought_price, presence: true, numericality: { greater_than_or_equal_to: 0 }
  validates :shares, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
  validates :user_id, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 1 }
end
