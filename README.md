# Salesforce Document Scanner for Business Card

## Notes
- for demonstration purpose only. Basically to show case possibility of using DocumentScanner API for a business use case such as lead capturing
- performance was not accounted for, was just playing with extracting entities on a business card 
- Some code may not have been written properly, and function may not be function-ing well xD

## LWCs
- documentScanner: lwc to place this in mobile page to allow scanning
- utils: utility lwc to parse error message (not written by me)

## Apex
- DocumentController: somehow lwc createRecord for ContentVersion does not return ContentDocumentId, so have to use Apex to query and insert the Link
