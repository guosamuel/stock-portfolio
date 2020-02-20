class RenameBroughtPriceToBoughtPrice < ActiveRecord::Migration[5.2]
  def change
    rename_column :transactions, :brought_price, :bought_price
  end
end
