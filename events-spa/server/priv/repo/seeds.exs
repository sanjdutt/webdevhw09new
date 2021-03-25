# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Events.Repo.insert!(%Events.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.


alias Events.Repo
alias Events.Users.User
alias Events.Posts.Post

defmodule Inject do
	def hash(password) do 
		Argon2.hash_pwd_salt(password)
	end
end

alice = Repo.insert!(%User{
	name: "Alice", 
	email: "alice@email.com", 
	password_hash: Inject.hash("12345")}
)
bob = Repo.insert!(%User{
	name: "Bob", 
	email: "bob@email.com",
	password_hash: Inject.hash("abcde")}
)

Repo.insert!(%Event{
	user_id: alice.id, 
	name: "Alice's Birthday Bash", 
	date: "2023 Aug 17, 6:00 PM", 
	description: "There will be pizza!"}
)
Repo.insert!(%Event{
	user_id: bob.id, 
	name: "Bob's Graduation Party", 
	date: "2021 June 12, 1:00 PM", 
	description: "Come celebrate!"}
)
