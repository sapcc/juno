require 'yaml'
require "erb"

# This script is used to merge multiple pipeline config files into one
# The pipeline config files are expected to be in the same directory as this script
# The script will merge the jobs, resources, and resource_types into one file
# If there are multiple jobs with the same name, the last one will be used
# If there are multiple resources with the same name, the last one will be used
# If there are multiple resource_types with the same name, the last one will be used
# If there are multiple groups with the same name, the jobs will be merged
# The script will output the merged pipeline config to the console
# The output can be redirected to a file if needed

# find all the pipeline config files in the same directory as this script
# yaml and yml files are supported, .yaml.erb or yml.erb files are also supported
pipeline_config_paths = Dir.glob("./#{File.dirname(__FILE__)}/*.{yaml,yml}{.erb,}")

# merge the keys in the pipeline config
merge_keys = ["jobs", "resource_types", "resources"]
# result hash to store the merged pipeline config
result = {}

# for each pipeline config file, merge the keys
pipeline_config_paths.each do |pipeline_config_path|
  # load the pipeline config file and parse it if it is an erb file
  pipeline_config = YAML.load(ERB.new(File.read(pipeline_config_path)).result)
  # skip if the pipeline config is nil or empty
  next if pipeline_config.nil?
  # for each key, merge the values
  merge_keys.each do |key|
    if pipeline_config[key]
      result[key] = [] if result[key].nil?
      result[key].concat(pipeline_config[key])
      # remove duplicates
      # result[key].uniq! { |x| x["name"] }
    end
    # groups need to be merged differently
    # it is a list of groups, each group has a name and a list of jobs
    if pipeline_config["groups"]
      # create the groups key if it does not exist
      result["groups"] = [] if result["groups"].nil?
      # find the group with the same name and merge the jobs
      pipeline_config["groups"].each do |group|
        # find the existing group with the same name
        existing_group = result["groups"].find { |g| g["name"] == group["name"] }
        # if the group exists, merge the jobs
        if existing_group
          existing_group["jobs"] = [] if existing_group["jobs"].nil?
          existing_group["jobs"].concat(group["jobs"])
          # remove duplicates
          # existing_group["jobs"].uniq!
        else
          # if the group does not exist, add it to the result
          result["groups"] << group
        end
      end
    end

  end
end

# output the merged pipeline config
puts result.to_yaml