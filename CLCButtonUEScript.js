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

        const beforeLoad = (scriptContext) => {

            try {

                const form = scriptContext.form

                var rec = scriptContext.newRecord

                var color = rec.getText({
                    fieldId: "custrecord_lf_item_color"
                })


                var lfUpcCode = rec.getText({
                    fieldId: "custrecord_lf_item_number"
                })

                var itemName = rec.getText({
                    fieldId: "custrecord_lf_item_number"
                })

                var awsImageUrl = rec.getValue({
                    fieldId: 'custrecord_lf_image_aws_url'
                })

                var customer = rec.getValue({
                    fieldId: 'custrecord_lf_customer'
                })

                var logoApplication = rec.getText({
                    fieldId: 'custrecord_lf_logo_application'
                })

                var materialContents = rec.getText({
                    fieldId: 'custrecord_lf_material_contents'
                })

                var retailerCode = rec.getValue({
                    fieldId: 'custrecord_lf_retailer_code'
                })

                var licenseCode = rec.getText({
                    fieldId: 'custrecord_lf_roy_code'
                })

                var categoryC = rec.getValue({
                    fieldId: 'custrecord_lf_cat_code'
                });


                var description = rec.getValue({
                    fieldId: 'custrecord_lf_short_description'
                })

                var orderPending = rec.getValue({
                    fieldId: 'custrecord_lf_lic_approved_box'
                })

                var dChannel = rec.getText({
                    fieldId: 'custrecord_lf_dist_channel'
                })

                var addInfo = rec.getValue({
                    fieldId: 'custrecord_lf_comments_to_lic'
                })

                const dataObj = JSON.stringify({
                    color,
                    lfUpcCode,
                    itemName,
                    categoryC,
                    description,
                    orderPending,
                    retailerCode,
                    awsImageUrl,
                    licenseCode,
                    customer,
                    logoApplication,
                    materialContents,
                    addInfo,
                    dChannel,
                })

                //form.clientScriptModulePath = "SuiteScripts/CLCIntegration/ArtApprovalSubmitCScript.js"

                form.clientScriptModulePath = "SuiteScripts/CLCIntegration/httpsrequestClientScript.js"




                form.addButton({
                    id: 'custpage_CLCArtApprovalSubmit',
                    label: 'Submit',
                    functionName: `artApprovalCLCSubmit(${dataObj})`

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
