# LWC Demo: Record Edit Form

## Install Instructions
1. Clone repo
    ```
    https://github.com/fedegiust/lwc-recordeditform.git
    ```

2. If you are using a scratch org.
    * Authorize Dev Hub
    ```
    sfdx force:auth:web:login --setdefaultdevhubusername --setalias my-hub-org
    ```
    * Create Scratch Org
    ```
    sfdx force:org:create -f project-scratch-def.json
    ```
    If you are using a Dev Org 
    * Authorize Org
    ```
    sfdx force:auth:web:login --setalias my-sandbox
    ```
3. Deploy Source to Org
    ```
    sfdx force:source:deploy -p path/to/source
    ```
4. Assign Permission Set to Admin
    ```
    sfdx force:user:display
    sfdx force:user:permset:assign --permsetname Encryption_Keys --targetusername <adminuser>
    ```
5. Create Standard User
    ```
    sfdx force:user:create --setalias standard-user
    ```
6. Generate Password
    ```
    sfdx force:user:password:generate --targetusername standard-user
    ```