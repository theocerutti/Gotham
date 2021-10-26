FROM elixir:latest

WORKDIR /app

# Install deps
COPY mix.exs mix.lock ./
RUN mix local.hex --force
RUN mix deps.get
RUN mix local.rebar --force
RUN mix do compile

# Add config for next steps
COPY config config

# Assets
COPY assets assets
RUN mix assets.deploy

# Setup DB
COPY priv priv
COPY lib lib
RUN mix ecto.create
RUN mix ecto.migrate

CMD ["mix", "phx.server"]