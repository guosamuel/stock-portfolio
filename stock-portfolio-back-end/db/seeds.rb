# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create(name: "Sam", password: "123", email: "test@gmail.com", balance: 5000.00)

Transaction.find_or_create_by(ticker: "FB", bought_price: 150.50, shares: 10, user_id: 1)
Transaction.find_or_create_by(ticker: "AAPL", bought_price: 200.00, shares: 20, user_id: 1)
Transaction.find_or_create_by(ticker: "GOOGL", bought_price: 300.00, shares: 30, user_id: 1)
Transaction.find_or_create_by(ticker: "AMZN", bought_price: 400.00, shares: 40, user_id: 1)
Transaction.find_or_create_by(ticker: "TCEHY", bought_price: 500.00, shares: 50, user_id: 1)
Transaction.find_or_create_by(ticker: "TSLA", bought_price: 600.00, shares: 60, user_id: 1)
