'use strict';

/**
 * pay.gov utility
 * @module paygov
 */
const jwt = require('jsonwebtoken');
const xml = require('xml');
const vcapConstants = require('./vcap-constants.es6');

const paygov = {};

/**
 * create success url
 */
paygov.createSuccessUrl = (forestAbbr, permitId) => {
  const claims = {
    issuer: 'trees-permit-api',
    subject: 'christmas tree permit orders',
    audience: 'fs-trees-permit-api-users'
  };
  const token = jwt.sign(
    {
      data: permitId
    },
    vcapConstants.permitSecret,
    claims
  );
  console.log('jwt_token=', token);
  return `${
    vcapConstants.intakeClientBaseUrl
  }/christmas-trees/forests/${forestAbbr}/applications/permits/${permitId}?t=${token}`;
};

/**
 * Generate XML from the template to use for getting pay.gov transaction token.
 */
paygov.getXmlForToken = (forestAbbr, orgStructureCode, permit) => {
  const tcsAppID = vcapConstants.payGovAppId;
  let url_success = '';
  try {
    console.log('vcapConstants.permitSecret=', vcapConstants.permitSecret);
    url_success = paygov.createSuccessUrl(forestAbbr, permit.permitId);
    console.log('url_success=', url_success);
  } catch (e) {
    console.error('problem creating success url for permit ' + permit.id, e);
  }

  const url_cancel = `${vcapConstants.intakeClientBaseUrl}/christmas-trees/forests/${forestAbbr}/applications/${
    permit.permitId
  }`;

  const xmlTemplate = [
    {
      'S:Envelope': [
        {
          _attr: {
            'xmlns:S': 'http://schemas.xmlsoap.org/soap/envelope/'
          }
        },
        {
          'S:Header': []
        },
        {
          'S:Body': [
            {
              'ns2:startOnlineCollection': [
                {
                  _attr: {
                    'xmlns:ns2': 'http://fms.treas.gov/services/tcsonline'
                  }
                },
                {
                  startOnlineCollectionRequest: [
                    {
                      tcs_app_id: tcsAppID
                    },
                    {
                      agency_tracking_id: permit.permitId
                    },
                    {
                      transaction_type: 'Sale'
                    },
                    {
                      transaction_amount: permit.totalCost
                    },
                    {
                      language: 'en'
                    },
                    {
                      url_success: url_success
                    },
                    {
                      url_cancel: url_cancel
                    },
                    {
                      account_holder_name: permit.firstName + ' ' + permit.lastName
                    },
                    {
                      custom_fields: [
                        {
                          custom_field_1: orgStructureCode
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ];

  return xml(xmlTemplate);
};

/**
 * Generate XML from the template to use for completing pay.gov transaction.
 */
paygov.getXmlToCompleteTransaction = paygovToken => {
  const xmlTemplate = [
    {
      'S:Envelope': [
        {
          _attr: {
            'xmlns:S': 'http://schemas.xmlsoap.org/soap/envelope/'
          }
        },
        {
          'S:Header': []
        },
        {
          'S:Body': [
            {
              'ns2:completeOnlineCollection': [
                {
                  _attr: {
                    'xmlns:ns2': 'http://fms.treas.gov/services/tcsonline'
                  }
                },
                {
                  completeOnlineCollectionRequest: [
                    {
                      tcs_app_id: vcapConstants.payGovAppId
                    },
                    {
                      token: paygovToken
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ];
  return xml(xmlTemplate);
};

paygov.getToken = result => {
  const startOnlineCollectionResponse =
    result['S:Envelope']['S:Body'][0]['ns2:startOnlineCollectionResponse'][0]['startOnlineCollectionResponse'][0];
  return startOnlineCollectionResponse.token[0];
};

paygov.getResponseError = result => {
  const faultMesssage = result['S:Envelope']['S:Body'][0]['S:Fault'][0]['detail'][0]['ns2:TCSServiceFault'][0];
  return { errorCode: faultMesssage.return_code, errorMessage: faultMesssage.return_detail };
};

paygov.getTrackingId = result => {
  const completeOnlineCollectionResponse =
    result['S:Envelope']['S:Body'][0]['ns2:completeOnlineCollectionResponse'][0]['completeOnlineCollectionResponse'][0];
  return completeOnlineCollectionResponse.paygov_tracking_id[0];
};
/**
 * pay.gov utility
 * @exports paygov
 */
module.exports = paygov;
