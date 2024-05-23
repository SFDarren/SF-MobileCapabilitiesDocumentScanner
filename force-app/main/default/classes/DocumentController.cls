public with sharing class DocumentController {
    @AuraEnabled
    public static void createLink(String contentVersionId, String recordId) {
        System.debug('contentVersionId: ' + contentVersionId);
        System.debug('recordId: ' + recordId);
        ContentVersion cv = [SELECT Id, ContentDocumentId FROM ContentVersion WHERE Id =: contentVersionId LIMIT 1] ?? null;
        System.debug('cv.Id: ' + String.valueOf(cv.Id));
        if (cv != null) {
            ContentDocumentLink cdl = new ContentDocumentLink();
            cdl.ContentDocumentId = cv.ContentDocumentId;
            cdl.LinkedEntityId = recordId;
            insert cdl;
        }
    }
}