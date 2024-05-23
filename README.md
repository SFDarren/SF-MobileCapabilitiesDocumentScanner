# Salesforce Document Scanner for Business Card

## LWCs
- documentScanner: lwc to place this in mobile page to allow scanning
- utils: utility lwc to parse error message (not written by me)

Now that you’ve created a Salesforce DX project, what’s next? Here are some documentation resources to get you started.

## Apex
- DocumentController: somehow lwc createRecord for ContentVersion does not return ContentDocumentId, so have to use Apex to query and insert the Link
