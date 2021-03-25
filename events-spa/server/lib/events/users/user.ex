defmodule Events.Users.User do
  use Ecto.Schema
  import Ecto.Changeset

  schema "users" do
    field :name, :string
    field :email, :string
    field :password_hash, :string
    field :photo_hash, :string

    has_many :events, Events.Posts.Post
    has_many :comments, Events.Comments.Comment

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    attrs = Map.put(attrs, "password_hash", Argon2.hash_pwd_salt(attrs["password"]))
    user
    |> cast(attrs, [:name, :email, :password_hash, :photo_hash])
    |> validate_required([:name, :email, :password_hash])
  end
end
