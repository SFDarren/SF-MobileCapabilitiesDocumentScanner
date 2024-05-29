# Salesforce Document Scanner for Business Card

> [!NOTE]  
> For purpose of demonstrating DocumentScanner API in lightning/mobileCapabilities, performance, UI, and especially getting it to extract correctly were not the focus.

## LWCs
- documentScanner: lwc to place this in mobile page to allow scanning
- utils: utility lwc to parse error message (not written by me)

## Apex
- DocumentController: somehow lwc createRecord for ContentVersion does not return ContentDocumentId, so have to use Apex to query and insert the Link
