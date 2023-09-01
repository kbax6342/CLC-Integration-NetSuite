/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/https','N/ui/message', 'N/record'],
    /**
     * @param{https} https
     */
    function (https, message, record) {

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
            try{
                if(scriptContext.mode === 'create') {
                    const rec = scriptContext.currentRecord

                    var fileString = rec.getValue({fieldId: 'custrecord_lf_image_aws_url'})

                    const fileName = (fileString) => {
                        var part = fileString.split("/")
                        return part.at(4)
                    }

                    rec.setValue({fieldId: 'custrecord_lf_art_file_name', value: fileName(fileString)})
                    return true;
                }

            }catch (e) {
                log.debug("Error", e)
            }

        }


        function artApprovalCLCSubmit(dataObj) {

            try {

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

                //console.log(loginResponse)

                var parsedData = JSON.parse(loginResponse.body)

                var bearer = "bearer " + parsedData.access_token

                var headers = {
                    "Content-Type": "application/json; charset=utf-8",
                    "Authorization": bearer
                }

                let headersObj = {
                    "Access-Control-Allow-Origin": "*"
                }

                if(dataObj.awsImageUrl) {
                    var response = https.get({
                        url: dataObj.awsImageUrl,
                        headers: headersObj
                    }), base64ImageString = response.body;



                }else {
                    base64ImageString = dataObj.imgString
                }



                var liCodeText = dataObj.licenseCode

                const subCatCode = (categoryCode) => {
                    const part = categoryCode.split('-')
                    return part.at(1)
                }

                const fileName = (awsImageUrl) => {
                    const part = awsImageUrl.split('/')
                    return part.at(-1)
                }

                const categoryCode = (categoryString) => {
                    const code = categoryString.split('-')
                    return code.at(0)
                }

                const liCode = (liCodeText) => {
                    const part = liCodeText.split(" ")
                    return part.at(2)
                }

                var description = dataObj.description
                var lincenseCode = liCode(liCodeText)
                var designNo = dataObj.itemName
                var colors = dataObj.color
                var orderPending = true
                var retailerName = dataObj.retailerCode
                var blankGoods = true
                var supplierId = 19368
                var additionalInfo = dataObj.addInfo
                var selectedApplication = dataObj.logoApplication
                var selectedMaterials = dataObj.materialContents
                var emailList = "licensing@logofit.com, art@logofit.com"
                var customId = (dataObj.id + 100) + new Date().getSeconds()
                var upis = dataObj.id + new Date().getSeconds()
                var distributionChannel = dataObj.dChannel
                var categoryString =  dataObj.categoryC
                var artFileData = base64ImageString
                var artFileNameAWS = dataObj.artFileName



                if(dataObj.awsImageUrl){


                    var artSubmitAWS = {
                        "Description": description,
                        "LicenseCode": lincenseCode,
                        "DesignNo": designNo,
                        "Colors": colors,
                        "OrderPending": orderPending,
                        "RetailerName": retailerName,
                        "BlankGoods": blankGoods,
                        "SupplierId": supplierId,
                        "AdditionalInfo": additionalInfo,
                        "SelectedLogoApplications": [selectedApplication],
                        "SelectedMaterialContents": [selectedMaterials],
                        "EmailsList": emailList,
                        "CustomId": customId,
                        "Upis": upis,
                        "SelectedProductCombinations":
                            [
                                {
                                    "CategoryCode": categoryCode(categoryString),
                                    "SubcategoryCode": subCatCode(categoryString),
                                    "DistributionChannels": [distributionChannel]
                                }
                            ],
                        "ArtFileName": artFileNameAWS,
                        "ArtFileData": artFileData
                    }

                    // console.log(artSubmitAWS)

                    let submitAApproval = https.post({
                        url: urlString,
                        headers: headers,
                        body: JSON.stringify(artSubmitAWS)
                    });


                   var value = JSON.parse(submitAApproval.body)


                    if(value.ProcessingErrorsJson === null){

                        let myMsg = message.create({
                            title: 'CLC Submission',
                            message: 'The Art Submission Was Submitted Successfully \n Please Remember to Hit Edit Button to View Submission Data',
                            type: message.Type.CONFIRMATION
                        });

                        myMsg.show({
                            duration: 7000 // will disappear after 5s
                        });

                        var licenseSubRec = record.load({
                            type: 'customrecord_lic_submission',
                            id: dataObj.id,
                            isDynamic: true
                        });

                        licenseSubRec.setValue({
                            fieldId: 'custrecord_lf_clc_custom_id',
                            value: value.CustomId
                        })

                        licenseSubRec.setValue({
                            fieldId: 'custrecord_lf_submission_date',
                            value: new  Date()
                        })

                        licenseSubRec.save();
                        location.reload();

                    } else {
                        let myMsg = message.create({
                            title: 'CLC Submission',
                            message: 'The Art Submission Was Not Submitted Successfully \n Error:' + value.ProcessingErrorsJson,
                            type: message.Type.ERROR
                        });
                        myMsg.show({
                            duration: 5000 // will disappear after 5s
                        });
                    }

                }else{
                    var artFileNameAlternative = dataObj.fileName;

                    var artSubmitAlternative = {
                        "Description": description,
                        "LicenseCode": lincenseCode,
                        "DesignNo": designNo,
                        "Colors": colors,
                        "OrderPending": orderPending,
                        "RetailerName": retailerName,
                        "BlankGoods": blankGoods,
                        "SupplierId": supplierId,
                        "AdditionalInfo": additionalInfo,
                        "SelectedLogoApplications": [selectedApplication],
                        "SelectedMaterialContents": [selectedMaterials],
                        "EmailsList": emailList,
                        "CustomId": customId,
                        "Upis": upis,
                        "SelectedProductCombinations":
                            [
                                {
                                    "CategoryCode": categoryCode(categoryString),
                                    "SubcategoryCode": subCatCode(categoryString),
                                    "DistributionChannels": [distributionChannel]
                                }
                            ],
                        "ArtFileName": artFileNameAlternative,
                        "ArtFileData": artFileData
                    }
                    let submitAApproval = https.post({
                        url: urlString,
                        headers: headers,
                        body: JSON.stringify(artSubmitAlternative)
                    });

                    var value = JSON.parse(submitAApproval.body)

                    if(value.ProcessingErrorsJson === null){

                        let myMsg = message.create({
                            title: 'CLC Submission',
                            message: 'The Art Submission Was Submitted Successfully \n Please Remember to Hit Edit Button to View Submission Data',
                            type: message.Type.CONFIRMATION
                        });

                        myMsg.show({
                            duration: 7000 // will disappear after 5s
                        });

                        var licenseSubRec = record.load({
                            type: 'customrecord_lic_submission',
                            id: dataObj.id,
                            isDynamic: true
                        });

                        licenseSubRec.setValue({
                            fieldId: 'custrecord_lf_clc_custom_id',
                            value: value.CustomId
                        })

                        licenseSubRec.setValue({
                            fieldId: 'custrecord_lf_submission_date',
                            value: new  Date()
                        })

                        licenseSubRec.save();
                        location.reload();

                    } else {
                        let myMsg = message.create({
                            title: 'CLC Submission',
                            message: 'The Art Submission Was Not Submitted Successfully \n Error:' + value.ProcessingErrorsJson,
                            type: message.Type.ERROR
                        });
                        myMsg.show({
                            duration: 5000 // will disappear after 5s
                        });
                    }


                }


            } catch (e) {
                log.debug("Error", e)
            }


        }

        function artApprovalCLCUpdate(dataObj) {
            try{
                var apiUrl = "https://clientapiqa.brandmanager360.com/";
                var urlString = "https://clientapiqa.brandmanager360.com/Artwork/UpdateArtQueue"

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

                console.log(loginResponse)


                var parsedData = JSON.parse(loginResponse.body)

                var bearer = "bearer " + parsedData.access_token

                var headers = {
                    "Content-Type": "application/json; charset=utf-8",
                    "Authorization": bearer
                }

                let headersObj = {
                    "Access-Control-Allow-Origin": "*"
                }

                if(dataObj.awsImageUrl) {
                    var response = https.get({
                        url: dataObj.awsImageUrl,
                        headers: headersObj
                    }), base64ImageString = response.body;


                }else {
                    base64ImageString = dataObj.imgString
                }

                const subCatCode = (categoryCode) => {
                    const part = categoryCode.split('-')
                    return part.at(1)
                }


                const categoryCode = (categoryString) => {
                    const code = categoryString.split('-')
                    return code.at(0)
                }

                const liCode = (liCodeText) => {
                    const part = liCodeText.split(" ")
                    return part.at(2)
                }
                var liCodeText = dataObj.licenseCode
                var description = dataObj.description
                var lincenseCode = liCode(liCodeText)
                var designNo = dataObj.itemName
                var colors = dataObj.color
                var orderPending = true
                var retailerName = dataObj.retailerCode
                var blankGoods = true
                var supplierId = 19368
                var additionalInfo = dataObj.addInfo
                var selectedApplication = dataObj.logoApplication
                var selectedMaterials = dataObj.materialContents
                var emailList = "licensing@logofit.com, art@logofit.com"
                var customId = dataObj.customId;
                let upis = dataObj.id;
                var distributionChannel = dataObj.dChannel;
                var categoryString =  dataObj.categoryC
                var artFileData = base64ImageString
                var artFileName = dataObj.artFileName

                if(dataObj.awsImageUrl){
                    var artFileNameAWS = dataObj.artFileName

                    var artSubmitAWS = {
                        "Description": description,
                        "LicenseCode": lincenseCode,
                        "DesignNo": designNo,
                        "Colors": colors,
                        "OrderPending": orderPending,
                        "RetailerName": retailerName,
                        "BlankGoods": blankGoods,
                        "SupplierId": supplierId,
                        "AdditionalInfo": additionalInfo,
                        "SelectedLogoApplications": [selectedApplication],
                        "SelectedMaterialContents": [selectedMaterials],
                        "EmailsList": emailList,
                        "CustomId": customId,
                        "Upis": upis ,
                        "SelectedProductCombinations":
                            [
                                {
                                    "CategoryCode": categoryCode(categoryString),
                                    "SubcategoryCode": subCatCode(categoryString),
                                    "DistributionChannels": [distributionChannel]
                                }
                            ],
                        "ArtFileName": "1015-nvy-w67758.jpg",
                        "ArtFileData": artFileData
                    }

                    let submitAApproval = https.post({
                        url: urlString,
                        headers: headers,
                        body: JSON.stringify(artSubmitAWS)
                    });
                    console.log(submitAApproval)

                    var value = JSON.parse(submitAApproval.body)

                    console.log(value.CustomId)

                    if(submitAApproval.code === 200){

                        let myMsg = message.create({
                            title: 'CLC Submission',
                            message: 'The Art Submission Was Submitted Successfully',
                            type: message.Type.CONFIRMATION
                        });

                        myMsg.show({
                            duration: 7000 // will disappear after 5s
                        });

                        var licenseSubRec = record.load({
                            type: 'customrecord_lic_submission',
                            id: dataObj.id,
                            isDynamic: true
                        });
                        console.log("This script is executing")

                        licenseSubRec.setValue({
                            fieldId: 'custrecord_lf_clc_custom_id',
                            value: value.CustomId
                        })

                        licenseSubRec.setValue({
                            fieldId: 'custrecord_lf_submission_date',
                            value: new  Date()
                        })

                        licenseSubRec.save();

                    } else {
                        let myMsg = message.create({
                            title: 'CLC Submission',
                            message: 'The Art Submission Was Not Submitted Successfully',
                            type: message.Type.ERROR
                        });
                        myMsg.show({
                            duration: 5000 // will disappear after 5s
                        });
                    }

                }else{
                    var artFileNameAlternative = dataObj.fileName;
                    var artSubmitAlternative = {
                        "Description": description,
                        "LicenseCode": lincenseCode,
                        "DesignNo": designNo,
                        "Colors": colors,
                        "OrderPending": orderPending,
                        "RetailerName": retailerName,
                        "BlankGoods": blankGoods,
                        "SupplierId": supplierId,
                        "AdditionalInfo": additionalInfo,
                        "SelectedLogoApplications": [selectedApplication],
                        "SelectedMaterialContents": [selectedMaterials],
                        "EmailsList": emailList,
                        "CustomId": customId,
                        "Upis": upis,
                        "SelectedProductCombinations":
                            [
                                {
                                    "CategoryCode": categoryCode(categoryString),
                                    "SubcategoryCode": subCatCode(categoryString),
                                    "DistributionChannels": [distributionChannel]
                                }
                            ],
                        "ArtFileName": artFileNameAlternative,
                        "ArtFileData": artFileData
                    }
                    let submitAApproval = https.post({
                        url: urlString,
                        headers: headers,
                        body: JSON.stringify(artSubmitAlternative)
                    });
                    console.log(submitAApproval)

                    console.log(submitAApproval.body)

                    if(submitAApproval.code === 200){

                        let myMsg = message.create({
                            title: 'CLC Submission',
                            message: 'The Art Submission Was Submitted Successfully',
                            type: message.Type.CONFIRMATION
                        });

                        myMsg.show({
                            duration: 7000 // will disappear after 5s
                        });

                    } else {
                        let myMsg = message.create({
                            title: 'CLC Submission',
                            message: 'The Art Submission Was Not Submitted Successfully',
                            type: message.Type.ERROR
                        });
                        myMsg.show({
                            duration: 5000 // will disappear after 5s
                        });
                    }

                    var licenseSubRec = record.load({
                        type: 'customrecord_lic_submission',
                        id: dataObj.id,
                        isDynamic: true
                    });

                    console.log(licenseSubRec)

                    licenseSubRec.setValue({
                        fieldId: 'custrecord_lf_clc_custom_id',
                        value: value.CustomId,
                        ignoreFieldChange: true
                    })

                }


            }catch (e) {
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
        return true

        }


        return {
            artApprovalCLCUpdate: artApprovalCLCUpdate,
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
