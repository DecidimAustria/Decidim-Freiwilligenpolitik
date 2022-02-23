namespace :gitpod do
  desc "Fix host for organization"
  task :fix_organization_host => :environment do
    puts "Changing host for first organization to:"
    puts "3000-#{ENV['GITPOD_WORKSPACE_ID']}.#{ENV['GITPOD_WORKSPACE_CLUSTER_HOST']}"
    Decidim::Organization.first.update(host: "3000-#{ENV['GITPOD_WORKSPACE_ID']}.#{ENV['GITPOD_WORKSPACE_CLUSTER_HOST']}")
  end
end
