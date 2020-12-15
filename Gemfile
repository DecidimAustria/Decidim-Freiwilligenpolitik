# frozen_string_literal: true

source "https://rubygems.org"

DECIDIM_VERSION = { git: "https://github.com/decidim/decidim", branch: "release/0.23-stable" }

ruby RUBY_VERSION

gem "decidim", DECIDIM_VERSION
gem "decidim-conferences", DECIDIM_VERSION
gem "decidim-consultations", DECIDIM_VERSION
gem "decidim-elections", DECIDIM_VERSION
gem "decidim-initiatives", DECIDIM_VERSION
#gem "decidim-templates", DECIDIM_VERSION

gem "bootsnap", "~> 1.4"

gem "puma", ">= 4.3.5"
gem "uglifier", "~> 4.1"

gem "faker", "~> 2.14"

group :development, :test do
  gem "byebug", "~> 11.0", platform: :mri

  # Use latest simplecov from master until next version of simplecov is
  # released (greather than 0.18.5)
  # See https://github.com/decidim/decidim/issues/6230
  gem "simplecov", "~> 0.19.0"

  gem "decidim-dev", DECIDIM_VERSION
end

group :development do
  gem "letter_opener_web", "~> 1.3"
  gem "listen", "~> 3.1"
  gem "spring", "~> 2.0"
  gem "spring-watcher-listen", "~> 2.0"
  gem "web-console", "~> 3.5"
end
