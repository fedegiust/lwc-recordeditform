# LWC Demo: Record Edit Form

- Clone repo
- Authorize Dev Hub
- Create Scratch Org
- Deploy Source to Org
- Assign Permission Set to Admin
```sfdx force:user:display```
```sfdx force:user:permset:assign --permsetname Encryption_Keys --targetusername <adminuser>```
- Create Standard User
```sfdx force:user:create --setalias standard-user```
- Generate Password
```sfdx force:user:password:generate --targetusername standard-user```