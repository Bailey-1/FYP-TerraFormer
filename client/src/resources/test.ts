class azurerm_resource_group {
    name: string;
    location: 'UK South' | 'UK West' | 'West Europe' | 'North Europe';

    constructor() {
        this.name = 'Resource Group';
        this.location = 'UK South';
    }
}

class azurerm_storage_account {
    resource_group: azurerm_resource_group;

    name: string = '';
    account_tier: 'Standard' | 'Free' = 'Standard';
    get resource_group_name() {
        return this.resource_group.name;
    }

    get location() {
        return this.resource_group.location;
    }

    constructor(rg: azurerm_resource_group) {
        this.resource_group = rg;
    }

    output() {
        return {
            name: this.name,
            account_tier: this.account_tier,
            resource_group_name: this.resource_group_name,
            location: this.resource_group.location,
        };
    }
}

const rg = new azurerm_resource_group();
rg.name = 'Test 123';
rg.location = 'UK West';

const sa = new azurerm_storage_account(rg);
sa.name = 'New storage account';
sa.account_tier = 'Free';

console.log(sa.output());

export { azurerm_resource_group, azurerm_storage_account };
