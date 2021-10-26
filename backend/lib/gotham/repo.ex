defmodule Gotham.Repo do
  use Ecto.Repo,
    otp_app: :gotham,
    adapter: Ecto.Adapters.Postgres
end
