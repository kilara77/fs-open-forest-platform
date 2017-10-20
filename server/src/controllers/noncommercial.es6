'use strict';

const moment = require('moment');

const email = require('../email/email-util.es6');
const NoncommercialApplication = require('../models/noncommercial-application.es6');
const Revision = require('../models/revision.es6');
const util = require('../util.es6');
const validator = require('../validation.es6');
const vcapConstants = require('../vcap-constants.es6');

const noncommercial = {};

const translateFromClientToDatabase = input => {
  return {
    applicantInfoDayPhoneAreaCode: input.applicantInfo.dayPhone.areaCode,
    applicantInfoDayPhoneExtension: input.applicantInfo.dayPhone.extension,
    applicantInfoDayPhoneNumber: input.applicantInfo.dayPhone.number,
    applicantInfoDayPhonePrefix: input.applicantInfo.dayPhone.prefix,
    applicantInfoEmailAddress: input.applicantInfo.emailAddress,
    applicantInfoEveningPhoneAreaCode: input.applicantInfo.eveningPhone
      ? input.applicantInfo.eveningPhone.areaCode
      : null,
    applicantInfoEveningPhoneExtension: input.applicantInfo.eveningPhone
      ? input.applicantInfo.eveningPhone.extension
      : null,
    applicantInfoEveningPhoneNumber: input.applicantInfo.eveningPhone ? input.applicantInfo.eveningPhone.number : null,
    applicantInfoEveningPhonePrefix: input.applicantInfo.eveningPhone ? input.applicantInfo.eveningPhone.prefix : null,
    applicantInfoOrganizationName: input.applicantInfo.organizationName,
    applicantInfoOrgMailingAddress: input.applicantInfo.organizationAddress
      ? input.applicantInfo.organizationAddress.mailingAddress
      : null,
    applicantInfoOrgMailingAddress2: input.applicantInfo.organizationAddress
      ? input.applicantInfo.organizationAddress.mailingAddress2
      : null,
    applicantInfoOrgMailingCity: input.applicantInfo.organizationAddress
      ? input.applicantInfo.organizationAddress.mailingCity
      : null,
    applicantInfoOrgMailingState: input.applicantInfo.organizationAddress
      ? input.applicantInfo.organizationAddress.mailingState
      : null,
    applicantInfoOrgMailingZIP: input.applicantInfo.organizationAddress
      ? input.applicantInfo.organizationAddress.mailingZIP
      : null,
    applicantInfoOrgType: input.applicantInfo.orgType,
    applicantInfoPrimaryFirstName: input.applicantInfo.primaryFirstName,
    applicantInfoPrimaryLastName: input.applicantInfo.primaryLastName,
    applicantInfoPrimaryMailingAddress: input.applicantInfo.primaryAddress
      ? input.applicantInfo.primaryAddress.mailingAddress
      : null,
    applicantInfoPrimaryMailingAddress2: input.applicantInfo.primaryAddress
      ? input.applicantInfo.primaryAddress.mailingAddress2
      : null,
    applicantInfoPrimaryMailingCity: input.applicantInfo.primaryAddress
      ? input.applicantInfo.primaryAddress.mailingCity
      : null,
    applicantInfoPrimaryMailingState: input.applicantInfo.primaryAddress
      ? input.applicantInfo.primaryAddress.mailingState
      : null,
    applicantInfoPrimaryMailingZIP: input.applicantInfo.primaryAddress
      ? input.applicantInfo.primaryAddress.mailingZIP
      : null,
    applicantInfoSecondaryFirstName: input.applicantInfo.secondaryFirstName,
    applicantInfoSecondaryLastName: input.applicantInfo.secondaryLastName,
    applicantInfoSecondaryMailingAddress: input.applicantInfo.secondaryAddress
      ? input.applicantInfo.secondaryAddress.mailingAddress
      : null,
    applicantInfoSecondaryMailingAddress2: input.applicantInfo.secondaryAddress
      ? input.applicantInfo.secondaryAddress.mailingAddress2
      : null,
    applicantInfoSecondaryMailingCity: input.applicantInfo.secondaryAddress
      ? input.applicantInfo.secondaryAddress.mailingCity
      : null,
    applicantInfoSecondaryMailingState: input.applicantInfo.secondaryAddress
      ? input.applicantInfo.secondaryAddress.mailingState
      : null,
    applicantInfoSecondaryMailingZIP: input.applicantInfo.secondaryAddress
      ? input.applicantInfo.secondaryAddress.mailingZIP
      : null,
    applicantInfoWebsite: input.applicantInfo.website,
    authorizingOfficerName: input.authorizingOfficerName,
    authorizingOfficerTitle: input.authorizingOfficerTitle,
    district: input.district,
    eventName: input.eventName,
    forest: input.forest,
    noncommercialFieldsActivityDescription: input.noncommercialFields.activityDescription,
    noncommercialFieldsEndDateTime: input.dateTimeRange.endDateTime,
    noncommercialFieldsLocationDescription: input.noncommercialFields.locationDescription,
    noncommercialFieldsNumberParticipants: input.noncommercialFields.numberParticipants,
    noncommercialFieldsSpectatorCount: input.noncommercialFields.numberSpectators,
    noncommercialFieldsStartDateTime: input.dateTimeRange.startDateTime,
    applicantMessage: input.applicantMessage,
    region: input.region,
    signature: input.signature,
    authEmail: input.authEmail,
    type: input.type
  };
};

const translateFromDatabaseToClient = input => {
  const result = {
    applicantInfo: {
      dayPhone: {
        areaCode: input.applicantInfoDayPhoneAreaCode,
        prefix: input.applicantInfoDayPhonePrefix,
        number: input.applicantInfoDayPhoneNumber,
        extension: input.applicantInfoDayPhoneExtension || '',
        tenDigit:
          input.applicantInfoDayPhoneAreaCode + input.applicantInfoDayPhonePrefix + input.applicantInfoDayPhoneNumber
      },
      eveningPhone: {
        areaCode: input.applicantInfoEveningPhoneAreaCode || '',
        prefix: input.applicantInfoEveningPhonePrefix || '',
        number: input.applicantInfoEveningPhoneNumber || '',
        extension: input.applicantInfoEveningPhoneExtension || '',
        tenDigit:
          input.applicantInfoEveningPhoneAreaCode +
          input.applicantInfoEveningPhonePrefix +
          input.applicantInfoEveningPhoneNumber
      },
      primaryAddress: {
        mailingAddress: input.applicantInfoPrimaryMailingAddress || '',
        mailingAddress2: input.applicantInfoPrimaryMailingAddress2 || '',
        mailingCity: input.applicantInfoPrimaryMailingCity || '',
        mailingState: input.applicantInfoPrimaryMailingState || '',
        mailingZIP: input.applicantInfoPrimaryMailingZIP || ''
      },
      organizationAddress: {
        mailingAddress: input.applicantInfoOrgMailingAddress,
        mailingAddress2: input.applicantInfoOrgMailingAddress2 || '',
        mailingCity: input.applicantInfoOrgMailingCity,
        mailingState: input.applicantInfoOrgMailingState,
        mailingZIP: input.applicantInfoOrgMailingZIP
      },
      secondaryAddress: {
        mailingAddress: input.applicantInfoSecondaryMailingAddress,
        mailingAddress2: input.applicantInfoSecondaryMailingAddress2 || '',
        mailingCity: input.applicantInfoSecondaryMailingCity,
        mailingState: input.applicantInfoSecondaryMailingState,
        mailingZIP: input.applicantInfoSecondaryMailingZIP
      },
      orgType: input.applicantInfoOrgType,
      primaryFirstName: input.applicantInfoPrimaryFirstName,
      primaryLastName: input.applicantInfoPrimaryLastName,
      secondaryFirstName: input.applicantInfoSecondaryFirstName || '',
      secondaryLastName: input.applicantInfoSecondaryLastName || '',
      emailAddress: input.applicantInfoEmailAddress,
      organizationName: input.applicantInfoOrganizationName || '',
      website: input.applicantInfoWebsite || ''
    },
    noncommercialFields: {
      activityDescription: input.noncommercialFieldsActivityDescription,
      locationDescription: input.noncommercialFieldsLocationDescription,
      numberParticipants: input.noncommercialFieldsNumberParticipants,
      numberSpectators: input.noncommercialFieldsSpectatorCount
    },
    dateTimeRange: {
      startDateTime: input.noncommercialFieldsStartDateTime,
      startMonth: moment(input.noncommercialFieldsStartDateTime, util.datetimeFormat).format('M'),
      startDay: moment(input.noncommercialFieldsStartDateTime, util.datetimeFormat).format('D'),
      startYear: moment(input.noncommercialFieldsStartDateTime, util.datetimeFormat).format('YYYY'),
      startHour: moment(input.noncommercialFieldsStartDateTime, util.datetimeFormat).format('hh'),
      startMinutes: moment(input.noncommercialFieldsStartDateTime, util.datetimeFormat).format('mm'),
      startPeriod: moment(input.noncommercialFieldsStartDateTime, util.datetimeFormat).format('A'),
      endDateTime: input.noncommercialFieldsEndDateTime,
      endMonth: moment(input.noncommercialFieldsEndDateTime, util.datetimeFormat).format('M'),
      endDay: moment(input.noncommercialFieldsEndDateTime, util.datetimeFormat).format('D'),
      endYear: moment(input.noncommercialFieldsEndDateTime, util.datetimeFormat).format('YYYY'),
      endHour: moment(input.noncommercialFieldsEndDateTime, util.datetimeFormat).format('hh'),
      endMinutes: moment(input.noncommercialFieldsEndDateTime, util.datetimeFormat).format('mm'),
      endPeriod: moment(input.noncommercialFieldsEndDateTime, util.datetimeFormat).format('A')
    },
    appControlNumber: input.appControlNumber,
    applicationId: input.applicationId,
    createdAt: input.createdAt,
    district: input.district,
    eventName: input.eventName,
    forest: input.forest,
    applicantMessage: input.applicantMessage || null,
    region: input.region,
    signature: input.signature,
    status: input.status,
    authEmail: input.authEmail,
    type: input.type
  };

  result.applicantInfo.addSecondaryPermitHolder =
    !!result.applicantInfo.secondaryFirstName && !!result.applicantInfo.secondaryFirstName;

  if (
    !result.applicantInfo.secondaryAddress.mailingAddress &&
    !result.applicantInfo.secondaryAddress.mailingAddress2 &&
    !result.applicantInfo.secondaryAddress.mailingCity &&
    !result.applicantInfo.secondaryAddress.mailingState &&
    !result.applicantInfo.secondaryAddress.mailingZIP
  ) {
    result.applicantInfo.secondaryAddressSameAsPrimary = true;
    delete result.applicantInfo.secondaryAddress;
  } else {
    result.applicantInfo.secondaryAddressSameAsPrimary = false;
  }

  if (
    !result.applicantInfo.organizationAddress.mailingAddress &&
    !result.applicantInfo.organizationAddress.mailingAddress2 &&
    !result.applicantInfo.organizationAddress.mailingCity &&
    !result.applicantInfo.organizationAddress.mailingState &&
    !result.applicantInfo.organizationAddress.mailingZIP
  ) {
    result.applicantInfo.primaryAddressSameAsOrganization = true;
    delete result.applicantInfo.organizationAddress;
  } else {
    result.applicantInfo.primaryAddressSameAsOrganization = false;
  }

  if (!result.applicantInfo.eveningPhone.tenDigit) {
    result.applicantInfo.addAdditionalPhone = false;
    delete result.applicantInfo.eveningPhone;
  } else {
    result.applicantInfo.addAdditionalPhone = true;
  }

  return result;
};

const translateFromIntakeToMiddleLayer = input => {
  let result = {
    region: input.region,
    forest: input.forest,
    district: input.district,
    authorizingOfficerName: input.authorizingOfficerName,
    authorizingOfficerTitle: input.authorizingOfficerTitle,
    applicantInfo: {
      firstName: input.applicantInfoPrimaryFirstName,
      lastName: input.applicantInfoPrimaryLastName,
      dayPhone: {
        areaCode: input.applicantInfoDayPhoneAreaCode,
        number: input.applicantInfoDayPhonePrefix + input.applicantInfoDayPhoneNumber,
        extension: input.applicantInfoDayPhoneExtension || undefined,
        phoneType: 'standard'
      },
      eveningPhone: {
        areaCode: input.applicantInfoEveningPhoneAreaCode || input.applicantInfoDayPhoneAreaCode,
        number:
          input.applicantInfoEveningPhonePrefix + input.applicantInfoEveningPhoneNumber ||
          input.applicantInfoDayPhonePrefix + input.applicantInfoDayPhoneNumber,
        extension: input.applicantInfoEveningPhoneExtension || input.applicantInfoDayPhoneExtension || undefined,
        phoneType: 'standard'
      },
      emailAddress: input.applicantInfoEmailAddress,
      organizationName: input.applicantInfoOrganizationName || undefined,
      website: input.applicantInfoWebsite || undefined,
      orgType: input.applicantInfoOrgType
    },
    type: input.type,
    noncommercialFields: {
      activityDescription: input.noncommercialFieldsActivityDescription,
      locationDescription: input.noncommercialFieldsLocationDescription,
      startDateTime: input.noncommercialFieldsStartDateTime,
      endDateTime: input.noncommercialFieldsEndDateTime,
      numberParticipants: Number(input.noncommercialFieldsNumberParticipants)
    }
  };

  if (input.applicantInfoOrgType === 'Person') {
    result.applicantInfo.mailingAddress = input.applicantInfoPrimaryMailingAddress;
    result.applicantInfo.mailingAddress2 = input.applicantInfoPrimaryMailingAddress2 || undefined;
    result.applicantInfo.mailingCity = input.applicantInfoPrimaryMailingCity;
    result.applicantInfo.mailingState = input.applicantInfoPrimaryMailingState;
    result.applicantInfo.mailingZIP = input.applicantInfoPrimaryMailingZIP;
  }

  if (input.applicantInfoOrgType === 'Corporation') {
    result.applicantInfo.mailingAddress = input.applicantInfoOrgMailingAddress;
    result.applicantInfo.mailingAddress2 = input.applicantInfoOrgMailingAddress2 || undefined;
    result.applicantInfo.mailingCity = input.applicantInfoOrgMailingCity;
    result.applicantInfo.mailingState = input.applicantInfoOrgMailingState;
    result.applicantInfo.mailingZIP = input.applicantInfoOrgMailingZIP;
  }

  return result;
};

noncommercial.acceptApplication = application => {
  const requestOptions = {
    method: 'POST',
    url: vcapConstants.middleLayerBaseUrl + 'permits/applications/special-uses/noncommercial/',
    headers: {},
    json: true,
    simple: true,
    body: translateFromIntakeToMiddleLayer(application)
  };
  return new Promise((resolve, reject) => {
    util
      .middleLayerAuth()
      .then(token => {
        requestOptions.headers['x-access-token'] = token;
        util
          .request(requestOptions)
          .then(resolve)
          .catch(reject);
      })
      .catch(error => {
        reject(error);
      });
  });
};

noncommercial.getOne = (req, res) => {
  NoncommercialApplication.findOne({
    where: {
      app_control_number: req.params.id
    }
  })
    .then(app => {
      if (app) {
        Revision.findAll({
          where: {
            applicationId: app.applicationId,
            applicationType: app.type
          }
        })
          .then(revisions => {
            const formattedApp = translateFromDatabaseToClient(app);
            formattedApp.revisions = revisions;
            res.status(200).json(formattedApp);
          })
          .catch(error => {
            res.status(400).json(error);
          });
      } else {
        res.status(404).send();
      }
    })
    .catch(error => {
      res.status(400).json(error);
    });
};

// populates an applicationId on the object before return
noncommercial.create = (req, res) => {
  let errorRet = {};
  let errorArr = validator.validateNoncommercial(req.body);
  if (errorArr.length > 0) {
    errorRet['errors'] = errorArr;
    res.status(400).json(errorRet);
  } else {
    // create the noncommercial app object and persist
    util.setAuthEmail(req);
    NoncommercialApplication.create(translateFromClientToDatabase(req.body))
      .then(noncommApp => {
        email.sendEmail('noncommercialApplicationSubmittedAdminConfirmation', noncommApp);
        email.sendEmail('noncommercialApplicationSubmittedConfirmation', noncommApp);
        req.body['applicationId'] = noncommApp.applicationId;
        req.body['appControlNumber'] = noncommApp.appControlNumber;
        res.status(201).json(req.body);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  }
};

noncommercial.update = (req, res) => {
  const role = util.isLocalOrCI() ? 'admin' : req.user.role;
  NoncommercialApplication.findOne({
    where: {
      app_control_number: req.params.id
    }
  }).then(app => {
    if (app) {
      app.status = req.body.status;
      Revision.create({
        applicationId: app.applicationId,
        applicationType: app.type,
        status: app.status,
        email: util.getUser(req).email
      });
      app.applicantMessage = req.body.applicantMessage;
      if (app.status === 'Accepted') {
        noncommercial
          .acceptApplication(app)
          .then(response => {
            app.controlNumber = response.controlNumber;
            app
              .save()
              .then(() => {
                email.sendEmail(`noncommercialApplication${app.status}`, app);
                res.status(200).json(translateFromDatabaseToClient(app));
              })
              .catch(error => {
                res.status(500).json(error);
              });
          })
          .catch(error => {
            res.status(500).json(error);
          });
      } else {
        app
          .save()
          .then(() => {
            if (app.status === 'Cancelled' && role === 'user') {
              email.sendEmail(`noncommercialApplicationUser${app.status}`, app);
            } else {
              email.sendEmail(`noncommercialApplication${app.status}`, app);
            }
            res.status(200).json(translateFromDatabaseToClient(app));
          })
          .catch(error => {
            res.status(500).json(error);
          });
      }
    } else {
      res.status(404).send();
    }
  });
};

module.exports = noncommercial;
