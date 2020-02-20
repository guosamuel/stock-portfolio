# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create(name: "Sam", password: "123", email: "test@gmail.com", balance: 5000.00)

Transaction.create(ticker: "FB", bought_price: 150.50, shares: 10, user_id: 1)
