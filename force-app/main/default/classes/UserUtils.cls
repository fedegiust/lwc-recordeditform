public with sharing class UserUtils {
    // Chequea por User Id si tiene asignado algun permission set con View Encrypted Data
    @AuraEnabled
    public static boolean userHasEncryptedData(Id userId){
        List<PermissionSetAssignment> psaEncrypt = [SELECT Id
                                                   FROM PermissionSetAssignment
                                                   WHERE PermissionSet.PermissionsViewEncryptedData = true
                                                   AND AssigneeId = :userId];

        if(psaEncrypt.isEmpty()){
            return false;
        } else{
            return true;
        }
    }
}
