# frozen_string_literal: true

source "https://rubygems.org"

ruby RUBY_VERSION

gem "decidim", "0.23.1"
gem "decidim-consultations", "0.23.1"
gem "decidim-initiatives", "0.23.1"
gem "decidim-templates", "0.23.1"
gem "decidim-calendar"
gem "decidim-conferences"

gem "bootsnap", "~> 1.3"

gem "puma", ">= 4.3.5"
gem "uglifier", "~> 4.1"

gem "faker", "~> 1.9"

gem "wicked_pdf", "~> 1.4"

gem "sidekiq"

group :development, :test do
  gem "byebug", "~> 11.0", platform: :mri

  gem "decidim-dev", "0.23.1"
end

group :development do
  gem "letter_opener_web", "~> 1.3"
  gem "listen", "~> 3.1"
  gem "spring", "~> 2.0"
  gem "spring-watcher-listen", "~> 2.0"
  gem "web-console", "~> 3.5"
  gem "rubocop"
end

group :production do
  gem "sentry-raven"
  gem "rails_12factor"
end

group :test do
  gem "rspec-rails"
  gem "database_cleaner"
end
