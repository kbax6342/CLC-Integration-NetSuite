/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/https'],
    /**
     * @param{https} https
     */
    function (https) {

        /**
         * Function to be executed after page is initialized.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.mode - The mode in which the record is being accessed (create, copy, or edit)
         *
         * @since 2015.2
         */
        function pageInit(scriptContext) {

        }


        function artApprovalCLCSubmit(dataObj) {

            try {

                var customNumber = Math.floor(Math.random(23));
                var colorObj = dataObj.color[0]
                var descriptionObj = dataObj.description[0]
                var orderPendingObj = dataObj.orderPending
                var lfUpcCodeObj = dataObj.lfUpcCode
                //var artFileNames = dataObj.artFileNames[0]
                var categoryCodeObj = dataObj.categoryCode[0]
                var itemNameObj = dataObj.itemName
                var retailerCodeObj = dataObj.retailerCode
                var subCatCodeObj = dataObj.subCatCode
                var awsURL = dataObj.awsURL

                var number = 6

                var idNumber = Math.random().toString(36).substring(2, number + 2);
                var designNumber = "LF" + Math.random().toString(36).substring(2, number + 2);
                var retailerName = "LogoFit LLC"
                var supplierID = 10234
                var emailList = "atyler@logofit.com"
                var blankGoods = true;
                var additionalInfo = " ";

                var apiUrl = "https://clientapiqa.brandmanager360.com/";
                var urlString = "https://clientapiqa.brandmanager360.com/Artwork/SubmitArtwork"


                var objData = {
                    "username": "netsuite api_12034",
                    "password": "uL#+*6m^-ig091}L@dySH:K(Q6",
                    "grant_type": "password"
                };

                let loginResponse = https.post({
                    url: apiUrl + "Token",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "Cache-Control": "no-cache"
                    },
                    body: objData
                });


                var parsedData = JSON.parse(loginResponse.body)


                var bearer = "bearer " + parsedData.access_token

                var headers = {
                    "Content-Type": "application/json; charset=utf-8",
                    "Authorization": bearer
                }

                let headersObj = {
                    "Access-Control-Allow-Origin": "*"
                }

                var response = https.get({
                    url: 'https://d1nyf670ujuw7h.cloudfront.net/Logoed-Images/1015-nvy-w67758.jpg',
                    headers: headersObj
                })


                var base64ImageUndecodedString = JSON.stringify(response.body)


                //encode string javascript
                var base64ImageEncodeString = btoa(base64ImageUndecodedString)


                function base64ToArrayBuffer(base64) {
                    var binaryString = atob(base64);

                    var bytes = new Uint8Array(binaryString.length);

                    for (var i = 0; i < binaryString.length; i++) {
                        bytes[i] = binaryString.charCodeAt(i)
                    }
                    return bytes
                }

                var artFileData = base64ToArrayBuffer(base64ImageEncodeString)




                var bodyOBJ = {
                    "Description": descriptionObj,
                    "LicenseCode": "CLC",
                    "DesignNo": itemNameObj + "-" + customNumber,
                    "Colors": colorObj,
                    "OrderPending": orderPendingObj,
                    "RetailerName": retailerName,
                    "BlankGoods": blankGoods,
                    "SupplierId": supplierID,
                    "AdditionalInfo": additionalInfo,
                    "SelectedLogoApplications": ["DigitalPrint"],
                    "SelectedMaterialContents": ["Cotton"],
                    "EmailsList": emailList,
                    "CustomId": itemNameObj + " - " + idNumber,
                    "Upis": itemNameObj,
                    "SelectedProductCombinations":
                        [
                            {"CategoryCode": "01C-1", "SubcategoryCode": "1", "DistributionChannels": ["camp", "GDC"]}
                        ],
                    "ArtFileName": itemNameObj,
                    "ArtFileData": artFileData
                }


                let submitAApproval = https.post({
                    url: urlString,
                    headers: headers,
                    body: JSON.stringify(bodyOBJ)
                });


            } catch (e) {
                log.debug("Error", e)
            }


        }

        function convertImage() {

        }


        /**
         * Function to be executed when field is changed.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.sublistId - Sublist name
         * @param {string} scriptContext.fieldId - Field name
         * @param {number} scriptContext.lineNum - Line number. Will be undefined if not a sublist or matrix field
         * @param {number} scriptContext.columnNum - Line number. Will be undefined if not a matrix field
         *
         * @since 2015.2
         */
        function fieldChanged(scriptContext) {

        }

        /**
         * Function to be executed when field is slaved.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.sublistId - Sublist name
         * @param {string} scriptContext.fieldId - Field name
         *
         * @since 2015.2
         */
        function postSourcing(scriptContext) {

        }

        /**
         * Function to be executed after sublist is inserted, removed, or edited.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.sublistId - Sublist name
         *
         * @since 2015.2
         */
        function sublistChanged(scriptContext) {

        }

        /**
         * Function to be executed after line is selected.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.sublistId - Sublist name
         *
         * @since 2015.2
         */
        function lineInit(scriptContext) {

        }

        /**
         * Validation function to be executed when field is changed.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.sublistId - Sublist name
         * @param {string} scriptContext.fieldId - Field name
         * @param {number} scriptContext.lineNum - Line number. Will be undefined if not a sublist or matrix field
         * @param {number} scriptContext.columnNum - Line number. Will be undefined if not a matrix field
         *
         * @returns {boolean} Return true if field is valid
         *
         * @since 2015.2
         */
        function validateField(scriptContext) {

        }

        /**
         * Validation function to be executed when sublist line is committed.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.sublistId - Sublist name
         *
         * @returns {boolean} Return true if sublist line is valid
         *
         * @since 2015.2
         */
        function validateLine(scriptContext) {

        }

        /**
         * Validation function to be executed when sublist line is inserted.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.sublistId - Sublist name
         *
         * @returns {boolean} Return true if sublist line is valid
         *
         * @since 2015.2
         */
        function validateInsert(scriptContext) {

        }

        /**
         * Validation function to be executed when record is deleted.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.sublistId - Sublist name
         *
         * @returns {boolean} Return true if sublist line is valid
         *
         * @since 2015.2
         */
        function validateDelete(scriptContext) {

        }

        /**
         * Validation function to be executed when record is saved.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @returns {boolean} Return true if record is valid
         *
         * @since 2015.2
         */
        function saveRecord(scriptContext) {


        }


        return {
            convertImage: convertImage,
            artApprovalCLCSubmit: artApprovalCLCSubmit,
            pageInit: pageInit,
            fieldChanged: fieldChanged,
            postSourcing: postSourcing,
            sublistChanged: sublistChanged,
            lineInit: lineInit,
            validateField: validateField,
            validateLine: validateLine,
            validateInsert: validateInsert,
            validateDelete: validateDelete,
            saveRecord: saveRecord
        };

    });
