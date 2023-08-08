/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/record', 'N/recordContext', 'N/render', 'N/search', 'N/ui/serverWidget'],
    /**
     * @param{record} record
     * @param{recordContext} recordContext
     * @param{render} render
     * @param{search} search
     * @param{serverWidget} serverWidget
     */
    (record, recordContext, render, search, serverWidget) => {
        /**
         * Defines the function definition that is executed before record is loaded.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @param {Form} scriptContext.form - Current form
         * @param {ServletRequest} scriptContext.request - HTTP request information sent from the browser for a client action only.
         * @since 2015.2
         */

        var fileOutput = "";
        const beforeLoad = (scriptContext) => {

            try {
                var retailerCode;
                const form = scriptContext.form

                var rec = scriptContext.newRecord

                const color = rec.getText({
                    fieldId: 'custitem_lf_color_matrix'
                })

                const lfUpcCode = rec.getValue({
                    fieldId: 'upccode'
                })

                const description = rec.getValue({
                    fieldId: 'custitem_lf_art_approval_description'
                })

                const orderPending = rec.getValue({
                    fieldId: 'custitem_lf_weld_license_approved'
                });

                const artFileNames = rec.getValue({
                    fieldId: 'custitem_lf_art_file_ap'
                })

                const categoryCode = rec.getValue({
                    fieldId: 'custitemlogofit_category_code'
                })

                const itemName = rec.getValue({
                    fieldId: 'itemid'
                })

                const schoolRecordValue = rec.getValue({
                    fieldId: 'custitem_lf_school'
                })

                const subCatCode = rec.getValue({
                    fieldId: 'custitem_lf_hybrid'
                })



                var customerSearchObj = search.create({
                    type: "customer",
                    filters:
                        [
                            ["custentity_lf_school_record","anyof", schoolRecordValue],
                            "AND",
                            ["parentcustomer.entityid","isempty",""]
                        ],
                    columns:
                        [
                            "custentity_lf_school_record",
                            search.createColumn({
                                name: "entityid",
                                sort: search.Sort.ASC
                            })
                        ]
                });
                var searchResultCount = customerSearchObj.runPaged().count;

                customerSearchObj.run().each(function(result){
                    // .run().each has a limit of 4,000 results
                    // retailerCode = result.getValue({
                    //     fieldId: 'custentity_lf_retailer_code'
                    // })

                   var object = JSON.parse(result.values)

                    log.debug("school record", object)
                    return true;                });

                /*
                customerSearchObj.id="customsearch1691438600745";
                customerSearchObj.title="LF | School - Customer Search - KB (copy)";
                var newSearchId = customerSearchObj.save();
                */


                const dataObj = JSON.stringify({
                    color,
                    lfUpcCode,
                    itemName,
                    categoryCode,
                    description,
                    orderPending,
                    subCatCode,
                    retailerCode,
                })

                form.clientScriptModulePath = "SuiteScripts/CLCIntegration/ArtApprovalSubmitCScript.js"


                form.addButton({
                    id: 'custpage_CLCArtApprovalSubmit',
                    label: 'Send Approval',
                    functionName: `artApprovalCLCSubmit(${dataObj})`


                })

                form.addButton({
                    id: 'custpage_CLCArtApprovalUpdate',
                    label: 'Update Approval',
                    functionName: 'artApprovalCLCSubmit'
                })

            } catch (e) {
                log.debug("Error", e)
            }


        }

        /**
         * Defines the function definition that is executed before record is submitted.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @since 2015.2
         */
        const beforeSubmit = (scriptContext) => {

            const record = scriptContext.newRecord


            fileOutput = (event) => {
                if (event.target.files && event.target.files[0]) {
                    const reader = new FileReader();
                    reader.onload = event => fileOut.innerHTML = event.target.result;
                    return reader.readAsText(event.target.files[0]);
                }
            }


        }

        /**
         * Defines the function definition that is executed after record is submitted.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @since 2015.2
         */
        const afterSubmit = (scriptContext) => {

        }

        return {beforeLoad, beforeSubmit, afterSubmit}

    });
