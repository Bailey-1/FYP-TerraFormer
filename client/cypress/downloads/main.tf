terraform {
  required_providers {
    azurerm = {
      source = "hashicorp/azurerm"

      version = "3.45.0"
    }
  }
}

resource "azurerm_resource_group" "b5qkc" {
  name = "hello world"

  location = ""
}