/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/record', 'N/recordContext', 'N/search'],

    function (record, recordContext, render, search, serverWidget, currentRecord) {

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
            console.log(dataObj)
            try {

                //var clientData = JSON.parse(dataObj)

                var colorObj = dataObj.color[0]
                var descriptionObj = dataObj.description[0]
                var orderPendingObj = dataObj.orderPending
                var lfUpcCodeObj = dataObj.lfUpcCode[0]
                //var artFileNames = dataObj.artFileNames[0]
                var categoryCodeObj = dataObj.categoryCode[0]
                var itemNameObj = dataObj.itemName[0]
                var retailerCodeObj = dataObj.retailerCode[0]
                var subCatCodeObj = dataObj.subCatCode

                var number = 6

                var idNumber = Math.random().toString(36).substring(2, number + 2);
                var designNumber = "LF" + Math.random().toString(36).substring(2, number + 2);
                var retailerName = "LogoFit"
                var supplierID = 10234
                var emailList = "kbaxter@logofit.com, atyler@logofit.com"
                var blankGoods = false;
                var additionalInfo = " ";


                var artApproval = {
                    "Id": idNumber,
                    "Description": descriptionObj,
                    "LicenseCode": "FLA",
                    //meet with ann
                    "DesignNo": designNumber,
                    "Colors": colorObj,
                    "OrderPending": orderPendingObj,
                    "RetailerName": retailerName,
                    "BlankGoods": blankGoods,
                    "SupplierId": supplierID,
                    "AdditionalInfo": additionalInfo,
                    "EmailsList": emailList,
                    "CustomId": 4163581,
                    //meet with ann
                    "Upis": lfUpcCodeObj,
                    "ArtFileName": itemNameObj,
                    "ArtFileData": "209 5809)(*(*",
                    "SelectedMaterialsContents":[]  ,
                    "SelectedLogoApplications": [] ,
                    "SelectedProductCombinations": [
                        {
                            "CategoryCode": retailerCodeObj,
                            "SubcategoryCode": subCatCodeObj,
                            "DistributionChannels": []
                        }
                    ],


                }

                console.log(objectdata)


            } catch (e) {
                log.debug("Error", e)
            }


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
