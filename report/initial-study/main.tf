# 1.
terraform {
  required_providers {
    azurerm = {
      source = "hashicorp/azurerm"
      version = "3.44.1"
    }
    aws = {
      source = "hashicorp/aws"
      version = "4.55.0"
    }
  }
}

provider "azurerm" {
  features {}
}

provider "aws" {}

resource "azurerm_resource_group" "example" {
  name     = "example-resources"
  location = "West Europe"
}

#resource "azurerm_virtual_network" "example" {
#  name                = "example-network"
#  address_space       = ["10.0.0.0/16"]
#  location            = azurerm_resource_group.example.location
#  resource_group_name = azurerm_resource_group.example.name
#}
#
#resource "azurerm_subnet" "example" {
#  name                 = "internal"
#  resource_group_name  = azurerm_resource_group.example.name
#  virtual_network_name = azurerm_virtual_network.example.name
#  address_prefixes     = ["10.0.2.0/24"]
#}
#
#resource "azurerm_network_interface" "example" {
#  name                = "example-nic"
#  location            = azurerm_resource_group.example.location
#  resource_group_name = azurerm_resource_group.example.name
#
#  ip_configuration {
#    name                          = "internal"
#    subnet_id                     = azurerm_subnet.example.id
#    private_ip_address_allocation = "Dynamic"
#  }
#}
#
#resource "azurerm_linux_virtual_machine" "example" {
#  name                = "example-machine"
#  resource_group_name = azurerm_resource_group.example.name
#  location            = azurerm_resource_group.example.location
#  size                = "Standard_F2"
#  admin_username      = "adminuser"
#  network_interface_ids = [
#    azurerm_network_interface.example.id,
#  ]
#
#  admin_ssh_key {
#    username   = "adminuser"
#    public_key = file("~/.ssh/id_rsa.pub")
#  }
#
#  os_disk {
#    caching              = "ReadWrite"
#    storage_account_type = "Standard_LRS"
#  }
#
#  source_image_reference {
#    publisher = "Canonical"
#    offer     = "UbuntuServer"
#    sku       = "16.04-LTS"
#    version   = "latest"
#  }
#}

resource "azurerm_mssql_server" "example" {
  name                         = "example-sqlserver8621386238682"
  resource_group_name          = azurerm_resource_group.example.name
  location                     = azurerm_resource_group.example.location
  version                      = "12.0"
#  administrator_login          = "4dm1n157r470r"
#  administrator_login_password = "4-v3ry-53cr37-p455w0rd"
}

resource "azurerm_mssql_database" "test" {
  name           = "acctest-db-d"
  server_id      = azurerm_mssql_server.example.id
#  sku_name       = "S0"
}

resource "azurerm_service_plan" "example" {
  name                = "example"
  resource_group_name = azurerm_resource_group.example.name
  location            = azurerm_resource_group.example.location
  os_type             = "Linux"
  sku_name            = "P1v2"
}

resource "azurerm_linux_web_app" "example" {
  name                = "example923823"
  resource_group_name = azurerm_resource_group.example.name
  location            = azurerm_service_plan.example.location
  service_plan_id     = azurerm_service_plan.example.id

  site_config {}

  tags = {
    environment: "staging"
  }
}

output "webpage_location" {
  value = azurerm_linux_web_app.example.default_hostname
}