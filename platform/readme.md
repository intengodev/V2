#Platform
Configures and runs the app

####Shared Config
In the config/shared folder you will find the shared config.
The platform will look for the configurables property and then call a 
corresponding `set_[property_name]` method on it where property name is 
the name of the configurable and has a corresponding property name in the 
config file.