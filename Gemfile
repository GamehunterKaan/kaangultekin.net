source "https://rubygems.org"

# This site has no theme gem — layouts, includes, and styles live in this repo.
gem "jekyll", "~> 4.4"

group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.17"
  gem "jekyll-sitemap", "~> 1.4"
end

# Windows does not ship with zoneinfo; Jekyll needs it for date handling.
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

# Faster file watching on Windows.
gem "wdm", "~> 0.2", platforms: [:mingw, :x64_mingw, :mswin]
