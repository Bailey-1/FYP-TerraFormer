terraform {
  required_providers {
    azurerm = {
      source = "hashicorp/azurerm"

      version = "3.45.0"
    }
  }
}

provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "aXMNC" {
  name = "test"

  location = "Australia Central"
}

resource "azurerm_container_registry" "TJuaP" {
  name = "test"

  resource_group_name = azurerm_resource_group.aXMNC.name

  location = "Australia Central"

  sku = "Basic"
}