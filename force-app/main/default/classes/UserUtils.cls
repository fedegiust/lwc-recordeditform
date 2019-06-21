public with sharing class UserUtils {
    // Chequea por User Id si tiene asignado algun permission set con View Encrypted Data
    @AuraEnabled(cacheable=true)
    public static boolean userHasEncryptedData(Id userId){
        List<PermissionSetAssignment> psaEncrypt = [SELECT Id
                                                   FROM PermissionSetAssignment
                                                   WHERE PermissionSet.PermissionsViewEncryptedData = true
                                                   AND AssigneeId = :userId];

        if(psaEncrypt == null || psaEncrypt.isEmpty()){
            return false;
        } else{
            return true;
        }
    }
}
