"terraform" = {
  "required_providers" = {
    "azurerm" = {
      "source" = "hashicorp/azurerm"

      "version" = "3.45.0"
    }
  }
}

"resource" "azurerm_resource_group" "staging_rg" {
  "name" = "Classrooms-Staging"

  "location" = "UK South"

  "number" = 12

  "float" = 1.5

  "bool" = true

  "object" = {
    "prop1" = 1

    "prop2" = 1

    "prop3" = 1
  }
}

"resource" "azurerm_container_registry" "acr" {
  "name" = "stg-classrooms-cr"

  "resource_group_name" = azurerm_resource_group.staging_rg.name

  "location" = azurerm_resource_group.staging_rg.location

  "sku" = "Basic"
}