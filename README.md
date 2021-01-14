# decidimaustria

Free Open-Source participatory democracy, citizen participation and open government for cities and organizations

This is the open-source repository for decidim austria, based on [Decidim](https://github.com/decidim/decidim).

## Running dev environment using Vagrant

**Prerequisites**

Install Vagrant (https://www.vagrantup.com/downloads)

**Run dev environment**

**Docker**

Attention:

In v0.23.1 db:seed will fail because of a bug:
  https://github.com/decidim/decidim/issues/7057

```bash
docker-compose build
docker-compose run --rm app bundle exec rake db:create db:schema:load db:seed
docker-compose up
```

**Vagrant**

```bash
vagrant up
vagrant ssh
cd /vagrant/decidimaustria/
rails s -b 0.0.0.0
```
4. Open URL in Browser: http://localhost:4567

## Deploying to dokku

**E-Mail Settings**

For E-Mails to work it seems we have to configure smtp settings in the environment and also in the admin interface for the organizations.

dokku config:set staging SMTP_USERNAME=xxx SMTP_PASSWORD='XXXX' SMTP_ADDRESS=mail.xxx.xx SMTP_DOMAIN=xxx.xx

## Setting up the application

You will need to do some steps before having the app working properly once you've deployed it:

1. Open a Rails console in the server: `bundle exec rails console`
2. Create a System Admin user:
```ruby
user = Decidim::System::Admin.new(email: <email>, password: <password>, password_confirmation: <password>)
user.save!
```
3. Visit `<your app url>/system` and login with your system admin credentials
4. Create a new organization. Check the locales you want to use for that organization, and select a default locale.
5. Set the correct default host for the organization, otherwise the app will not work properly. Note that you need to include any subdomain you might be using.
6. Fill the rest of the form and submit it.

You're good to go!
