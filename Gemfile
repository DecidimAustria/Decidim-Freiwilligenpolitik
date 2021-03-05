# frozen_string_literal: true

source "https://rubygems.org"

ruby RUBY_VERSION

gem "decidim", git: "https://github.com/decidim/decidim.git", branch: "release/0.23-stable"
# gem "decidim-templates", git: "https://github.com/decidim/decidim.git", branch: "release/0.23-stable"
# gem "decidim-initiatives", git: "https://github.com/decidim/decidim.git", branch: "release/0.23-stable"
# gem "decidim-consultations", git: "https://github.com/decidim/decidim.git", branch: "release/0.23-stable"
# gem "decidim-conferences", git: "https://github.com/decidim/decidim.git", branch: "release/0.23-stable"
#
# gem "decidim-calendar", git: "https://github.com/alabs/decidim-module-calendar.git", branch: "master"
gem "decidim-decidim_awesome", "~> 0.6.3"

gem "bootsnap", "~> 1.3"

gem "puma", ">= 4.3.5"
gem "uglifier", "~> 4.1"

gem "faker", "~> 1.9"

gem "wicked_pdf", "~> 1.4"

gem "sidekiq"

gem "sentry-raven"

group :development, :test do
  gem "byebug", "~> 11.0", platform: :mri

  gem "decidim-dev"
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
  gem "rails_12factor"
end

group :test do
  gem "rspec-rails"
  gem "database_cleaner"
end
