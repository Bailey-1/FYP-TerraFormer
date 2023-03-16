# resource "azurerm_resource_group" "example" {
#   name     = "example-resources"
  
#   # Many regions available. Inconsistent naming e.g. "West Europe", "UK South"
#   location = "West Europe" 
# }

# resource "azurerm_storage_account" "example" {
#   name                     = "examplestoracc"
#   resource_group_name      = azurerm_resource_group.example.name
#   location                 = azurerm_resource_group.example.location
  
#   # "Standard" or "Premium" - Uses capitals
#   account_tier             = "Standard"
  
#   # LRS, GRS, RAGRS, ZRS, GZRS, RAGZRS - Near impossible to remember and not all regions support every type.
#   account_replication_type = "LRS" # Locally redundant storage
# }

# resource "azurerm_storage_container" "example" {
#   name                  = "content"
#   storage_account_name  = azurerm_storage_account.example.name

#   # "blob", "container", or "private". Default: "private" - Doesn't use capitals
#   container_access_type = "blob"
# }

# Defines the required provider plugins
terraform {
 required_providers {
   azurerm = {
     source  = "hashicorp/azurerm"
     version = "2.98.0"
   }
 }
}

# Provider configuration such as authentication - Azure handles this through "az" cli
provider "azurerm" {
 features {}
}

# Resource group - A logical grouping of cloud resources primarily for management
resource "azurerm_resource_group" "rg" {
 name     = "my-resource-group"
 location = "West Europe"
}

# The database server which is in the above resource group
resource "azurerm_mssql_server" "example" {
  name                         = "example-db-server"
  resource_group_name          = azurerm_resource_group.rg.name
  location                     = azurerm_resource_group.rg.location
  version                      = "12.0"
}

# An example database in the database server
resource "azurerm_mssql_database" "test" {
  name           = "example-db"
  server_id      = azurerm_mssql_server.example.id
}

resource "azurerm_container_registry" "acr" {
  name                = "classroomscr"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  sku                 = "Basic"
}

resource "azurerm_static_site" "demo" {
 name = "classrooms-client"
 resource_group_name = azurerm_resource_group.rg.name
 location = azurerm_resource_group.rg.location

 sku_size = "Free"
 sku_tier = "Free"
}