# https://docs.docker.com/compose/rails/
FROM ruby:2.3.3
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs
RUN mkdir /bilety
WORKDIR /bilety
ADD Gemfile /bilety/Gemfile
ADD Gemfile.lock /bilety/Gemfile.lock
RUN bundle install
ADD . /bilety
RUN rails db:create
RUN rails server
