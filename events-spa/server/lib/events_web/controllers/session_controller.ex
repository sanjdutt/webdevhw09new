defmodule EventsWeb.SessionController do
  use EventsWeb, :controller

  def create(conn, %{"email" => email, "password" => password}) do

    email = String.downcase(email)
    user = Events.Users.authenticate(email, password)

    if user do

      sess = %{
        user_id: user.id,
        name: user.name,
        email: user.email,
        token: Phoenix.Token.sign(conn, "user_id", user.id)
      }

      conn
      |> put_resp_header("content-type", "application/json; charset=UTF-8")
      |> send_resp(:created, Jason.encode!(%{session: sess}))


    else
      conn
      |> put_resp_header("content-type", "application/json; charset=UTF-8")
      |> send_resp(:unauthorized, Jason.encode!(%{error: "Login failed"}))
    end
  end

  def delete(conn, _params) do
    conn
    |> delete_session(:user_id)
    |> put_flash(:info, "Logged out.")
    |> redirect(to: Routes.page_path(conn, :index))
  end
end
