class CreateTransactions < ActiveRecord::Migration[5.2]
  def change
    create_table :transactions do |t|
      t.string :ticker
      t.decimal :brought_price
      t.integer :shares
      t.timestamps
    end
  end
end
