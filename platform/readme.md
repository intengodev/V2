#Platform
Configures and runs the app

##Shared Config

####Configurables
In the config/shared folder you will find the shared config.
The platform will look for the configurables property and then call a 
corresponding `set_[property_name]` method on it where property name is 
the name of the configurable and has a corresponding property name in the 
config file.

#####Packages
A package is a loose term describing both the front end and back end code
for a single module. So, users, or questions for instance. All of the services,
specs, components, directives, express setup and all will live here. 

Packages live in `src/app`. The platform will look for a corresponding
server folder, `[package_name/server]` for each package. If it is the root 
level package ( app ) then it won't look for a server package.

#####Core Packages
Core technology that composes the features that the platform is able to incorporate.
These are npm packages. These are to be installed via npm and then the package name 
should be added to the config manually for the app to use it.